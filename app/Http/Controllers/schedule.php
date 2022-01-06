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

use App\Http\Services\Schedule\ScheduleRequest;

class schedule extends Controller
{
 

    public function __construct(Request $request)
    {   

    }

     /**
      *   @method: createSchedule
      *
      *  @purpose: inorder to create a new schedule for a given user
      *
      */

     public function createSchedule(Request $request)
     {

        // might change later but will implement a 
        // chain of responsiblity pattern for this
        // request.

         $requestObject = [
                'employee_id' => $request['employee_id'],
                'schedule_id' => $request['schedule_id'],
                'schedule_date' => $request['schedule_date'],
                'schedule_time' => $request['schedule_time'],
                // need a json object for the schedule
                'schedule_json' => $request['schedule_json'],
                'schedule_status' => $request['schedule_status'],
            ];


            return ScheduleRequest::createSchedule($requestObject);
     }


     /**
      *  @method: getSchedule
      *
      * @purpose: to get the schedule for a given user
      *
      */

     public function getScheudle(Request $request)
     {
         $requestObject = [
                'employee_id' => $request['employee_id'],
                'schedule_id' => $request['schedule_id'],
                'schedule_date' => $request['schedule_date'],
                'schedule_status' => $request['schedule_status'],
            ];

            return ScheduleRequest::getSchedule($requestObject);

     }


     /**
      * 
      *  @method: deleteSchedule
      *
      * @purpose: to delete a schedule for a given user
      *
      */

    public function deleteSchedule(Request $request)
    {
        $requestObject = [
                'employee_id' => $request['employee_id'],
                'schedule_id' => $request['schedule_id'],
                'schedule_date' => $request['schedule_date'],
                'schedule_status' => $request['schedule_status'],
            ];
            return ScheduleRequest::deleteSchedule($requestObject);
    }

    /**
     *  
     *  @method: updateSchedule
     *  
     *  @purpose: to update a schedule for a given user
     * 
     */


    public function updateSchedule(Request $request)
    {
        $requestObject = [
                'employee_id' => $request['employee_id'],
                'schedule_id' => $request['schedule_id'],
                'schedule_date' => $request['schedule_date'],
                'schedule_status' => $request['schedule_status'],
                'schedule_json' => $request['schedule_json'],
            ];

            return ScheduleRequest::updateSchedule($requestObject);
    } 
}
