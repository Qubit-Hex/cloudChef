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
            'token' => $request->header('Authorization'),
            'time' => $request->header('time'),
           // 'reason' => $request->header('reason'),
            'command' => $request->header('command')
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
}
