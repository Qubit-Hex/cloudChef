<?php


/**
 * 
 * 
 *  @class: RegistrationRequest 
 * 
 * 
 *  @purpose: inorder to proccess the user registration for new accounts into the system 
 */



 namespace App\Http\Services\Auth;

 use App\Http\Services\Auth\modules\encryption;
 use Illuminate\Support\Facades\DB;

class RegistrationRequest {


    // SET OUR THROTTLE LIMIT
    protected $rateLimit = 5;
    protected $rateLimitTableName = 'user_registration_log';
    
    // SET OUR THROTTLE TIMEOUT

    protected $requestLimit = 50;

    public function __construct(Array $data)
    {   
        // load our encryption lib in our class
        $this->encryption = new encryption();
        $this->data = $data;
    }

    /**
     *  
     *  @method: registerUser 
     *  
     *  @purpose: to register a new user into the system
     */

     public function registerUser(array $data) {
        // generate our sql query for the user Registration 
        $SQL_QUERY = $this->generateSQLQuery($data);

        // next we are going to look up how many users are registered with the same ip address 
        // let set a rate limit to max of 5 accounts to prevent bots from registring

        if (!$this->checkRateLimit()) {
            return response()->json(['status' => 'error', 'message' => 'You have met or successed number of accounts 
            allowed by this IP Address!'], 401);
        }

        // check if user already exists in our system
        $db_user = DB::table('users')->where('email', $data['username'])->first();
        
        if ($db_user) {
            return response()->json(['status' => 'error', 'message' => 'User already exists!'], 401);
        }
        // insert our user into the database using our REQUEST THAT WE FORMED 
        $user_id = DB::table('users')->insertGetId($SQL_QUERY);

        if (!$user_id) {
            return response()->json(['status' => 'error', 'message' => 'User Registration Failed!'], 401);
        }

        // add our record since the registration insert was successful
        if (!$this->generateRegistrationLog()) {
            return response()->json(['status' => 'error', 'message' => 'Registration Failed!'], 401);
        }

        // force the user to login for the first time after the registration is complete 
        // we will return the user to the login page
        return response()->json(['status' => 'success',
                                 'message' => 'User Registration Successful!',
                                 'redirectTo' => '/login/'], 200);
     }

     /**
      *   @method: generateSQLQuery 
      *
      *   @purpose: to generate the query array for the registration request
      */

     public function generateSQLQuery(array $data) {
            // build the insert array that we will  passing into the user model

            $salt = $this->encryption->random();
            $userData = [
                'name' => $data['name'],
                'email' => $data['username'],
                'password' => $this->encryption->generatePasswordHash($data['password'], $salt, 'sha256'),
                'salt' => $salt,
                'remember_token' => $this->encryption->random(32),
                'digital_access_tokens' => $this->encryption->random(32),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'), // we will update this later
                'status' => true, // if false the account is disabled
            ];          
            return $userData;
        }


        /**
         * 
         * @method: checkRateLimit 
         * 
         *  @purpose: inorder to add a rate throttle to the registration process
         * 
         */

         public function checkRateLimit() {
             // check if the user has exceeded the rate limit
             $rate = DB::table($this->rateLimitTableName)->where('ip_address', $_SERVER['REMOTE_ADDR'])->count();

             return $rate >= $this->rateLimit ? false : true;
         }


         /**
          * 
          *  @method: generateRegistrationLog 
          *
          *  @purpose: inorder to create a entry in the registration log table
          *
          * @return: void
          *
          */

          public function generateRegistrationLog()  {
              // insert the user into the registration log table
              return $db = DB::table('user_registration_log')->insert([
                  'ip_address' => $_SERVER['REMOTE_ADDR'],
                  'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                  'created_at' => date('Y-m-d H:i:s'),
                  'updated_at' => date('Y-m-d H:i:s'),
              ]);
            }
}


?>