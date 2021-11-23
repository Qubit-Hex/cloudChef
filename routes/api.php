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
    



    /***
     * 
     *  @route: users route.
     * 
     *  @purposee: to make the user api route for this application.
     * 
     */

      Route::group(['middleware' => 'uac'], function () {

   
         // get your current user information 
         Route::get('users/', [dashboard::class, 'getUserDetails'])->name('users/');


         // the users that are a part of your currennt store
         Route::get('users/{id}/', [dashboard::class, 'getUserDetails'])->name('users/{id}/');


         // add a user to your store
         Route::post('users/', [dashboard::class, 'createUser'])->name('users/');

         // update a user to your store
         Route::put('users/{id}/', [dashboard::class, 'updateUser'])->name('users/{id}/');

         // delete a user to your store
         Route::delete('users/{id}/', [dashboard::class, 'deleteUser'])->name('users/{id}/');
      });


      // group middle ware for accessing store data
      Route::group(['middleware' => 'uac'], function () {

         // get current store data 
         Route::get('stores/', [dashboard::class, 'getStoreDetails'])->name('stores/');


         // update current store data
         Route::put('stores/{id}/', [dashboard::class, 'updateStore'])->name('stores/{id}/');


         // add a store too the database for you to manage 
         Route::post('stores/', [dashboard::class, 'createStore'])->name('stores/');

      });


      // customer reviews route anomoous


      Route::group(['middleware' => 'uac'], function () {

         // get current store data 
         Route::get('reviews/{storeID?}', [dashboard::class, 'getReviews'])->name('reviews/');

         // post a review to the store 

         Route::post('reviews/{store}/{id?}', [dashboard::class, 'createReview'])->name('reviews/');

         // update a review to the store


         Route::put('reviews/{store}/{id}/{action}', [dashboard::class, 'updateReview'])->name('reviews/');


         // delete will not exist for this resources since we want to keep the reviews transparent as possible 
         // and we want to keep the reviews anonymous. and dont want ratings to be manipulated.

      });
      






