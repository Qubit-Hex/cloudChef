<?php


/**
 * 
 *  class: RegistrationRequest
 * 
 * 
 *  @purpose: inorder to register a user into our syste, we need to create a registration request
 * 
 */


 namespace App\Http\Services\auth\tasks;


 // models 

use Amp\Success;
use App\Models\User;
 use App\Models\store;
use App\Models\store_members;
use App\Models\user_registration_log;


 // load the required libraries
use App\Http\Services\auth\tasks\validationRequest;
use App\Http\Services\auth\tasks\encryptionRequest;



 class registrationRequest {

    public function __construct() {

        $this->validation = new validationRequest();
        $this->User = new User();
        $this->encryption = new encryptionRequest();
        $this->store_memebers = new store_members();
        $this->stores = new store();
        $this->user_registration_log = new user_registration_log();


        // this will be used to control the state of our application.


        /**
         *  1. active -> job is active 
         *  2. rollback -> job is in rollback
         *  3. completed -> job is completed
         */
        $this->state = false;
    }


    /**
     * 
     *  @method: prepare_query
     *  
     * 
     * 
     *  @purpose: prepare the SQL query to be executed
     * 
     *  @parms: request 
     * 
     */


     public function prepare_query($request) {
         // INSERT THE TABLE 
        try {
            $salt = $this->encryption->generateSalt(25);

            $registerUser = $this->User->create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => hash('sha256', $request['password'] . $salt), 
                'salt' => $salt,
                'remember_token' => null,
                'digital_access_tokens' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
                'status' => 0
            ]);
            return true;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

     }

     /**
      *   @method: doesUserExist($emaill)
      *
      *
      *   @purpose: check if the user exist in the database
      *   @parms: email
      */


      public function doesUserExist($email) {
          try {
                $user = $this->User->where('email', $email)->first();
                if ($user) {
                    return true;
                } 
                    return false;
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }


        /**
         *  @method: add_user_registration_log
         * 
         * 
         * @purpose: add the user registration log
        */

        public function add_user_registration_log() {
            $log = new user_registration_log();
            try {
                $log::insert([
                    'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                    'ip_address' => $_SERVER['REMOTE_ADDR'],
                    'counter' => 1,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]); 
                return true;
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

     /**
      * @method: createGroup
      *
      * @param $userEmail, $companyName
      * @return bool   
      */

      public function createGroup($userEmail, $companyName) {


        try {
              $createStore = $this->stores::insert([
              'name' => $companyName,
              'email' => $userEmail,
              'signature_token' => $this->encryption->generateSalt(25),
            ]);

          // stoe was created successfully   
            return true;
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating store',
                'error' => $e->getMessage()
            ], 500);
        }
      }
      /**
       * 
       *  @method: createAdminRole
       * 
       *   @purpose: create an admin role for the user that was just created 
       * 
       */

       public function createAdminRole($userID, $storeID) {
           $store_members = $this->store_memebers::insert([
               'userID' => $userID,
               'storeID' => $storeID,
               'store_role' => 'admin',
               'created_at' => date('Y-m-d H:i:s'),
               'updated_at' => date('Y-m-d H:i:s'),
           ]);

           if ($store_members) {
            return true;
           } else {
                return false;
           }
       }

       /**
        * 
        *  @method: spam_accounts 
        *
        *  @purpose: inorder to detect when one user is creating more than one 
        *  account, we need to check if the user is spamming the system
        *   
        *   @return: boolean
        */  


        public function spam_accounts() {
            try {
                $log = $this->user_registration_log->where('ip_address', $_SERVER['REMOTE_ADDR'])->all();

                // count the number entrys our system has for this ip address
                $count = count($log);
                
                // is also the number of entrys we want to allow for now!
                // might end up removing this feature as i dont see it very pratical...
                if ($count > 100) {
                    return true;
                } 
                    return false;
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            
            }
        }


        /**
         * 
         *  @method: block_account_access 
         * 
         *  @PURPOSE: INORDER TO BLOCK ACCOUNT ACCESS TO THE ABUSIVE USERS 
         * 
         * 
         * 
         */

         public function block_account_access() {
            try {
                exit(-1);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

    /**
     *  @method: register   
     * 
     *  @purpose: to register the user into the system
     * @param: $input -> array
     *  @return: array
     */

    public function register($input) {
        // our data to preform the insert operation
        // preform all of our check then insert the user into the database
        // after the insert operation is complete run a json object and to client 
        // with instructions on how to proceed.

        $response = [
            'email' => $input['email'],
            'name' => $input['name'],
            'password' => $input['password'],
            'password_confirm' => $input['password_confirm'],
            'company' => $input['company'],
            'name' => $input['name'],
            'token' => $input['token'],
        ];
         // prepare our query for inserting the new user into the table 

         // MAKE CHECK TO PREVENT MASS REGISTRATION
         if ($this->doesUserExist($response['email'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'User already exist',
                'error' => 'User already exist'
            ], 500);
         }

         // CHECK OUR LOG TABLES IF THE USER HAS BEEN REGISTERED BEFORE
         // OR IS CREATING MULITPLIE ACCOUNTS

         if ($this->spam_accounts($_SERVER['REMOTE_ADDR'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have been registered before',
                'error' => 'You have been registered before'
            ], 500);
         }


         // MOVE ON TO THE DATA INSERTION PROCESS

        if ($this->prepare_query($response)) {
    
            if ($this->createGroup($response['email'], $response['company'])) {
                
    
                /**
                 *  Roles:
                 * 
                 * 1. Admin -> admin privs
                 * 2. Manager -> manager privs
                 * 3. User -> user privs
                 * 4. Guest -> guest privs
                 * 
                 */
                 $user= $this->User->where('email', $response['email'])->first();
                 $store = $this->stores->where('email', $response['email'])->first();

                // VERIFY THAT OUR ROLE HAS BEEN CREATED...
                 if ($this->createAdminRole($user->userID, $store->storeID)) {
                     
                    // NOW THAT WE REACHED HERE IT MEANS THAT WE HAVE SUCCESSFULLY CREATED A NEW USER
                    if ($this->add_user_registration_log()) {
                        $registerationQuery = [
                            'status' => 'success',
                            'authenticated' => false,
                            'message' => 'Registration Successful',
                        ];
                        return response()->json($registerationQuery, 200);
                    } 
                    else {
                        // log creatation errror
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Error creating user registration log',
                            'error' => 'Error creating user registration log'
                        ], 500);
                    }
                 } else {
                     // user role error 
                     return response()->json([
                         'status' => 'error',
                        'message' => 'Error creating user role',
                        'error' => 'Error creating user role'], 500);
                 }
                }  else {
                    //store error message
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Error creating store',
                            'error' => 'Error creating store'
                        ], 500);
                }
 
            } else {
                // user table error
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error creating user',
                    'error' => 'Error creating user'
                ], 500);
            }
        }
    }

?>