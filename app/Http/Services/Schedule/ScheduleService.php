<?php


/**
 *
 *  @class: ScheduleService
 *
 *
 *  @purpose: to perform any actions that are required by our schedule service
 *
 */


 namespace App\Http\Services\Schedule;

use Illuminate\Support\Facades\DB;



 class ScheduleService {


    /**
     *
     *  @method: getSchedule
     *
     *  @purpose: to get the schedule for a given user
     *
     */


    static function getSchedule($request) {
      $db = DB::table('employee_shift')->get();

      return response()->json([
          'data' => $db], 200);
    }


    /**
     *
     *
     *  @method: postSchedule
     *
     *
     *  @purpose: to create a new schedule for a given user
     *
     */

    static function createSchedule($request) {

        // validate the request

    }


    /**
     *
     *  @method: deleteSchedule
     *
     *   @purpose: to delete a schedule for a given user
     *
     */

     static function deleteSchedule($request) {
        // validate the request`

     }


        /**
        *  @method: updateSchedule
        *
        * @purpose: to update a schedule for a given user
        *
        */

        static function updateSchedule($request) {
            // validate the request
        }

 }



?>
