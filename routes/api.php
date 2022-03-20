<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;
use App\Http\Controllers\Message;
use App\Http\Controllers\store_members;
use App\Http\Controllers\store;
use App\Http\Controllers\schedule;
use App\Http\Controllers\employee;
use App\Http\Controllers\recipes;
use App\Http\Controllers\menu;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 * @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
*
*  @Route: /auth/login/
*/

 Route::post('auth/login/', [authentication::class, 'login'])->name('auth/login');


 /**
  * @purpose: inorder to register a user account into the syste
  *
  * @Route: /auth/register/
  */


  Route::post('auth/register/', [authentication::class, 'register'])->name('auth/register');


  /**
   * @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
   *
   * @Route: /auth/verify/
   */

   Route::get('auth/verify/', [authentication::class, 'verify'])->name('auth/verify');


    /**
     * @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
     *
     * @Route: /auth/logout/
     */

    Route::post('auth/logout/', [authentication::class, 'logout'])->name('auth/logout');


     /**
 *
 *  Group Route: messsages
 *
 *  @putpose: to route the messages route api , for sending and receiving messages
 *             only if authorized to sendthe message belonging to the store
 */



Route::group(['prefix' => 'messages', 'middleware' => 'auth'], function () {

    /**
     *
     *  @Route: /messages/get/
     *
     *  @purpose: to get messages from the user to the store
     *
     */
    Route::get('/get', [message::class,  'get'])->name('messages/get');



    /**
     *
     *  @Route: /messages/send/
     *
     *  @purpose: to send messages from the user to the store
     *
     */
     Route::get('/send', [message::class, 'send'])->name('messages/send');




     /**
      *  @route: /messages/delete
      *
      *  @purpose: inorder order to delete messages from the store to the user
      */

      Route::delete('/delete', [message::class, 'delete'])->name('messages/delete');



      /**
       *
       *  @route: /messages/update
       *
       *  @purpose: inorder to update the message status from the store to the user
       */

       Route::patch('/update', [message::class, 'update'])->name('messages/update');


});


/**
 *
 *  @route: /contacts/
 *
 *  @purpose: inorder to get the contacts of the store
 *
 */



Route::group(['prefix' => 'members', 'middleware' => 'auth'], function () {


    /**
     *
     *  @route: /contacts/get/
     *
     *  @purpose: inorder to get the contacts of the store
     *
     */

    Route::get('/get', [store_members::class, 'get'])->name('contacts/get');


    /**
     *
     *  @route: /contacts/add/
     *
     *  @purpose: inorder to add the contacts of the store
     *
     */

     Route::post('/add', [store_members::class, 'add'])->name('contacts/add');



     /**
      *  @route: /contacts/find
      *
      *  @purpose: inorder order to find a contact of the store
      *
      *  @parm: int $id
      */

         Route::get('/find', [store_members::class, 'find'])->name('contacts/find');
    });


    /**
     *
     *  @route: /store/
     *
     *  @purpose: inorder to get the store of the user
     */


     Route::group(['prefix' => '/store', 'middleware' => 'auth'], function () {

        /**
         *
         * @route: /store/employee/get
         *
         *
         *  @purpose: inorder to get the employee infomration of a specific employee of the store
        */

            Route::get('/employee/get/{id}', [employee::class, 'get'])->name('store/employee/get/{id}');






        /**
         *  @route: /user/store/get
         *
         *  @purpose: inorder to ge the store of the user
         */
            Route::get ('/get', [store::class, 'get'])->name('/store/get');

        /**
         *
         *  @Route: /employees
         *
         *  @purpose: inorder to get the members of the store
         *
         */

         Route::get('/employees', [employee::class, 'showCurrentEmployees'])->name('/store/employees');

         /**
          *   @route / schedule /
          *
          *  @purpose: to get any information related to the schedule of the store
          *
          */


         Route::group(['prefix' => '/schedule'], function () {

            Route::get ('/get', [schedule::class, 'get'])->name('/schedule/get/');
            Route::post('/add', [schedule::class, 'add'])->name('/schedule/add');
            Route::get('/find', [schedule::class, 'find'])->name('/schedule/find');
            Route::post('/create', [schedule::class, 'create'])->name('/schedule/create');
            Route::get('/show', [schedule::class, 'showEmployeeSchedule'])->name('/schedule/show');
            Route::delete('/delete', [schedule::class, 'delete'])->name('/schedule/delete');

            // sub routes for other scheduling services we need to interact with. 
            Route::get('/dropshift', [schedule::class, 'dropshift'])->name('/schedule/dropshift');
            Route::get('/dropshift/get', [schedule::class, 'getDroppedShifts'])->name('/schedule/dropshift/get');
            Route::get('/pickup', [schedule::class, 'postShiftPickupRequest'])->name('/schedule/pickup/');

        });


         /**
          *   @route: /recipes/
          *
          *   @purpose: inorder to get the recipes of the store
          */

          Route::group(['prefix' => '/recipes'], function () {

              Route::get('/get', [recipes::class, 'get'])->name('recipes/get');

              // add a group of sub route for accessing certin information about the reicpes

              Route::post('/add', [recipes::class, 'add'])->name('recipes/add');

              Route::get('/find/{id}', [recipes::class, 'find'])->name('recipes/find/{id}');

              Route::delete('/delete', [recipes::class, 'delete'])->name('recipes/delete');

            // group route for updating the reicpes in the system
                Route::group(['prefix' => '/update'], function () {
                    // the following route for updating the recipe summary, recipe ingredients, recipe steps, recipe instructions
                    // and the nutritional facts.
                    Route::patch('/recipeSummary/', [recipes::class, 'updateRecipeSummary'])->name('recipes/update/recipeSummary');

                    Route::patch('/ingredients/', [recipes::class, 'updateRecipeIngredients'])->name('recipes/update/recipeIngredients');

                    Route::patch('/recipeInstructions/', [recipes::class, 'updateRecipeInstructions'])->name('recipes/update/recipeInstructions');

                    Route::patch('/nutritionalFacts/', [recipes::class, 'updateRecipeNutritionalFacts'])->name('recipes/update/nutritionalFacts');
                });


              // this is a route we will use to verify uploaded files
              Route::post('/file', [recipes::class, 'file'])->name('recipes/file');

          });

          // all of the menu routes for creating menus and updating menus
          Route::group(['prefix' => '/menu'], function () {

                Route::post('/add', [menu::class, 'add'])->name('menu/add');
                Route::get('/get', [menu::class, 'get'])->name('menu/get');
                Route::delete('/delete', [menu::class, 'deleteMenu'])->name('menu/delete');

                // route for adding a menu item to the menu

                // groups the items together
                Route::group(['prefix' => '/item'], function () {
                    Route::post('/add', [menu::class, 'addMenuItem'])->name('menu/item/add');
                    Route::get('/get', [menu::class, 'getMenuItems'])->name('menu/item/get');
                    Route::delete('/delete', [menu::class, 'deleteMenuItem'])->name('menu/item/delete');
                    Route::patch('/update', [menu::class, 'update'])->name('menu/item/update');
                });
          });

     });
