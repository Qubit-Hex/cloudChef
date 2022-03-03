<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\recipes\core\validation;
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

        $uploadDirectory = '/user-content/recipe/';
        // file upload function here
        $file = $request->file('file');
        $uploaded = $file->store('public/uploads/recipeImage/');
         $file_name = basename($uploaded);
        // create a closure to check if the file is an image


        // validate that the file is actaully an image and not a fake file or scriot of some sort
        function validateFile($file) {
            $allowedFileTypes = [
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
                'svg' => 'image/svg+xml',
            ];

            if (!in_array($file->getMimeType(), $allowedFileTypes)) {
                return false;
            }
            return true;
        }

        //  only only svg, png, jpg, jpeg files
        // we need to filter the file types here inorder to prevent any malicious files from being uploaded
        $allowed = array('svg', 'png', 'jpg', 'jpeg');

        // check is the file allowed
        function checkFileAllowed($file_name, $allowed)
        {
            $ext = pathinfo($file_name, PATHINFO_EXTENSION);
            if (in_array($ext, $allowed)) {
                return true;
            } else {
                return false;
            }
        }


        // check the file size of the image is less than 5mb
        // limit the file size of the image to 5mb
        function checkFileSize($file)
        {
            if ($file->getSize() > 5000000) {
                return false;
            }
            return true;
        }


        // triggers
        if (!validateFile($file)) {
            return response()->json(['error' => 'Invalid file type. only svg, png, jpg files are allowed.']);
        }

        if (!checkFileAllowed($file_name, $allowed)) {
            return response()->json(['error' => 'Invalid file type. only svg, png, jpg files are allowed.']);
        }

        if (!checkFileSize($file)) {
            return response()->json(['error' => 'File size is too large. max size is 5mb.']);
        }

        // next we need to  get the hash value of the file
        $hash = md5_file($file);

        // lets search the entire database for the file hash exists or not
        $file_exists = DB::table('recipe')->where('hash', $hash)->first();

        // we are add the section where permission check is needed

        // if the file exists we need to return the file name
        if ($file_exists) {
            return response()->json(['success' => true, 'hash' => $hash, 'file' => $file_exists->recipe_image]);
        }

        // get and move it to the public server
        // move the file from the private folder to the public folder

        $movedFile = $file->move(public_path($uploadDirectory), $file_name);
        // do some validation checks here

        // return the path of the file to the client side

        $newFileLocation = $uploadDirectory . $file_name;

        // store the uploaded file on the file system
        // return the location of the file to the client side.

        // now lets throw a little honey pot with out response to the client

        $randomBytes = bin2hex(random_bytes(25));


        // add a log entry to the database

        // we need to log any attempts to upload files to the server
        DB::table('logs_recipe_file_logs')->insert([
            'honeypot_hash' => $randomBytes,
            'file_hash' => $hash,
            'file_path' => $newFileLocation,
            'time_stamp' => date('Y-m-d H:i:s'),
            'verified' => 0,
            'message' => 'File uploaded',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
            ]);


        // WE WILL be sending a honey pot to the client side
        // check check later one if the file hash matches the honey pot hash
        return response()->json(['success' => true, 'file' => $hash, 'key' => $randomBytes,  'path' => $newFileLocation], 200);
    }

    /**
     *
     *
     *  @purpose: inorder to add a new recipe to the system
     *
     */

     public function add(Request $request)
     {
         // get the full user input from the user.
            $data = $request->all();
        // we use some closure functions here to validate the data that we are going to add to the system.

        // structure of our data

        $nutritionalFacts = $data['nutritionalFacts'];
        $recipeCookingTime = $data['recipeCookingTime'];
        $recipeIngredients = $data['recipeIngredients']; // array strucutre
        $recipeInstructions = $data['recipeInstructions']; // array structure
        $recipeSummary = $data['recipeSummary'];


        // we going to check the log if the file exists
        $fileToken = function () use ($recipeSummary) {

            $logEntry = DB::table('logs_recipe_file_logs')->where('honeypot_hash', $recipeSummary['key'])->first();

            if ($logEntry) {
                return true;
            }
            return false;
        };


        // check to see if the log entry of the file exists
        // if so then proccess to the next step of the process
        if (!$fileToken()) {
            return response()->json(['error' => 'Invalid file token']);
        }

        // implement the solution for the database relationship here

        // @ stub for the database relationship
        // table storeRecipes  highest order table to access data
        // table recipe         child

        // sub tables
        // recipeSummary    sub component of the recipe
        // NutritionalData  sub component of the recipe
                // recipeSteps    a sub component of the recipe
                // recipeIngredients s

        // unit tests for testing that data base relationships are working

        // OUR FUNCTION TO CREATE OUR TABLES

        // all of our structured quetys will be stored in the database




        /**
         *
         *  @function createTableEntry
         *
         *
         *  @purpose: inorder to create a table entry and the return the id assocated with that entty. this is a helper function
         *
         */

        function createTableEntry($table, $data)
        {
            $DB = DB::table($table)->insert($data);

            // check did the table get created ?
            $table = DB::table($table)->latest()->first();
            // return a factory object
            return $table ? $table->id : false;
        }

        // main store entry for recipes table
        $createRecipeEntry = createTableEntry('store_recipes', [
            'store_id' => 1,
            'token' =>  bin2hex(random_bytes(25)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);


        // perform our check on the store recipes
        if (!$createRecipeEntry) {
            return response()->json(['error' => 'Unable to create recipe entry']);
        }


        // recipe allergy object
        $createRecipeAllergenEntry =  createTableEntry('recipe_allergens', [
            'recipe_id' => $createRecipeEntry, // returns the id of the
            'recipe_allergens' => json_encode([
            'eggs' => $recipeSummary['eggFree'],
            'fish' => $recipeSummary['fishFree'],
            'dairy' => $recipeSummary['dairyFree'],
            'gluten' => $recipeSummary['glutenFree'],
            'nut' => $recipeSummary['nutFree'],
        ]),

        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ]);


         if (!$createRecipeAllergenEntry) {
             return response()->json(['error' => 'Failed to create recipe allergens']);
         }

         // recipe cooking time object
         $createRecipeCookingTime = createTableEntry('recipe_cooking_time', [
            'recipe_id' =>  $createRecipeEntry,
            'recipe_cooking_time' => json_encode($recipeCookingTime),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
         ]);

         if (!$createRecipeCookingTime) {
             return response()->json(['error' => 'Failed to create recipe cooking time']);
         }


         // create recipe flavour profile
         $createRecipeFlavourProfile = createTableEntry('recipe_flavor_profile', [
            'recipe_id' =>  $createRecipeEntry,
            'recipe_flavor_profile' => json_encode([
                'savory' => $recipeSummary['savory'],
                'sweet' => $recipeSummary['sweet'],
                'spicy' => $recipeSummary['spicy']
            ]),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
         ]);

         if (!$createRecipeFlavourProfile) {
             return response()->json(['error' => 'Failed to create recipe flavour profile']);
         }
         // store the recipe ingredients

         $createRecipeIngredients = createTableEntry('recipe_ingredents', [
            'recipe_id' =>  $createRecipeEntry,
            'recipe_ingredients' => json_encode($recipeIngredients),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
         ]);

        if (!$createRecipeIngredients) {
                return response()->json(['error' => 'Failed to create recipe ingredients']);
        }


        $recipeNutritionalFacts = createTableEntry('recipe_nutritional_facts',
        [
            'recipe_id' =>  $createRecipeEntry,
            'recipe_nutritional_facts' => json_encode($nutritionalFacts),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        // check did the operation get completed correctly
        if (!$recipeNutritionalFacts) {
            return response()->json(['error' => 'Failed to create recipe nutritional facts']);
        }

        // recipe steps

        $recipeSteps = createTableEntry('recipe_steps', [
            'recipe_id' =>  $createRecipeEntry,
            'recipe_steps' => json_encode($recipeInstructions),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        // check did the operation get completed correctly.
        if (!$recipeSteps) {
            return response()->json(['error' => 'Failed to create recipe steps']);
        }

        // check the recipe entry that the front end will interact with

        $createRecipe = createTableEntry('recipe', [
            'store_id' => 1,
            'recipe_id' => $createRecipeEntry,
            'recipe_name' => $recipeSummary['recipeName'],
            'catagory' => $recipeSummary['recipeCatagory'],
            'recipe_image' => $recipeSummary['recipeImage'],
            'hash' => $recipeSummary['key'],
            'recipe_ingredient_id' => $createRecipeIngredients,
            'recipe_allergens_id' => $createRecipeAllergenEntry,
            'recipe_cooking_time' => $createRecipeCookingTime,
            'recipe_steps_id' => $recipeSteps,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        if (!$createRecipe) {
            return response()->json(['error' => 'Failed to create recipe']);
        }

        // return the response to the client side.
        return response()->json(['status' => 200, 'data' => $recipeSummary,
         'message' => 'Recipe added successfully']);

     }

     /**
      *  @method: delete
      *
      *
      *  @purpose: inorder to delete a recipe from the system
      */

    public function delete(Request $request)
    {
        // get the recipe id
        $recipeId = $request->header('recipeId');

        // perform our checkson the store recipe?

        // check if the recipe id is empty
        if (empty($recipeId)) {
            return response()->json(['error' => 'Recipe id is empty']);
        }

        // check if the recipe id is a number
        if (strlen($recipeId) > 10) {
            return response()->json(['error' => 'Recipe id is too long']);
        }

        // check if the recipe id is a number
        if (strlen($recipeId) < 1) {
            return response()->json(['error' => 'Recipe id is too short']);
        }

        // check if the recipe id is a number
        if ($recipeId > 1000000) {
            return response()->json(['error' => 'Recipe id is greater than 1 million']);
        }

        // all of our checks have passed so now lets delete the recipe

        // delete the recipe
        $deleteRecipe = DB::table('recipe')->where('recipe_id', $recipeId);


        // delete the following entries from the database inorder to delete the recipe.

        $recipe = DB::table('recipe')->where('recipe_id', $recipeId)->delete();
        $recipe_allergens = DB::table('recipe_allergens')->where('recipe_id', $recipeId)->delete();
        $recipe_cooking_time = DB::table('recipe_cooking_time')->where('recipe_id', $recipeId)->delete();
        $recipe_flavour_profile = DB::table('recipe_flavor_profile')->where('recipe_id', $recipeId)->delete();
        $recipe_ingredients = DB::table('recipe_ingredents')->where('recipe_id', $recipeId)->delete();
        $recipe_nutritional_facts = DB::table('recipe_nutritional_facts')->where('recipe_id', $recipeId)->delete();
        $recipe_steps = DB::table('recipe_steps')->where('recipe_id', $recipeId)->delete();

        // check if the recipe was deleted
        if (!$recipe) {
            return response()->json(['error' => 'Failed to delete recipe']);
        }

        if (!$recipe_allergens) {
            return response()->json(['error' => 'Failed to delete recipe allergens']);
        }

        if (!$recipe_cooking_time) {
            return response()->json(['error' => 'Failed to delete recipe cooking time']);
        }

        if (!$recipe_flavour_profile) {
            return response()->json(['error' => 'Failed to delete recipe flavour profile']);
        }

        if (!$recipe_ingredients) {
            return response()->json(['error' => 'Failed to delete recipe ingredients']);
        }

        if (!$recipe_nutritional_facts) {
            return response()->json(['error' => 'Failed to delete recipe nutritional facts']);
        }

        if (!$recipe_steps) {
            return response()->json(['error' => 'Failed to delete recipe steps']);
        }


        // return the response to the client side.
        return response()->json(['status' => 200, 'message' => 'Recipe deleted successfully']);
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

    /**
     *
     *  @method: update
     *
     *
     *  @purpose: inorder to update a recipe
     *
     */

     public function update(Request $request) {

        // @stub
        // implieent a resource update on a given recipe

        // reciope ID

        $recipe = $request->header('recipeId');
        $accessToken = $request->header('accessToken');

        // check if the recipe id is provided.
        $recipeData = $request->all();


        if ($recipe == null) {
            return response()->json(['message' => 'Please provide a recipe id'], 400);
        }

        // perform some validation check on the token that was provided

        // 1. validate the users account
        // 2. validate the users access token


        $validate  = new Validation();

        // validate the users account
        if ($validate->validateUser($accessToken) == false) {
            return response()->json(['message' => 'Invalid access token'], 401);
        }

        // next validate the users permissions
        // next lets validate the recipe id that was provided.
        //  lets update the recipe ingredients in the database

        function updateRecipeIngredients($recipeId, $recipeIngredients) {
            // update the recipe ingredients in the database
            $updateRecipeIngredients = DB::table('recipe_ingredents')->where('recipe_id', $recipeId)->update([
                'recipe_ingredients' => $recipeIngredients,
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            // check if the recipe ingredients were updated successfully
            if ($updateRecipeIngredients === false) {
                return response()->json(['message' => 'Failed to update recipe ingredients'], 500);
            } else {
                return response()->json(['message' => 'Recipe ingredients updated successfully'], 200);
            }
        }

        // update the recipes step in the database
        function updateRecipeSteps($recipeId, $recipeSteps) {
            // update the recipe ingredients in the database
            $updateRecipeSteps = DB::table('recipe_steps')->where('recipe_id', $recipeId)->update([
                'recipe_steps' => $recipeSteps,
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            // check if the recipe ingredients were updated successfully
            if ($updateRecipeSteps === false) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to update recipe steps'], 500);
            } else {
                return response()->json([
                        'status' => 200,
                        'message' => 'Recipe steps updated successfully'], 344);
            }
        }

        // update the recipe nutritional facts.
        function updateNutritionalFacts($recipeId, $nutritionalFacts) {
            // update the recipe ingredients in the database
            $updateNutritionalFacts = DB::table('recipe_nutritional_facts')->where('recipe_id', $recipeId)->update([
                'recipe_nutritional_facts' => $nutritionalFacts,
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            // check if the recipe ingredients were updated successfully
            if ($updateNutritionalFacts === false) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to update recipe nutritional facts'], 500);
            } else {
                return response()->json([
                        'status' => 200,
                        'message' => 'Recipe nutritional facts updated successfully'], 344);
            }

        }


        // update the recipes general information
        function updateRecipeSummary($recipeId, $recipeData)
        {
            // update the recipe table
            $recipeTable = DB::table('recipe')->where('recipe_id', $recipeId)->update([
                'recipe_name' => $recipeData['recipeSummary']['recipe_name'],
                'catagory' => $recipeData['recipeSummary']['catagory'],
                'updated_at' => date('Y-m-d H:i:s')
            ]);

            // now update the recipe flavour profile
            $recipeFlavourProfile = DB::table('recipe_flavor_profile')->where('recipe_id', $recipeId)->update([
                'recipe_flavor_profile' =>  $recipeData['recipeFlavourProfile'],
                'updated_at' => date('Y-m-d H:i:s')
            ]);

            // now lets update the recipe allergens
            $recipeAllergens = DB::table('recipe_allergens')->where('recipe_id', $recipeId)->update([
                'recipe_allergens' => $recipeData['recipeAllergies'],
                'updated_at' => date('Y-m-d H:i:s')
            ]);

            // check to make sure that the recipe was updated successfully
            if ($recipeTable === false || $recipeFlavourProfile === false || $recipeAllergens === false) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to update recipe'], 500);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Recipe updated successfully'], 344);
            }
        }

      $updatedNutritionalData = updateRecipeSummary($recipe, $recipeData);
       // $updateRecipeIngredients = updateRecipe($recipe, $recipeData);
        // check if the recipe ingredients were updated successfully
        return $updatedNutritionalData;
     }
}
