<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class menu extends Controller
{
    /**
     *
     *  @method: validation
     *
     *  @purpose: validate the request
     *
     */

    public function validation(Request $request) {
        // perform the necessary validations

        // extend this if in future you need more validation or sanitization
        // as this same is used throughout the controller.
        $token = $request->header('accessToken');

        $user = DB::table('users')->where('remember_token', $token)->first();

        if ($user) {
            $member = DB::table('store_members')->where('userID', $user->userID)->first();

            // get the store ID
            if ($member) {
                return $member->storeID;
            } else {
                return response()->json(['message' => 'You are not a member of any store'], 401);
            }
        } else {
            return false;
        }
    }



    /**
     *
     *  @method:  add
     *
     *  @purpose: inorder to add a menu to the system
     *
     */



     public function add(Request $request)
     {
        // validate the user

        // users can only add menu to their store

        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // now lets perform the insert into the system

        // first validate the the input is only a-z numbers and spaces
        $userInput = $request->input('name');

        if (!preg_match('/^[a-zA-Z0-9 ]+$/', $userInput)) {
            return response()->json(['message' => 'Invalid input'], 401);
        }

        // request is valid so lets perfrom the insert into the system

        $menu = DB::table('store_menu')->insert([
            'store_id' => $userStore,
            'name' => $userInput,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'active' => 1
        ]);

        // /CHECK has the insert succesfully been performed
        if ($menu) {
            return response()->json(['message' => 'Menu added successfully',
                                    'status' => 200], 200);
        } else {
            return response()->json(['message' => 'Menu could not be added'], 401);
        }
     }


     /**
      *   @method: get
      *
      *
      *  @purpose: inorder to fetch the menus of the store
      *
      */

    public function get(Request $request)
    {
        // validate the user

        // users can only add menu to their store

        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // return the menus of the store
        $menus = DB::table('store_menu')->where('store_id', $userStore)->get();


        return response()->json(['message' => 'Menus fetched successfully',
                                'status' => 200,
                                'menus' => $menus], 200);
    }


    /**
     *
     * @method: getMenuItems
     *
     *
     *  @purpose: inorder to fetch the menu items of the store.
     *
     */

     public function getMenuItems(Request $request)
     {
        // validate the user

        // users can only add menu to their store

        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // create a sql query todo the following
        // 1. grab the content in table 'store_menu_items'
        // 2. check if the store_menu_id matches any records
        // 3. query store_menu with that id number and check if the store_id matches

        // now query the store_menu table to check if the store_id matches
        $menu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $request->header('menuID'))->first();

        if ($menu) {
            // now query the store_menu_items table to check if the store_menu_id matches

            // now fetch the data and return the data to the user.
            $menuItems = DB::table('store_menu_item')->where('store_menu_id', $request->header('menuID'))->get();

            return response()->json(['message' => 'Menu items fetched successfully',
                                    'status' => 200,
                                    'menuItems' => $menuItems], 200);
        } else {
            // something went wrong so trigger an error.
            return response()->json(['message' => 'Menu items could not be fetched'], 401);
        }

     }

    /**
     *
     *  @method: addMenuItem
     *
     *  @purpose: inorder to add a menu item to the system
     */

     public function addMenuItem(Request $request)
     {

        // first lets check the users permissions
        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // does the menuID store number match the users store number
        $menuID = $request->input('menuID');

        $menu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $menuID)->first();

        // verify the permissions of the user.
        if (!$menu) {
            return response()->json(['message' => 'You are not a member of this store'], 401);
        }


        // now lets perform the insert into the system
        $menuItem = DB::table('store_menu_item')->insert([
            'store_menu_id' => $request->input('menuID'),
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'catagory' => $request->input('catagory'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'active' => 1
        ]);

        // was the insert successful ?
        if ($menuItem) {
            return response()->json(['message' => 'Menu item added successfully',
                                    'status' => 200], 200);
        } else {
            return response()->json(['message' => 'Menu item could not be added'], 401);
        }
    }


    /**
     *
     *  @method: deleteMenu
     *
     *  @purpose: inorder to delete a menu and all the menu items
     *
     */
    public function deleteMenu(Request $request)
    {
        // first lets check the users permissions
        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // does the menuID store number match the users store number
        $menuID = $request->header('menuID');

        $menu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $menuID)->first();

        // verify the permissions of the user.
        if (!$menu) {
            return response()->json(['message' => 'You are not a member of this store'], 401);
        }

        // now lets delete the menu and all the menu items
        $menu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $menuID)->delete();

        // check the length of menu items to delete
        $menuItems = DB::table('store_menu_item')->where('store_menu_id', $menuID)->get();

        // check if the length of the menu items is 0
        // this was a werid edge case so make sure we properly validate this one too

        if (count($menuItems) > 0) {
            // now lets delete the menu items
            $menuItems = DB::table('store_menu_item')->where('store_menu_id', $menuID)->delete();

            if ($menu && $menuItems) {
                return response()->json(['message' => 'Menu deleted successfully',
                                        'status' => 200], 200);
            } else {
                // check with one of the two queries failed
                // or did both fail ?
                if (!$menu && !$menuItems) {
                    return response()->json(['message' => 'Menu could not be deleted and the menuItems'], 401);
                } else if (!$menu) {
                    return response()->json(['message' => 'Menu could not be deleted'], 401);
                } else if (!$menuItems) {
                    return response()->json(['message' => 'Menu items could not be deleted'], 401);
                } else {
                    // something else went wrong
                    return response()->json(['message' => 'Something went wrong'], 401);
                }
            }

        } else {
            // menu items where not greater than 0 so just delete the menu
            if ($menu) {
                return response()->json(['message' => 'Menu deleted successfully',
                                        'status' => 200], 200);
            } else {
                return response()->json(['message' => 'Menu could not be deleted'], 401);
            }
        }
    }

    /**
     *
     *  @method: deleteMenuItem
     *
     *
     *  @purpose: Inorder to delete a menu item from the system.
     */
    public function deleteMenuItem(Request $request)
    {
        // first lets check the users permissions
        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // grab the menu item from the server
        $menuItemID = $request->header('menuItemID');

        $menuRecord = DB::table('store_menu_item')->where('id', $menuItemID)->first();

        // verify the permissions of the user.
        $storeMenu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $menuRecord->store_menu_id)->first();

        if (!$storeMenu) {
            return response()->json(['message' => 'You are not a member of this store'], 401);
        }

        // now lets delete the menu item
        $menuItem = DB::table('store_menu_item')->where('id', $menuItemID)->delete();

        // was the delete successful ?
        if ($menuItem) {
            return response()->json(['message' => 'Menu item deleted successfully',
                                    'status' => 200], 200);
        } else {
            return response()->json(['message' => 'Menu item could not be deleted'], 401);
        }
    }

    /**
     *  @method: update
     *
     *  @purpose: Inorder to update a menu item
     *
     */

    public function update(Request $request)
    {
        // first lets check the users permissions
        $userStore = $this->validation($request);

        $userInputs = $request->all();

        // user

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // now lets modify the resource based on the parameters that where passed to us.

        $menuItemRecord = DB::table('store_menu_item')->where('id', $userInputs['menuItemID'])->first();

        // verify the permissions of the use .
        $storeMenu = DB::table('store_menu')->where('store_id', $userStore)->where('id', $menuItemRecord->store_menu_id)->first();


        // does the record even exist ?
        if (!$menuItemRecord) {
            return response()->json(['message' => 'Menu item does not exist'], 401);
        }

        // does the user have permission to edit this record ? and is the record apart of the users store ?
        if (!$storeMenu) {
            return response()->json(['message' => 'You are not a member of this store'], 401);
        }

        // now that we validated the request lets update the `record`
        $menuItem = DB::table('store_menu_item')->where('id', $userInputs['menuItemID'])->update([
            'name' => $userInputs['name'],
            'price' => $userInputs['price'],
            'catagory' => $userInputs['catagory'],
            'updated_at' => date('Y-m-d H:i:s')
        ]);


        // was the update successful ?
        if ($menuItem) {
            return response()->json(['message' => 'Menu item updated successfully',
                                    'status' => 201], 200);
        } else {
            return response()->json(['message' => 'Menu item could not be updated'], 401);
        }


        // something else went wrong
        return response()->json(['message' => 'Something went wrong'], 401);
    }

}
