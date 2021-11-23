<?php

/**
 *
 * @class: authenticationRequest
 *
 *
 *  @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
 *
 *  @author: Oliver Shwaba -> Qubit-hEx
 */

namespace App\Http\Services\auth\tasks;

use App\Http\Services\auth\tasks\encryptionRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\store;
use App\Models\store_members;
use App\Models\sessions;

class authenticationRequest
{
    // SECURITY SETTINGS BELOW

    // MAXIMUM NUMBER OF ATTEMPTS TO LOGIN BEFORE USER IS BLOCKED
    const MAX_LOGIN_ATTEMPTS = 25;
    const MAX_LOGIN_ATTEMPTS_TIME = 60; // THIS IS IN MINUTES
    const KEY_LENGTH = 32;
    const HASHING_ALGO = 'sha256';
    const SALT_LENGTH = 32;
    const ENCRYPTION_ALGO = 'AES-256-CBC';

    public function __construct()
    {
        // LOAD OUR ENCRYPTION MODULE
        $this->encryptionRequest = new encryptionRequest();

        // Models that we will be using
        $this->user = new User();
        $this->store = new store();
        $this->store_members = new store_members();
        $this->sessions = new sessions();
    }


    /**
     * 
     *  @method: userExist
     * 
     *  @purpose: to check if the user exist in the database
     */

     public function userExist($email)
     {
        $user = $this->user->where('email', $email)->first();

        if ($user) {
            return true;
        } else {
            return false;
        }
     }


    /**
     * 
     * @method: userBanned 
     * 
     *  @purpose: to check if the user is banned or not 
     * 
     */

     public function userBanned($userID)
     {
       $user = $this->user->where('userID', $userID)->first();

        if($user->status == 1) {
            return true;
        }
            return false;
     }

     /**
      *  @method: confirmCredentials
      *
      *
      * @purpose: inorder to confirm the credentials of the user.
      */

      public function confirmCredentials($email, $password, $tableData)
      {
          // check to seee if our table is not eligible for authentication 
          if (empty($tableData)) {
              return false;
          }
          // make sure the email and the passwords match to their respective records
        if ($tableData->email == $email && $tableData->password == hash('sha256', $password . $tableData->salt)) {
            return true;
        } else {
            return false;
        }
      }

       /**
        * @method: storeExists ?
        *
        * @purpose: inorder to check if a store exists
        *
        * @return: boolean
        */

        public function storeExists($storeID)  {
            $store = $this->store->where('storeID', $storeID)->first();

            if (empty($store)) {
                return false;
            } else {
                return true;
            }
        }


     /**
       *  @method: isStoreMember 
       * 
       *  @purpose: inorder to check if a store member is a member of a store
       */

       public function isStoreMember($storeID, $userID)
       {
              $store_member = $this->store_members->where('storeID', $storeID)->where('userID', $userID)->first();
    
              if(empty($store_member))
              {
                return false;
              }
              else
              {
                return true;
              }
       }


       /**
        *  @method: getStoreRole
        *
        *
        *  @purpose: inorder to get the role of a store member
        *
        */

        public function getStoreRole($storeID, $userID)
        {
            $store_member = $this->store_members->where('storeID', $storeID)->where('userID', $userID)->first();

            if(empty($store_member))
            {
                return false;
            }
            else
            {
                return $store_member->store_role;
            }
        }


       /**
        *  @method: setSession 
        *
        * @purpose: inorder to check if session is set before continuing.
        */

        public function setSession($userID, $signature,  $payload)
        {
            $session = $this->sessions->makeSession($userID, $signature, $payload);
            if ($session) {
                return true;
            } else {
                return false;
            }
        }


    /**
     *  @method: authenticate=
     *
     *  @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
     */

     # refactor -> finished 
    public function authenticate($request)
    {
        // check to see if the user exists in the datbase true or false
        if (!$this->userExist($request['email'])) {
            return $response = [
                'status' => 'error',
                'message' => 'User does not exist',
                'data' => null
            ];
        }
        // GRAB THE USER DATA FROM THE DATABASE
        $user = $this->user->where('email', $request['email'])->first();

        // check to see if the user is banned in the database 
        if (!$this->userBanned($user->userID)) {
            return response()->json(['status' => 'failed', 'message' => 'Your account has been banned'], 401);
        }
        // CHECK TO SEE IF OUR USERNAME AND PASSWORDS MATCH OUR RECORDS 
        if (!$this->confirmCredentials($request['email'], $request['password'], $user)) {
            return response()->json(['status' => 'failed', 'message' => 'Invalid credentials'], 401);
        }

        // CHECK TO SEE IF THE USER IS A MEMBER OF THE STORE
        if ($this->isStoreMember($request['clientid'], $user->userID) === true && $this->storeExists($request['clientid']) === true) {

                    /**
                     * 
                     *  @var: payload -> the users data payload for the token
                     *  @var: encrypted_token -> the encrypted token
                     *  @var: signature -> the signature of the token
                     * 
                     */
                     $payload = array(
                        'userID' => $user->userID,
                        'storeID' => $request['clientid'],
                        'role' => $this->getStoreRole($request['clientid'], $user->userID),
                        'created_at' => date('Y-m-d H:i:s'),
                        'token' => $this->encryptionRequest->generateKey(self::SALT_LENGTH)
                     );
                    $encrypted_payload  = $this->encryptionRequest->makeJWT($payload);
                    $signature = $this->encryptionRequest->viewJWTSignature($encrypted_payload);
                    // FAILED TO ISSUE THE SIGNATURE TO THE USER
                    if (!$this->user->updateDigitalAccessToken($user->userID, $signature, $encrypted_payload)) {
                          // failed to update the digital access token
                          return response()->json([
                            'status' => false,
                            'message' => 'failed to update the digital access token',
                            'authenticated' => false,
                        ]);
                    }

                    // SUCCESSFULLY SET UP THE STATE-LESS SESSION
                    if ($this->setSession($user->userID, $signature, $encrypted_payload)) {
                        return response()->json([
                            'status' => true,
                            'message' => 'success',
                            'authenticated' => true,
                            'signature' => $signature,
                        ]);
                        } else {
                        return response()->json(['status' => false, 'message' => 'failed to set session',  'authenticated' => false,]);
                     }
                     // this will be the response to the client!
                    } 
             else {
                    return response()->json(['status' => 'failed', 'message' => 'Store does not exist, Invalid client ID'], 401);
            } 
    } 
    
}