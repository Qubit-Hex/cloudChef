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
     *  @method: createScheduleEntry
     *
     *  @purpose: inorder to create a schedule entry for the store
     *
     */

     public function create(Request $request) {
         // this will be the method that will create a schedule entry for the store
         // based on the year and week number.


         $query = [
             'payload' => $request->all(),
             'accessToken' => $request->header('accessToken'),
             'method' => 'POST'
         ];

         // issue the request to the service layer.
         // inorder to create a schedule entry for the store
         return ScheduleService::createScheduleEntry($query);
     }


    /**
     *  @method: add
     *
     *  @purpose: inorder to add a new schedule into the system
     *
     */

    public function add(Request $request) {

        $query = [
            'payload' => $request->all(),
            'access_token' => $request->header('accessToken'),
            'method' => 'POST'
        ];

        return ScheduleService::add($query);
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
       *  @method: showEmployeeSchedule
       *
       *
       *  @purpose: inorder to get the schedule of a specific employee & a specific schedule
       */

       public function showEmployeeSchedule (Request $request)
       {
           $query = [
                'token' => $request->header('accessToken'),
                'time' => $request->header('time'),
                'scheduleId' => $request->header('scheduleId')
              ];

            return ScheduleService::showEmployeeSchedule($query);
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
         * @method: getRequests
         *
         * @purpose: inorder to get the requests for the given store inorder to accept or reject them
         */

         public function getRequests(Request $request)
         {
             $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'time' => $request->header('time'),
             ];

             return ScheduleService::getRequests($query);
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


        /**
         *
         *  @method: addSchedule
         *
         *
         *  @purpose; inorder to add a schedule to the system.
         *
         */
        public function addSchedule(Request $request)
        {

            // all come back to this later once i figure a structure
            // out for the schedule
        }


        /**
         *
         *  @method: delete
         *
         *  @purpose: inorder to delete a schedule from the system
         */

         public function delete(Request $request)
        {

            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'scheduleID' => $request->header('scheduleID'),
            ];

            return ScheduleService::deleteSchedule($query);
        }
        /**
         *
         *  @method: declineShiftRequest
         *
         *  @purpose: inorder to decline a shift request
         *
         */


        public function declineShiftRequest (Request $request)
        {
            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'shift' => $request->header('shift'),
            ];

            return ScheduleService::declineShiftRequest($query);
        }


        /**
         *
         *  @method: acceptShiftRequest
         *
         *
         *  @purpose: inorder to accept a shift request
         */

        public function acceptShiftRequest (Request $request)
        {
            $query = [
                'token' => $request->header('accessToken'),
                'command' => $request->header('command'),
                'shift' => $request->header('shift'),
            ];

            return ScheduleService::acceptShiftRequest($query);
        }

}
