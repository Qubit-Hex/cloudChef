<?php

namespace App\Http\Controllers;

use App\Http\Controllers\validation\authValidation;
use App\Models\employeeModel;
use App\Models\User;
use App\Models\store;
use App\Models\user_sessions;
use App\Models\store_members;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Services\employees\employeeServiceInterface;

/**
 *
 *  @class: employee
 *
 *
 *  @purpose: inorder to perform the employee CRUD operatations
 *
 *
 */


class employee extends Controller
{

    /**
     *
     *  @method: get
     *
     *  @purpose: inorder to get the employee details by the id number of a store
     *
     */

    public function get(Request $request, $id)
    {
        // refactor this later into a better format.
        $clientToken = $request->header('accessToken');
        // check if the user exists in the database
        $user = DB::table('users')->where('remember_token', $clientToken)->first();

        if ($user) {
            // next check if the user belongs to the store we are assocated with
            $store_members = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($store_members) {
                // next lets check if the
                $employee = DB::table('employee')->where('storeID', $store_members->storeID)->where('id', $id)->first();

                $userImg = DB::table('user_profile')->where('userID', $employee->userID)->first()->img;

                // if the employee exists
                if ($employee) {
                    // next we need to retrive other other information before returning the employee data to the client

                    // PLEASE NOTE: WE NEED SOME DATABASE REFACTORING HERE
                    // SO THAT WE DONT HAVE TODO HACKY STUFF INORDER TO GET OUR DATA

                    $department = DB::table('department')->where('id', $employee->department_id)->first()->name;

                    return response()->json([
                        'name' => $employee->first_name . ' ' . $employee->last_name,
                        'department' => $department,
                        'url' => $userImg
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'employee not found'
                    ]);
                }
            }
            // trigger error user does not belong to the store
            return response()->json(['error' => 'user does not belong to the store'], 401);
        }
        return response()->json(['message' => 'failed'], 401);
    }

    /**
     *
     *  @method: showCurrentEmployees
     *
     *  @purpose: inorder to get the current employees of the store
     */

    public function showCurrentEmployees(Request $request)
    {

        // modals for the method

        $userModel = new User();
        $storeModel = new store();
        $storeMemberModel = new store_members();
        $userSessionModel = new user_sessions();
        $employeeMod = new employeeModel();



        // check if the request is an api or cookie request
        if (isset($_COOKIE['accessToken'])) {
            $clientToken = $_COOKIE['accessToken'];
        } else {
            $clientToken = $request->header('accessToken');
        }


        // get the user id from the token

        $currentUser = $userModel->getUserByRemeberToken($clientToken);
        $currentMember = $storeMemberModel->getMembersByID($currentUser->userID);
        $DB = DB::table('employee')->where('storeID', $currentMember->storeID)->get();

        /**
         *  @stub: result
         *  name -> name of employee
         *  id -> id of employee
         * department -> department of employee
         * phone -> phone number of employee
         * email -> email of employee
         * role -> role of the employee
         */

        // authenticate the user before proceeding to the request

        $user = DB::table('users')->where('remember_token', $clientToken)->first();

        if ($user) {
            $store_members = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($store_members) {
                $employees = DB::table('employee')->where('storeID', $store_members->storeID)->get();

                $result = [];

                foreach ($employees as $employee) {
                    $result[] = [
                        'name' => $employee->first_name . ' ' . $employee->last_name,
                        'id' => $employee->id,
                        'department' => DB::table('department')
                            ->where('id', $employee->department_id)
                            ->first()->name,
                        'address' => $employee->address,
                        'phone' => $employee->phone,
                        'location' => $employee->location,
                        'email' => $employee->email,

                    ];
                }

                return response()->json([
                    'status' => 'success',
                    'data' => $result,
                    'eData' => $employees
                ]);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'user does not belong to the store'
            ], 401);
        }
        return response()->json($DB);
    }

    /**
     *  @method: add ( employee )
     *
     *
     *  @purpose: inorder to add a new employee to the store.
     *
     */
    public function add(Request $request)
    {
        // purpose of this method is to add a new employee to the store.
        $userModel = new User();
        $storeModel = new store();
        $storeMemberModel = new store_members();
        $userSessionModel = new user_sessions();
        $employeeMod = new employeeModel();

        // first lets findout if the user we are talking to is a admin of the store or not \
        $currentUser = $userModel->getUserByRemeberToken($request->header('accessToken'));
        // not lets find out what store this user belongs to
        $currentMember = $storeMemberModel->getMembersByID($currentUser->userID);

        // does the user exist?
        if (!$currentUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not exist'
            ], 401);
        }

        // is the member a part of any store in the system ?
        if (!$currentMember) {
            return response()->json([
                'status' => 'error',
                'message' => 'user does not belong to the store'
            ], 401);
        }

        // next lets check if the user is a admin of the store
        if ($currentMember->store_role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'user is not a admin of the store'
            ], 401);
        }


        # ===================== user input of the request =====================

        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $address = $request->input('address');
        $position = $request->input('position'); // this is the position of the employee
        $salary = $request->input('salary');
        $dob = $request->input('dob');
        $location = $request->input('location');
        $password = $request->input('password');
        $salt = hash('sha256', bin2hex(openssl_random_pseudo_bytes(64)));


        // validate the user input before continuing the request.


        // register the employee into the system.
        $registerUser = $userModel->createUser($name, $email, $password, $salt);

        if (!$registerUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // register the employee into the store.
        $registerMember = $storeMemberModel->createMember(
            $registerUser->userID,
            $currentMember->storeID,
            'employee'
        );

        // register the employee as a member into the system
        if (!$registerMember) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // store the
        $firstname = explode(' ', $name)[0];
        $lastname = explode(' ', $name)[1];

        // show success of fal of the registration
        // of the new employee into the system.
        $hireEmployee = $employeeMod->createEmployee(
            $registerMember->userID,
            $currentMember->storeID,
            $firstname,
            $lastname,
            $address,
            $location,
            $email,
            $phone,
            $salary
        );

        if (!$hireEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'user registration failed'
            ]);
        }

        // the user has been registered successfully
        return response()->json([
            'status' => 'success',
            'message' => 'user has been registered successfully'
        ]);
    }

    /**
     *
     *  @method: edit ( employee )
     *
     *
     * @purpose: inorder to edit an existing employee of the store.
     *
     *
     */

    public function edit(Request $request)
    {

        $query = [
            'token' => $request->header('accessToken'),
            'data' => $request->all()
        ];

        // perform the edit operation on the said user.
        return employeeServiceInterface::edit($query);
    }

    /**
     *
     *  @method: delete <DELETE>
     *
     *  @purpose: inorder to delete an existing employee of the store.
     *
     */

    public function delete(Request $request)
    {
        $query = [
            'token' => $request->header('accessToken'),
            'employeeID' => $request->header('employeeID')
        ];


        return employeeServiceInterface::delete($query);
    }
}
