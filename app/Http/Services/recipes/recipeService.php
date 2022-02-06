<?php

/**
 *
 *  @file: recipeService.php
 *
 *
 *  @class: recipeService
 *
 *
 *
 *  @purpose: inorder to handle all the requests that are related to the recipe managements and
 *             all other related requests. This class will handle the requests and direct the request
 *             to the appropriate internal method. inorder to handle the requests.
 */


 namespace App\Http\Services\recipes;


 // load our core librarys here

use Illuminate\Http\Request;


 /**
  *   @class: recipeService

    *   @purpose: inorder to handle all the requests that are related to the recipe management of recipes so think
    *              of this class as a controller/ delegator to other classes and methods inorder to execute functionality of our
    *              application.
    *
  */


 class recipeService
 {

    static function create($request)
    {
        // here we will create a new recipe into the system.

    }

    static function delete($request)
    {
        // here we will delete a recipe from the system.
    }


    static function modify($request)
    {
        // here we will modify a recipe from the system.
    }


    static function get($request)
    {
        // here we will get all the recipes in the system.
    }


    static function find($request)
    {
        // here we will find a recipe in the system.
    }


 }



?>
