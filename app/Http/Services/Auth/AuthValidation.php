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
         if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
             return true;
         } else {
             return false;
         }
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
        if (filter_var($string, FILTER_SANITIZE_STRING)) {
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
}
?>