<?php
/**
 *
 *
 *   @class: authentication
 *
 *
 *  @purpose:  inorder to provide authentication services for the user that is connected to the system
 *
 *
 *
 */


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\validation\authValidation;

use App\Models\User;
use App\Models\store_members;
use App\Models\store;
use App\Models\user_sessions;



class authentication extends Controller
{


    public function __construct()
    {

    }

    /**
     *
     *  @method: login
     *
     *  @purpose: to form the login request the will be sent to the authentication service
     *
     *  @param: arrayt $request;
     */

    public function login(Request $request)
    {
      // form our login request
      $email = $request->input('email');
      $password = $request->input('password');
      $storeID = $request->input('storeID');


    }

    /**
     *  @method: register
     *
     *  @purpose: to register a new user to the system
     *  @param: array $request
     */


    public function register(Request $request)
    {

        // user submitted input
        $email = $request->input('email');
        $fullname = $request->input('fullname');
        $company = $request->input('company');
        $password = $request->input('password');
        $confirmPassword = $request->input('password_confirm');

        // preform all the rule checks before we proceed
        if (authValidation::validateEmail($email) == false) {
            // email is not valid
            return response()->json([
                'authenticated' => false,
                'message' => 'Email is not valid', 'error' => 'Email is not valid'], 401);
        }

        if (authValidation::validatePassword($password) == false) {
            // password is not valid
            return response()->json([
                'authenticated' => false,
                'message' => 'Password is not valid, password must be at least 6 characters long. ',
                'error' => 'Password is not valid'], 401);
        }

        if (authValidation::validateName($fullname) == false) {
            // name is not valid
            return response()->json([
                'authenticated' => false,
                'message' => 'Name is not valid, name must be at least 2 characters long. ',
                'error' => 'Name is not valid'], 401);
        }

        // check if the passwords match
        if (authValidation::doPasswordsMatch($password, $confirmPassword) == false) {
            // passwords do not match
            return response()->json([
                'authenticated' => false,
                'message' => 'Passwords do not match', 'error' => 'Passwords do not match'], 401);
        }

        // validate the company name
        if (authValidation::validateCompanyName($company) == false) {
            // company name is not valid
            return response()->json([
                'authenticated' => false,
                'message' => 'Company name is not valid, company name must be at least 2 characters long. ',
                'error' => 'Company name is not valid'], 401);
        }
        // refresh the cookie for every instance.
        $validationHandshake = authValidation::_getHandShake($email, $fullname, $password, $confirmPassword, $company, $company);
        // create a cookie with the validation
        $validationCookie = authValidation::_createCookie($validationHandshake);
        // get the validation cookie value
        $validationCookieValue = $validationCookie->getValue();

        // ------- modals ---------------------------------


        $userModel = new User();
        $storeMemberModel = new store_members();
        $storeModel = new store();

        // check if the email is already registered

        if ($userModel->getUserByEmail($email) != null) {
            // email is already registered
            return response()->json([
                'authenticated' => false,
                'message' => 'Email is already registered', 'error' => 'Email is already registered'], 401);
        }

        // ok the email is available, lets create the user
        $salt = hash('sha256', bin2hex(random_bytes(64)));

        if ($userModel->createUser($fullname, $email,$password, $salt))
        {
            // create the store of the user
            $storeHash = hash('sha256', bin2hex(random_bytes(64)));

            if ($storeModel->createStore($company, $email, $storeHash))
            {
                // create the store member of the store

                $userID = $userModel->getUserByEmail($email)->userID;
                $storeID = $storeModel->getStoreByEmail($email)->storeID;
                if ($storeMemberModel->createMember($userID, $storeID, 'admin'))
                {
                    // create a authentication cookie for the user
                    // since the users registration was successful
                    $token = hash('sha256', bin2hex(random_bytes(64)));
                    $tokenRefresh = $userModel->updateToken($userID, $token);
                    // create the access token cookie
                    setcookie('accessToken', $token, time() + (86400 * 30), "/"); // 86400 = 1 day
                    $userSessions = new user_sessions();

                    // hold our session entry.
                    $userSessionEntry = $userSessions->createSession($userID, $token, hash('sha256',
                                                                 $_SERVER['REMOTE_ADDR'] . $token));

                    if ($userSessionEntry === false) {
                        // failed to create the session
                        return response()->json([
                            'authenticated' => false,
                            'message' => 'Failed to create session', 'error' => 'Failed to create session'], 401);
                    }

                    // we are now authenticated to redirect the user
                    return response()->json([
                        'authenticated' => true,
                        'status' => 'success',
                        'message' => 'Registration was successful'], 200);

                } else {
                    return response()->json([
                        'authenticated' => false,
                        'message' => 'Registration failed', 'error' => 'Registration failed'], 401);
                }

                return response()->json([
                    'authenticated' => true,
                    'message' => 'User created successfully', 'error' => 'User created successfully'], 200);

            }
            else
            {
                return response()->json([
                    'authenticated' => false,
                    'message' => 'User created successfully, but store could not be created',
                    'error' => 'User created successfully, but store could not be created'], 401);
            }
        }
        else {
            return response()->json([
                'authenticated' => false,
                'message' => 'User could not be created', 'error' => 'User could not be created'], 401);
        }

        return response()->json([
            'authenticated' => true,
            'message' => 'User has been registered', 'error' => 'User has been registered',
            'validation' => $validationCookieValue], 200);

    }

    /**
     *  @method: logout
     *
     *  @purpose: to logout the user from the system
     *
     *  @param: array $request
     */

    public function logout(Request $request)
    {

    }

    /**
     *
     *  @method: verify
     *
     *  @purpose: to verify the user that is connected to the system it take a token value as the input when funneling the request
     *
     */


    public function verify(Request $request)
    {
        // use the auth middleware to verify the user

        $this->middleware('auth');


        return response()->json([
            'authenticated' => true,
            'status' => 200,
            'message' => 'User is authenticated', 'error' => 'User is authenticated'], 200);

    }

    /**
     *
     *  @method: checkPermissions
     *
     *
     *  @purpose: to check the permissions of the user that is connected to the system
     *
     *  @param: array $request ( we will use the token value as the input) inorder to validate the user and return
     *          a permission token that will be used to check the permissions of the user
     */

    public function checkPermissions(Request $request)
    {

    }
}
