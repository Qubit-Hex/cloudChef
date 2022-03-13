<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\home;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;




// auto loading our sub-routes
require 'domains.php';



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|

/**
 *      Routes: Home page routes
 *
 *     @purpose: to provide the home page routes for the user
 */


Route::get('/home/', [home::class, 'index']);
Route::get('/login/', [home::class, 'loginPage'])->middleware('auth');
Route::get('/register/', [home::class, 'index']);
Route::get('/solutions/', [home::class, 'index']);
Route::get('/pricing/', [home::class, 'index']);
Route::get('/features/', [home::class, 'index']);


/**
 *      Routes: Authentication routes
 *
 *     @purpose: to route the authentication routes of the application
 */

Route::post('/authentication/login/', [authentication::class, 'login'])->name('auth/login/');
Route::post('/authentication/register/', [authentication::class, 'register'])->name('register');




/**
 *      Group Route: Dashboard
 *
 *     @purpose: to route the dashboard routes of the application
 */

// dashboard group route
Route::group(['prefix' => 'dashboard', 'middleware' => 'auth'], function () {
    Route::get('/', [dashboard::class, 'index'])->name('dashboard');
    Route::get('/{page}', [dashboard::class, 'index']);
    Route::get('/{page}/{subApplication}', [dashboard::class, 'index']);
});




// final route if no other route is matched
Route::get('/', [home::class, 'index']);
// end of home page application routes =





