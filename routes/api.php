<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;
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
     *  @routes: /dashboard/{store}/{memberID}?token={token}/
     * 
     *  @purpose: these routes are for the user to perform CRUD operations on the store
     */


     Route::post('dashboard/{storeID}/{memberID}?token={token}/message/', [message::class, 'createJob'])->name('dashboard/{storeID}/{memberID}?token={token}/job/');

