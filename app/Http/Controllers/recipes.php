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

        // next lets insert some of the data

        // OK I  JUST FIGURED OUT THAT THE DATABASE IS KIND OF MESSED UP
        // I NEED TO REFACTOR THE TABLES INORDER FOR THE TABLE RELATIONSHIPS TO WORK
        // BE I LITTERALLY HAVE a recipe concencry deadlock problem

        



        // return the response to the client side.
        return response()->json(['status' => 200, 'data' => $data,
         'message' => 'Recipe added successfully', 'result' => $fileToken()]);

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
