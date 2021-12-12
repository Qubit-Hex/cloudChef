<?php

/**
 * 
 *  @class: AuthValidation
 * 
 *  @purpose: this class is to validate the user input of the user
 * 
 */


 namespace App\Http\Services\Auth;

class AuthValidation {


    /**
     *  @method: validateEmail
     * 
     *  @purpose: to validate the email of the user 
     */

     static function validateEmail($email)  {
         // regex for email
            $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
            $filtered = filter_var($email, FILTER_VALIDATE_EMAIL);
            return preg_match($regex, $filtered) === false ? false : true;
     }


     /**
      * @method: validatePassword
      * 
      *  @purpose: to validate the password of the user 
      */

      static function validatePassword($password) {
          if (strlen($password) < 6) {
              return false;
          } else {
              return true;
          }
      }


    /**
     *  @method: validateClientID
     * 
     *  @method: to validate the client id of the user to make sure the client ID is a number and cannot contain any other characters
     * 
     */

     static function validateClientID($clientID) {
        if (filter_var($clientID, FILTER_VALIDATE_INT)) {
            return true;
        } else {
            return false;
        } 
        
    }


    /**
     *  @method: validateString 
     * 
     *  @purpose: to validate the string of the user 
     */


    static function validateString($string) {
        // use regex instead because php filter doesnt do its job well
        $filtered = filter_var($string, FILTER_SANITIZE_STRING);
        if (preg_match("/^[a-zA-Z0-9\s]+$/", $filtered)) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * @method: checkIfEmpty 
     * 
     * 
     *  @purpose: to check if the input is empty
     */


     static function checkIfEmpty($input) {
         if (empty($input)) {
             return false;
         } else {
             return true;
         }
     }


     /**
      *  @method: confirmPassword 
      *
      * @purpose: to confirm the password of the user
      *
      * @return: true if the password matches, false if not
      */

      static function confirmPassword($password, $confirmPassword) {
          if (!empty($password) && !empty($confirmPassword)) {
            return $password === $confirmPassword ? true : false;
          }
          return false;
      }



      /**
       * 
       *  @method: validateName 
       *  
       * 
       *  @purpose: to validate the name of the user 
       * 
       */

      static function validateName($input) {
        // use an a-z regix to check if the name is valid   
        if (preg_match("/^[a-zA-Z\s]+$/", $input)) {
                return true;
            } else {
                return false;
            }
      }
      
}
?>