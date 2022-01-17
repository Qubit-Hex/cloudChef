<?php


/**
 *
 *  @class: scheduleValidation
 *
 *
 *
 *  @purpose: to perform any validation that is required by our schedule service
 *
 *
 *  @requirements:          - helper functions for any php validation functions
 *                          - and predefined constants that will be used in the schedule server
 *
 *
 */

 namespace App\Http\Services\Schedule;

use Illuminate\Support\Facades\DB;



 class ScheduleValidation {


    /**
     *
     * @method: validate String
     *
     *  @purpose: inorder to validate the string  for the request that is comming though
     *
     */

     static function validateString($string) {
        if (strlen($string) === 0 && strlen($string) > 50) {
            return htmlspecialchars($string);
        }
        return false;
     }

     

 }

?>
