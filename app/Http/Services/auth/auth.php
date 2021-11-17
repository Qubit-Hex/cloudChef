<?php


/**
 * 
 *  class: auth
 * 
 *  @purpose: a class to handle authentication, authorization and user management... 
 * 
 *  @purpose: this will load all is going to load all of our authentication methods
 * 
 *  @author: Oliver Shwaba -> Qbit-hEx
 * 
 */


 namespace App\Http\Services\auth;

 use Illuminate\Support\Facades\DB;
 use App\Http\Services\auth\encryption;

class  auth {
     
    public function __construct() {

        
        $this->encryption = new encryption();
        // please note that the key is session specific
        $this->sessionKey = $this->encryption->generateSalt();
    }

    /**
     *  @method: init
     *  @purpose: initializing the authentication proccess one by one 
     *  
     *  @parm: array $request
     *  @return : boolean; 
     */

    public function init($request) {
    
        // validate the request
        if (!$this->validateInput($request)) {
            $this->setErrorMessage("Invalid Input");
        }
        

        // check if the user is already logged in ?

        // check if the user exista in the database
        if($user = $this->validateUser($request)) {
            
            // users data  is stored in the session
            $privateKey = $user->privateKey;
            $email = $user->email;
            $password = $user->password;
            $userId = $user->id;
            $userSalt = $user->salt;


            // check if the user password matches 

            // debug dump -> OF THE USERS POST VALUES 
            

            if ($this->validatePassword($request['password'], $userSalt, $password)) {
                // set a session id for the user 



            } else {
                // set the error message
                die($this->setErrorMessage("Invalid Password"));
            }


        } else {
            die($this->setErrorMessage("User not found in the database!"));
        }

    }

    /**
     * 
     *  @method: validateInput
     *  @purpose: validating the input of the user
     * 
     *  @return: boolean
     * 
     */

    public function validateInput($input) {
        
        // validating the input
        if (empty($input) || !is_array($input)) {
            return false;
        }
        return true;
    }


    /**
     * 
     *  @Method: validateUser    
     *  @purpose: validating the user
     * 
     *  @parm: array $request
     *  @return: array $db object
     * 
     */

    public function validateUser($request) {
        // check if our user exists 
        $db = DB::table('users')->where('email', $request['email'])->first();
        if (empty($db)) {
            return false;
        }
        
        return $db;
    }


    /**
     *  @method: validatePassword 
     * 
     * @purpose: validating the password    
     * 
     * @parm: password $password -> string
     * @parm: salt $salt -> string
     * @parm: $dbPassword -> string 
     * 
     * 
     */

     public function validatePassword(string $password, string $salt,  string $dbPassword): bool {
        // check if the password is correct

        $password = $this->encryption->generatePasswordHash($password, $salt);
        if ($password == $dbPassword) {
            return true;
        }
        return false;
    }


    /**
     * 
     *  @method: settoken
     * 
     *  @purpose: setting the token for the user
     * 
     * 
     *  return : bool if token was set or not 
     * 
     */

     public function setToken(string $tokeName, string $tokenValue, string $expireTime): bool {
        // set the token 
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // tokens data structure 
        $data = [
            'token' => $tokenValue,
            'expire' => $expireTime,
            'signature' => $this->encryption->generatePasswordHash($tokenValue, $this->sessionKey)
            // we are signing the token with the session key inorder to check it later to see if it was modifiedd or not \
        ];

        $_SESSION[$tokeName] = $data;


        if (isset($_SESSION[$tokeName]) && !empty($_SESSION[$tokeName])) {
            return true;
        }
        return false;
     }


    /**
     * 
     *  @Method: setErrorMessage
     * 
     *  @purpose: sending the error message
     * 
     *  @return: string
     */

    public function setErrorMessage($message) {
        $this->errorMessage = $message;
        return $this->errorMessage;
    }
 }



?>