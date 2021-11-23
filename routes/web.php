<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\home;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



/**
 *      Routes: Home page routes 
 * 
 *     @purpose: to provide the home page routes for the user 
 */


Route::get('/home/', [home::class, 'index']);
Route::get('/login/', [home::class, 'index'])->name('login');
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
 *      Routes: Dashboard routes 
 * 
 *     @purpose: to route the dashboard routes of the application     
 */




// final route if no other route is matched
Route::get('/', [home::class, 'index']);
// end of home page application routes =