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



// home page routes  

Route::get('/home/', [home::class, 'index']);
Route::get('/login/', [home::class, 'index']);
Route::get('/register/', [home::class, 'index']);
Route::get('/solutions/', [home::class, 'index']);
Route::get('/pricing/', [home::class, 'index']);
Route::get('/features/', [home::class, 'index']);
Route::get('/', [home::class, 'index']);


// end of home page routes 


// authentication routes 
Route::post('/authentication/{request}/', [authentication::class, 'index']);
Route::get('/authentication/logout/', [authentication::class, 'logout']);
// end of authentication routes