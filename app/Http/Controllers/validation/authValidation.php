<?php

namespace App\Http\Controllers\validation;


use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class authValidation extends Controller
{


    /**
     *
     *  @method: validateEmail
     *
     *  @purpose: inorder to validate the email address of the request
     *
     */
    static function validateEmail($email)
    {
        // validate the email address
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // email is valid
            return true;
        } else {
            // email is not valid
            return false;
        }
    }

    /**
     *
     *  @method: validatePassword
     *
     *  @purpose: inorder to validate the password of the request
     */
    static function validatePassword($password)
    {
        if (strlen($password) >= 6) {
            // password is valid
            return true;
        } else {
            // password is not valid
            return false;
        }
    }

    /**
     *
     *  @method: validateStoreID
     *
     *  @purpose: inorder to validate the storeID of the request
     *
     */

     static function validateStoreID($id)
     {
         // validate the store id it must be of a type int
        if (filter_var($id, FILTER_VALIDATE_INT)) {
            // store id is valid
            return true;
        } else {
            // store id is not valid
            return false;
        }
     }

    /**
     *
     *  @method: validateName
     *
     *  @purpose: inorder to validate the name of the request
     */
     static function validateName($name)
     {
            if (strlen($name) >= 2) {
                // name is valid
                return true;
            } else {
                // name is not valid
                return false;
            }
     }


     /**
      *  @method: passwordsMatch
      *
      *  @purpose: inorder to validate the password of the request
      *
      */

      static function doPasswordsMatch($password, $confirmPassword)
      {

          if ($password === $confirmPassword) {
              // passwords match
              return true;
          } else {
              // passwords do not match
              return false;
          }
      }


      /**
       *
       *  @method: validateCompanyName
       *
       *  @purpose: inorder to validate the company name of the request
       *
       */
      static function validateCompanyName($company)
      {
            if (strlen($company) >= 2) {
                // company name is valid
                return true;
            } else {
                // company name is not valid
                return false;
            }
      }


      /**
       *
       *  @method: _getHandShake
       *
       *  @purpose: inorder to recieve the handshake if all of our requests are valid
       *
       */

       static function _getHandShake($email, $name, $password, $cPasword, $company)
       {
           // return the handshake to the user of the application.
           $hashGemerator = bin2hex(random_bytes(64));
           return hash('sha256', $email . $name . $password . $cPasword . $company . $hashGemerator);
       }


       /**
        *   @method: _createCookie
        *
        *  @purpose: inorder to create the validationCookie
        *
        */
        static function _createCookie($tokenValue) {
            // create a cookie with the validation
            $cookie = cookie('validation', $tokenValue, 60);
            return $cookie;
        }



        /**
         *
         *  @method: loginHandShake
         *
         *  @purpose: inorder to validate the login request
         *
         */

         static function loginHandShake($email, $password, $storeID)
         {
             // issue the handshake to the user of the applicatiom.
                $hashGemerator = bin2hex(random_bytes(64));

            // preform 4 rounds of hashing
            $hash = hash('sha256', $email . $password . $storeID . $hashGemerator);
            $hash = hash('sha256', $hash);
            $hash = hash('sha256', $hash);
            $hash = hash('sha256', $hash);

            // return the handshake
            return $hash;
         }



}
