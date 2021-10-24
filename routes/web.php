<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\home;
use App\Http\Controllers\authentication;

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

Route::get('/{home?}/', [home::class, 'index']);


// end of home page routes 


// authentication routes 
Route::post('/authentication/{request}/', [authentication::class, 'requestType']);

// end of authentication routes

