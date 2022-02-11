<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class recipes extends Controller
{
    public function __construct()
    {
        // load our default resources and libs here that we will use for our methods in this class

    }

    /**
     *
     *  @method: file
     *
     *
     *  @purpose: inorder to check uploaded files and save them to the server
     *
     */
    public function file(Request $request)
    {
        // change this later to be dynamic

        // new feature will include a factory method of uploading files to the server

        // but all stores will have a version number and a version number will be incremented everytime a new version is uploaded
        // and bucket hash will be a stores unique hash that will be used to store the files in the server

        // from there we have a base file system as such for our upload structure

        // for now we will keep our upload system the same, but we will have to change the file structure to be dynamic later one
        // otherwise we will have a collision.

        /**
         *   @blueprint:
         *              \v1\
         *                   \sioasdfjdiujfsd\
         *
         *                      BASE DIRECTORY
         *
         *                      SERVER GENERATATED DIRECTORY.
         *
         *                                     \recipeImages\catphoto.jpg
         *
         */

        $uploadDirectory = '/fs/v1/recipes/';

        // file upload function here
        $file = $request->file('file');
        $uploaded = $file->store('public/v1/recipes/');

        // get and move it to the public server
        $file_name = basename($uploaded);

        // move the file from the private folder to the public folder
        $movedFile = $file->move(public_path($uploadDirectory), $file_name);

        // do some validation checks here
        // return the path of the file to the client side
        $newFileLocation = $uploadDirectory . $file_name;

        // store the uploaded file on the file system
        // return the location of the file to the client side.
        return response()->json(['success' => true, 'uploaded' => $newFileLocation], 200);
    }

    /**
     *
     *
     *  @purpose: inorder to add a new recipe to the system
     *
     */

     public function add(Request $request)
     {
            $data = $request->all();


        // we use some closure functions here to validate the data that we are going to add to the system.

        function validateRecipeSummary($data)
        {
            // here we will validate the recipe summary information that we are going to add to the system.

        }


        function validateRecipeInstructions($data)
        {
            // here we will validate the recipe instructions information that we are going to add to the system.

        }


        function validateRecipeIngredients($data)
        {
            // here we will validate the recipe ingredients information that we are going to add to the system.

        }


        function validateRecipeNutrition($data)
        {
            // here we will validate the recipe nutrition information that we are going to add to the system.

        }


        function validateRecipeCookingTime($data)
        {
            // here we will validate the recipe cooking time information that we are going to add to the system.

        }



        return response()->json(['status' => 200, 'data' => $data, 'message' => 'Recipe added successfully']);

     }

     /**
      *  @method: delete
      *
      *
      *  @purpose: inorder to delete a recipe from the system
      */

    public function delete(Request $request)
    {
        // here we will delete a recipe from the system.
    }


    /**
     *  @method: GET
     *
     *  @purpose: inorder to fetch all the recipes in the database that that current user has access to.
     *
     */

    public function get(Request $request)
    {
        $recipeResponse = DB::table('recipe')->get();

        if ($recipeResponse != null) {
            return response()->json(['status' => 'success', 'data' => $recipeResponse], 200);
        } else {
            return response()->json(['status' => 'error', 'data' => 'No recipes found'], 404);
        }
    }


    /**
     *
     *  @method: find
     *
     *
     *  @purpose: inorder to find a recipe by its id
     *
     */

    public function find(Request $request, $id)
    {

        // add the authentication methods to this request object

        if ($id == null) {
            return response()->json(['message' => 'Please provide a recipe id'], 400);
        }
        // return the recipe data if the recipe id is found and the user is authenticated...

        // @stub
        // -- recipe data
        //      -- recipe directions
        //      -- recipe ingredients
        //      -- recipe name
        //      -- recipe id
        //      -- recipe image
        //      -- recipe description
        //      -- recipe category
        //      -- recipe type

        $queryResult = DB::table('recipe')->where('recipe_id', $id)->first();

        if ($queryResult == null) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }


        // map all the results that we need to return to our application.
        // this is just to organize the data that we are returning to the client.
        // nothing more, actually to keep me sane.


        // in the future we will need to add more data to the response that we are returning to the client.
        // for now we will just return the recipe data.

        $result = [
            'recipe' => $queryResult,
            'allergy_info' => DB::table('recipe_allergens')->where('recipe_id', $id)->first(),
            'flavour_profile' => DB::table('recipe_flavor_profile')->where('recipe_id', $id)->first(),
            'recipe_ingredients' => DB::table('recipe_ingredents')->where('recipe_id', $id)->first(),
            'recipe_steps' => DB::table('recipe_steps')->where('recipe_id', $id)->first(),
            'recipe_cooking_time' => DB::table('recipe_cooking_time')->where('recipe_id', $id)->first(),
            'recipe_nutritional_facts' => DB::table('recipe_nutritional_facts')->where('recipe_id', $id)->first()
        ];


        return response()->json(['data' => $result], 200);
    }
}
