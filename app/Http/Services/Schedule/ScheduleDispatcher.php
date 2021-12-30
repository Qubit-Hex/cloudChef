<?php


/**
 * 
 *  @class: ScheduleDispatcher
 * 
 * 
 *  @purpose: to perform any actions that are required by our schedule service
 *             we will a impliment a injectable interface to allow for
 *              dependency injection for this interface.
 */


namespace App\Http\Services\Schedule;

 use App\Http\Services\Schedule\ScheduleInterface;



 class ScheduleDispatcher implements ScheduleInterface {

    
         /**
        * 
        *  @method: getSchedule
        * 
        *  @purpose: to get the schedule for a given user
        * 
        */
    
         static function getSchedule($request) {
    
             return $request;
    
        
        }



        /**
         * 
         * 
         *  @method: postSchedule
         * 
         * 
         *  @purpose: to create a new schedule for a given user
         */

         static function createSchedule($request) {

         }



        /**
         * 
         * @method: deleteSchedule
         * 
         * @purpose: to delete a schedule for a given user
         * 
         * 
         */

         static function deleteSchedule($request) {

         }


         /**
          *  @method: updateSchedule
          *
          * @purpose: to update a schedule for a given user
          *
          */

          static function updateSchedule($request) {

          }

          



 }

?>