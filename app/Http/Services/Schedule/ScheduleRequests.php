<?php

/***
 *
 *  @class: ScheduleRequest
 *
 *
 *  @purpose: inorder to perform schedule actions based on the The ScheduleServiceInterface
 *
 */



 namespace App\Http\Services\Schedule;

use Illuminate\Support\Facades\DB;



 class ScheduleRequests {

    /**
     *
     *  @method: declineShiftRequest
     *
     *  @purpose: inorder to decline the shift request that is connected to the system
     *
     */
     public function declineShiftRequest($id,  $store)
     {
         // we need to validate the
         $shiftRequest_drop = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();
         $shiftRequest_pickup = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();

            if ($shiftRequest_drop) {
                DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->delete();
            } else {
                return response()->json([
                    'message' => 'No shift request found',
                    'status' => 'failed'
                ], 404);
            }

            if ($shiftRequest_pickup) {
                DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->delete();
            } else {
                return response()->json([
                    'message' => 'No shift request found',
                    'status' => 'failed'
                ], 404);
            }

            // double check to make sure that the shift request is deleted
            if (!self::validateShiftRemoval($id, $store)) {
                // the shift doesnt exist so lets return false
                return response()->json([
                    'status' => false,
                    'message' => 'The shift request does not exist'
                ]);
            }
            // shift couldn't be delete so throw some sort of error
            return response()->json([
                'status' => false,
                'message' => 'The shift request could not be deleted'
            ]);
     }

     /**
      *  @method: validateShiftRemoval
      *
      *  @purpose: inorder to validate the removal of the shift request
      */

      public function validateShiftRemoval($id, $store)
      {
          // does the shift exist ?
            $shift_drop = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();
            $shift_pickup = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();

            if (!$shift_drop && !$shift_pickup) {
                return true;
            }
        // if the shift does exist then return false
            return false;
      }


      /**
       *
       *  @method: acceptShiftRequest
       *
       *  @purpose: inorder to accept the shift request that is connected to the system
       *
       */
       public function acceptShiftRequest($id, $store)
       {
           // this function will be responsible for the shift swap...
           /// for the schedule
           $shift_pickup = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();
           $shift_drop = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->first();
           $shift = DB::table('employee_shift')->where('id', $id)->where('storeID', $store->storeID)->first();


        // check does the shift exist?
        if (!$shift_pickup || !$shift_drop) {
            return response()->json([
                'status' => false,
                'message' => 'The shift request does not exist'
            ]);
        }

        // check if a shift even exists for the following day.
        if (!$shift) {
            return response()->json([
                'status' => false,
                'message' => 'No shift exists for that day.'
            ]);
        }
        /**
         *
         *  @blueprint: shiftSwapLogic
         *
         *
         *  1. we have to 2 users in the system user a, user b
         *  2. check if the swappie user b has a shift on the same following day
         *  3. if not then just copy the tables and update the employee id.
         *  4. if yes then we have to perform the swap
         *  5. user a -> employee id because user b -> employee
         *  6. set the drop shifts and pickup shifts and then. return the response to the server
         */

         // does shift Pickup have a shift that day
         $doesPickupHaveShift = DB::table('employee_shift')->where('employeeID', $shift_pickup->employee_id)->where('store_schedule', $shift->store_schedule)->where('day', $shift->day)->first();
         $doesDropHaveShift = DB::table('employee_shift')->where('employeeID', $shift_drop->employee_id)->where('store_schedule', $shift->store_schedule)->where('day', $shift->day)->first();

         if ($doesPickupHaveShift && $doesDropHaveShift) {

            // switch the shifts of the two employees.
            // switch the employee ids for the pickup and drop shifts
            $shiftA = DB::table('employee_shift')->where('employeeID', $shift_pickup->employee_id)->where('store_schedule', $shift->store_schedule)->where('day', $shift->day)
                    ->update(['employeeID' => $shift_drop->employee_id]);
            $shiftB = DB::table('employee_shift')->where('employeeID', $shift_drop->employee_id)->where('store_schedule', $shift->store_schedule)->where('day', $shift->day)
                    ->update(['employeeID' => $shift_pickup->employee_id]);
            // now lets set the status of the drop and pick up shifts

            // delete the entrys from the pickup and drop shifts

            $dropShift = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->delete();
            $pickupShift = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->delete();

            if ($shiftA && $shiftB && $dropShift && $pickupShift) {
                return response()->json([
                    'status' => true,
                    'message' => 'The shift request has been approved'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'The shift request could not be approved'
                ]);
            }
         } else {
             // just perform the normal swap
              $shiftA = DB::table('employee_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)
                    ->update(['employeeID' => $shift_pickup->employee_id]);

            /// make a empty shift for the employee that is being dropped
            $shiftB = DB::table('employee_shift')->insert([
                'employeeID' => $shift_drop->employee_id,
                'storeID' => $store->storeID,
                'store_schedule' => $shift->store_schedule,
                'day' => $shift->day,
                'start_time' => null,
                'end_time' => null,
                'is_open' => 0,
                'is_off_day' => 0
            ]);

            // now lets set the status of the drop and pick up shifts
            $dropShift = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->delete();
            $pickupShift = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->where('storeID', $store->storeID)->delete();

            if ($shiftA && $shiftB && $dropShift && $pickupShift) {
                return response()->json([
                    'status' => true,
                    'message' => 'The shift request has been approved'
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'The shift request could not be approved'
                ]);
            }
         }
        }
 }

?>
