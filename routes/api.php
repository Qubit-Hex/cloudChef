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
     *  @route: /user/store/
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
             *  @route: /store/schedule/get
             *
             *  @purpose: inorder to get the store schedule of the user
             */

            Route::get ('/schedule/get', [schedule::class, 'get'])->name('/store/schedule/get/');


        /**
         *
         *  @Route: /store/schedule/add
         *
         *  @purpose: inorder to add the store schedule of the user
         */

            Route::post('/schedule/add', [schedule::class, 'add'])->name('/store/schedule/add');


        /**
         *
         * @Route: /store/schedule/find
         *
         * @purpose: inorder to find a specific schedule of the store
         *
         */

            Route::get('/schedule/find', [schedule::class, 'find'])->name('/store/schedule/find');


        /***
         *
         *
         * @route: /store/schedule/dropshift/
         *
         *
         *  @purpose: inorder to drop a shift of a specific employee of the store
         *
         */

                Route::get('/schedule/dropshift', [schedule::class, 'dropshift'])->name('/store/schedule/dropshift');


        /**
         *
         * @route: /store/schedule/dropshift/get
         *
         *
         *  @purpose: inorder to get the shifts of a specific employee of the store
         *
         *
         */


         Route::get('/schedule/dropshift/get', [schedule::class, 'getDroppedShifts'])->name('/store/schedule/dropshift/get');

        /**
         *  @route: /user/store/get
         *
         *  @purpose: inorder to ge the store of the user
         */
            Route::get ('/get', [store::class, 'get'])->name('/store/get');



        /**
         *
         * @Route: /store/schedule/shiftPickup/
         *
         *
         *  @purpose: inorder to pickup a shift of a specific employee of the store
         *
         */

         Route::get('/schedule/pickup/', [schedule::class, 'postShiftPickupRequest'])->name('/store/schedule/pickup/');


        /**
         *
         *  @Route: /employees
         *
         *  @purpose: inorder to get the members of the store
         *
         */

         Route::get('/employees', [employee::class, 'showCurrentEmployees'])->name('/store/employees');
         
     });
