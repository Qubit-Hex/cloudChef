<?php

namespace App\Http\Controllers\validation;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 *
 *  @class: employeeValidation
 *
 *
 * @purpose: to validate the employee data  being sent to the server
 *           this is more of a helper class than a controller
 *           inorder to provide a better structure for the future
 *
 */

class employeeValidation extends Controller
{

  // the validation function should validate types of data
  // rather than the data itself inorder for the class to more reuseable

  /**
   *
   *  @method: validateString
   *
   *
   *  @purpose: to validate the string data
   */

   static function validateString($data, $minLength)
   {
       // check if the data is a string
       if (!is_string($data) || empty($data) || strlen($data) < $minLength) {
           return false;
       }
       return true;
   }

   /**
    *   @method: validateEmail
    *
    *
    *  @purpose: to validate the email data
    *
    */

    static function validateEmail($data)
    {
        // check if the data is a string
        if (!is_string($data) || empty($data) || !filter_var($data, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        return true;
    }


    /**
     *
     *  @method: validatePhone
     *
     *
     *  @purpose: to validate the phone number of the input
     *
     */

     static function validatePhone($data)
     {
            // check if the data is a string
            if (!is_string($data) || empty($data) || !preg_match('/^[0-9]{10}$/', $data)) {
                return false;
            }
            return true;
     }

     /**
      *
      *  @method: validateDate
      *
      *  @purpose: to validate the date of the input dd::mm::yyyy
      *
      */

      static function validateDate($data)
      {
          // check if the data is a string
          if (!is_string($data) || empty($data) || !preg_match('/^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/', $data)) {
              return false;
          }
          return true;
      }


      /**
       *
       *  @method: validateNumbers
       *
       *
       *  @purpose: to validate the numbers of the input
       *
       */

      static function validateInt($data)
      {
          // check if the data is a string
          if (is_string($data) || empty($data) || !preg_match('/^[0-9]{1,}$/', $data)) {
              return false;
          }
          return true;
      }

      /**
       *
       *  @method: validateBoolean
       *
       *  @purpose: to validate the boolean of the input
       *
       */

       static function validateBoolean($data)
       {
              // check if the data is a string
              if (!is_string($data) || empty($data) || !preg_match('/^[0-1]{1}$/', $data)) {
                return false;
              }
              return true;
       }


}
