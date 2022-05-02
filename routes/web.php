<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\home;
use App\Http\Controllers\authentication;
use App\Http\Controllers\dashboard;
use App\Http\Controllers\mailer;
use App\Models\user_registration_log;
use Illuminate\Http\Request;

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

// the home routes for the mains pages.. 
Route::get('/home/', [home::class, 'index']);
Route::get('/login/', [home::class, 'loginPage']);
Route::get('/register/', [home::class, 'index']);
Route::get('/solutions/', [home::class, 'index']);
Route::get('/pricing/', [home::class, 'index']);
Route::get('/features/', [home::class, 'index']);
Route::get('/reset/', [home::class, 'index']);



Route::get('/email', function (Request $request) {

    $obj = [
        'email' => 'test@gmail.com'
    ];

    return view('email/reset_password', $obj);
});


/**
 *      Routes: Authentication routes
 *
 *     @purpose: to route the authentication routes of the application
 */

Route::post('/authentication/login/', [authentication::class, 'login'])->name('auth/login/');
Route::post('/authentication/register/', [authentication::class, 'register'])->name('register');
Route::get('/authentication/logout/', [authentication::class, 'logout'])->name('logout');


Route::group(['prefix' => '/authentication'], function () {
    Route::post('/login/', [authentication::class, 'login'])->name('auth/login/');
    Route::post('/register/', [authentication::class, 'register'])->name('register');
    Route::get('/logout/', [authentication::class, 'logout'])->name('logout');

    // route of the activation token
    Route::get('activate/{token}', [authentication::class, 'account_activation'])->name('activate');
    // route of the reset password token.
    Route::get('/reset/{token}', [authentication::class, 'reset'])->name('reset');
});




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
