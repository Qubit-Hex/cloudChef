<?php


/**
 * 
 * 
 *  @interface: ScheduleInterface
 * 
 *  @purpose: to layout blueprint for the schedule interface
 *            the client will be interacting with
 * 
 */



 namespace App\Http\Services\Schedule;





 interface ScheduleInterface {



    
        /**
        * 
        *  @method: getSchedule
        * 
        *  @purpose: to get the schedule for a given user
        * 
        */
    
        public function getSchedule($request);




        /**
         * 
         *  @method: postSchedule
         * 
         * 
         */

        public function createSchedule($request);



        /**
         * 
         * @method: deleteSchedule
         * 
         * 
         *
         */

         public function deleteSchedule($request);



         /**
          *  @method: updateSchedule
          *
          * @purpose: to update a schedule for a given user

          */

            public function updateSchedule($request);


        /**
         * 
         * 
         *  @method: verifyScheduleState
         * 
         *  @purpose: to verify the state of the schedule
         *  
         */


        public function verifyScheduleState($request);




        /**
         * 
         * 
         * 
         * 
         * @method: getScheduleByUser
         * 
         */

         public function getScheduleByUser($request);

 }


?>