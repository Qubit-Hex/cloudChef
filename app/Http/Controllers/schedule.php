<?php

/**
 *
 *  @class: Schedule
 *
 *
 *  @purpose: inorder to perform the employee schedule CRUD operatations
 *            based on the request using the rest API.
 *
 *
 */

namespace App\Http\Controllers;

use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use App\Http\Services\Schedule\ScheduleService;

class schedule extends Controller
{


    public function constructor() {

    }

    /**
     *   @method: get
     *
     *  @purpose: inorder to get the schedule for a given user
     *
     *
     */

     public function get(Request $request) {

        $query = [
            'token' => $request->header('accessToken'),
            'time' => $request->header('time'),
            'week' => $request->header('week'),
            'year' => $request->header('year')
        ];

        return ScheduleService::getSchedule($query);
     }



     /**
      *  @method: find
      *
      *  @purpose: inorder to find a schedule in a store and return it to the client
      */

      public function find(Request $request) {

            $query = [
                'token' => $request->header('accessToken'),
                'time' => $request->header('time'),
                'command' => $request->header('command')
            ];

            return ScheduleService::findSchedule($query);
      }


      /**
       *
       *  @method: dropShift
       *
       *  @purpose: inorder for a employee to send a drop shift request to the server
       *
       */

       public function dropShift(Request $request) {

            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'shift' => $request->header('shift'),
                'reason' => $request->header('reason'),
            ];

            return ScheduleService::dropShift($query);
       }


       /**
        *  @method: dropshift_get
        *
        * @purpose: inorder to get the shifts of a specific employee of the store
        */

        public function getDroppedShifts(Request $request)
        {
            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'time' => $request->header('time'),
            ];

            return ScheduleService::getDroppedShifts($query);
        }


        /**
         *
         *  @method: postShiftPickupRequest
         *
         *  @purpose: inorder for a employee to send a shift pickup request to the server
         *
         */
        public function postShiftPickupRequest(Request $request)
        {
            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'shift' => $request->header('shift'),
            ];

            return ScheduleService::postShiftPickupRequest($query);
        }
}
