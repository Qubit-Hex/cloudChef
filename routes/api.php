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
            Route::patch('/edit', [employee::class, 'edit'])->name('store/employee/edit');
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

            Route::get ('/get', [schedule::class, 'get'])->name('/schedule/get/');
            Route::post('/add', [schedule::class, 'add'])->name('/schedule/add');
            Route::get('/find', [schedule::class, 'find'])->name('/schedule/find');
            Route::post('/create', [schedule::class, 'create'])->name('/schedule/create');
            Route::get('/show', [schedule::class, 'showEmployeeSchedule'])->name('/schedule/show');
            Route::delete('/delete', [schedule::class, 'delete'])->name('/schedule/delete');

            Route::get('/labourCost', [schedule::class, 'getLabourCost'])->name('/schedule/labourCost/get');

            // sub routes for other scheduling services we need to interact with.
            Route::get('/dropshift', [schedule::class, 'dropshift'])->name('/schedule/dropshift');
            Route::get('/dropshift/get', [schedule::class, 'getDroppedShifts'])->name('/schedule/dropshift/get');
            Route::get('/pickup', [schedule::class, 'postShiftPickupRequest'])->name('/schedule/pickup/');
            Route::get('/requests/' , [schedule::class, 'getRequests'])->name('/schedule/requests/');

            // shift requests routes

            // decline the shift request
            Route::post('/shift/decline', [schedule::class, 'declineShiftRequest'])->name('/schedule/shift/decline');
            Route::post('/shift/accept', [schedule::class, 'acceptShiftRequest'])->name('/schedule/shift/accept');

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
