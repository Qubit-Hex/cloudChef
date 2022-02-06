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
     *  @method: create
     *
     *
     *  @purpose: inorder to create a new recipe into the system
     */


     public function create(Request $request)
     {
        // here we will create a new recipe into the system.
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
