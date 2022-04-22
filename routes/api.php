<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;
use App\Http\Controllers\store_members;
use App\Http\Controllers\store;
use App\Http\Controllers\schedule;
use App\Http\Controllers\employee;
use App\Http\Controllers\recipes;
use App\Http\Controllers\menu;
use App\Http\Controllers\settings;


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

 Route::group(['prefix' => 'auth'], function () {

    // login api request
    Route::post('login', [authentication::class, 'login'])->name('/auth/login');
    // registration api request
    Route::post('register', [authentication::class, 'register'])->name('/auth/register');
    // logout api request
    Route::post('logout', [authentication::class, 'logout'])->name('/auth/logout');
    // verify logout request
    Route::get('/verify', [authentication::class, 'verify'])->name('/auth/verify')->middleware('auth');
    // attach auth middleware to the premission route
    Route::get('/permissions', [authentication::class, 'permissions'])->name('/auth/permission')->middleware('auth');

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
         *  @route: /store/ <EMPLOYEE> (GROUP)
         *
         *  @purpose: inorder to get the store of the user
         */

         Route::group(['prefix' => '/employees', 'middleware' => 'auth'], function () {

            // all of the route actions for the employee group....

            Route::post('/add', [employee::class, 'add'])->name('store/employee/add');
            Route::put('/edit', [employee::class, 'edit'])->name('store/employee/edit');
            Route::delete('/delete', [employee::class, 'delete'])->name('store/employee/delete');
            // all of the employee routes here
            Route::get('/get/{id}', [employee::class, 'get'])->name('store/employees/get/{id}');
            Route::get('/', [employee::class, 'showCurrentEmployees'])->name('store/employee/get');

            // add employee to the system
         });

        /**
         *  @route: /user/store/get
         *
         *  @purpose: inorder to ge the store of the user
         */
            Route::get ('/get', [store::class, 'get'])->name('/store/get');

         /**
          *   @route / schedule /
          *
          *  @purpose: to get any information related to the schedule of the store
          *
          */


         Route::group(['prefix' => '/schedule'], function () {

            



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


          // settings api routes
          Route::group(['prefix' => '/settings'], function () {

            // change password route
            Route::patch('/changePassword', [settings::class, 'changePassword'])->name('settings/changePassword');
            // change account settings route. this route will be used to change the store settings

            // change the address of the user
            Route::patch('/changeAddress', [settings::class, 'changeAddress'])->name('settings/changeAddress');

            // change the address of the phone number of the user
            Route::patch('/changePhoneNumber', [settings::class, 'changePhoneNumber'])->name('settings/changePhoneNumber');

            // change the location
            Route::patch('/changeLocation', [settings::class, 'changeLocation'])->name('settings/changeLocation');

          });

     });
