<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;
use App\Http\Controllers\Message;
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