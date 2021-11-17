<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
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
 * 
 *  Route: GET /auth/
 * 
 *  purpose: to get the user's token
 * 
 *  @param: email, password
 *  @return: token 
 */


Route::get('/auth/', function (Request $request) {
    
    if ($request->input('key') === '1234') {
        echo "hello mate";
    }
});