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
use App\Http\Controllers\mailer;
use App\Models\password_reset;



class authentication extends Controller
{


    public function __construct()
    {
        $this->mail = new mailer();
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
      $email = $request->input('username');
      $password = $request->input('password');
      $storeID =  (int) $request->input('clientId');
      $token = $request->input('_token');

      /// ------ MODELS -------------------------

      $userModal = new User();
      $storeMembers = new store_members();
      $userStore = new store();
      $currentUserSessions = new user_sessions();

    // ------ VALIDATION -------------------------

        // validate the email address
        if (!authValidation::validateEmail($email)) {
            // email is not valid
            return response()->json(['status' => 'error', 'message' => 'email is not valid']);
        }

        // validate the password
        if (!authValidation::validatePassword($password)) {
            // password is not valid
            return response()->json(['status' => 'error', 'message' => 'password is not valid']);
        }

        // validate the store id
        if (!authValidation::validateStoreID($storeID)) {
            // store id is not valid
            return response()->json(['status' => 'error', 'message' => 'store id is not valid']);
        }


        // ------- Authentication =---------------

        // issue the handshake that the validation did not fail
        $handshake = authValidation::loginHandShake($email, $password, $storeID);
        $currentUser = $userModal->getUserByEmail($email);
        $password = hash('sha256', $password . $currentUser->salt);
        $currentStore = $userStore->getStoreByID($storeID);
        $currentStoreMember = $storeMembers->verifyStoreMembership($storeID, $currentUser->userID);

        // does the user exist
        if (!$currentUser) {
            // user does not exist
            return response()->json(['status' => 'error', 'message' => 'user does not exist']);
        }

        // check is the password that we were given is the same as the one in the databas

        if ($currentUser->password != $password) {
            // password is not valid
            return response()->json(['status' => 'error', 'message' => 'password is not valid']);
        }

        // check does the store exist for the user.
        if (!$currentStore) {
            // store does not exist
            return response()->json(['status' => 'error', 'message' => 'store does not exist']);
        }

        // next lets check if the user is a member of that store.
        if (!$currentStoreMember) {
            // user is not a member of the store
            return response()->json(['status' => 'error', 'message' => 'user is not a member of the store']);
        }



        // ------------ start a session ---------------

        // create the user sessions for the user
        // out toke should only be valid for 3 hours
        // delete the old session if exists

        $currentUserSessions->deleteSession($currentUser->userID);
        $userModal->updateToken($handshake, $currentUser->userID);
        $accessToken  = setcookie('accessToken', $handshake, time() + (60 * 60 * 3), "/");
        $currentUserSessions->createSession($currentUser->userID, $handshake, hash('sha256', $_SERVER['REMOTE_ADDR'] . $handshake));

        // we are now logged into the system so lets redirect the user to the dashboard
        return response()->json(['status' => 'success',
                                 'authenticated' => true,
                                'message' => 'user is logged in',
                                'redirect' => '/dashboard/']);

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
        $token = hash('sha256', bin2hex(random_bytes(64)));

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

                    $tokenRefresh = $userModel->updateToken($token, $userID);
                    // create the access token cookie




                    if (!$this->mail->user_registration($email, $password, $storeID, $token)) {
                        return response()->json([
                            'authenticated' => true,
                            'status' => 'success',
                            'message' => 'Registration was successful'], 200);
                    }

                    // we are now authenticated to redirect the user
                    return response()->json([
                        'authenticated' => true,
                        'status' => 'success',
                        'message' => 'Registration was successful, Please check email to activate account.'], 200);

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
        // destroy all the tokens
       $UserModal = new User();
       $userSessions = new user_sessions();

       // get the user id usign the access token cookie
        $currentUser = $UserModal->getUserByRemeberToken($_COOKIE['accessToken']);


        // does the user exists if so are they glued to a session?
        if (!$currentUser) {
            // user is not logged in
            return response()->json([
                'authenticated' => false,
                'message' => 'User is not logged in', 'error' => 'User is not logged in'], 401);
        }
        // remove all of our stateless sessions from the database
        $userSessions->deleteSession($currentUser->userID);
        // remove the access token
        setcookie('accessToken', '', time() - 3600, "/");
        // redirect the user
        return redirect('/');
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
        // the auth middleware is attached to this method in order to validate request
        // so if the request goes though we will be sending this to the front end.

        return response()->json([
            'authenticated' => true,
            'status' => 'success',
            'message' => 'User has been verified', 'error' => 'User has been verified'], 200);

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

    public function permissions(Request $request)
    {

        # modals
        $userModel = new User();
        $storeModal = new store();
        $storeMemberModal = new store_members();
        $userSessionsModal = new user_sessions();

        // return the json response with the permissions of the user.
        $currentUser = $userModel->getUserByRemeberToken($_COOKIE['accessToken']);

        // does the user exists if so are they glued to a session?
        if (!$currentUser) {
            // user is not logged in
            return response()->json([
                'authenticated' => false,
                'message' => 'User is not logged in', 'error' => 'User is not logged in'], 401);
        }
        // confirm the user is logged in with the stateless sessions that we have setup

        $currentUserSession = $userSessionsModal->getSessionByToken($_COOKIE['accessToken']);

        if (!$currentUserSession) {
            // user is not logged in
            return response()->json([
                'authenticated' => false,
                'message' => 'User is not logged in', 'error' => 'User is not logged in'], 401);
        }

        // lets get a store_member based on the information that we have so far

        $storeMember = $storeMemberModal->getMembersByID($currentUser->userID);
        // now lets we have our store members information.
        // we now will check the permissions of the user.

        if (!$storeMember) {
            // user is not logged in
            return response()->json([
                'authenticated' => false,
                'message' => 'User is not logged in', 'error' => 'User is not logged in'], 401);
        }

        // return the role of the user inside of our store
        return response()->json([
            'authenticated' => true,
            'status' => 'success',
            'message' => 'User has been verified', 'error' => 'User has been verified',
            'permissions' => $storeMember->store_role], 200);
    }


    /***
     *
     *  @method: reset_password
     *
     *  @purpose: to reset the password of the user that is connected to the systen\
     *
     *
     */

    public function reset_password(Request $request)
    {
        // get the email of the user
        $email = $request->input('email');

        if (!$email) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email is required', 'error' => 'Email is required'], 401);
        }

        // does the user exist in the system?
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User does not exist', 'error' => 'User does not exist'], 401);
        }


        // generate a reset token
        $random_paddings = openssl_random_pseudo_bytes(128);
        // time stamp the token
        // and hash it inorder to make it unique
        $resetToken = hash('whirlpool', $user->userID . $user->email . $random_paddings . time());

       // add an entry to our password reset table.
       if (password_reset::add($user->email, $resetToken, $user->userID)) {
           // send the email to the user of the password reset.
            return $this->mail->password_reset($user->email, $resetToken, $user->userID);

       }  else {
           // couldn't  add the entry to the database
              return response()->json([
                'message' => 'Could not add the entry to the database',
                'error' => 'Could not add the entry to the database'],
                401);
       }
    }
}
