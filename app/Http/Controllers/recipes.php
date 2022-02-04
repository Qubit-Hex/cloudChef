<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class recipes extends Controller
{
    /**
     *  @method: GET
     *
     *  @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
     *
     */
    public function get(Request $request)
    {
        return response()->json(['message' => 'Hello World'], 200);
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

        // map all the results that we need to return to our application.
        // this is just to organize the data that we are returning to the client.
        // nothing more, actually to keep me sane.

        $result = [
            'recipe' => $queryResult,
            'allergy_info' => DB::table('recipe_allergens')->where('recipe_id', $id)->first(),
            'flavour_profile' => DB::table('recipe_flavor_profile')->where('recipe_id', $id)->first(),
            'recipe_ingredients' => DB::table('recipe_ingredents')->where('recipe_id', $id)->first(),
            'recipe_steps' => DB::table('recipe_steps')->where('recipe_id', $id)->first(),
            'recipe_cooking_time' => DB::table('recipe_cooking_time')->where('recipe_id', $id)->first()
        ];

        if ($queryResult == null) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        return response()->json(['data' => $result], 200);
    }
}
