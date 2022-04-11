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
     public function declineShiftRequest($id)
     {
         // we need to validate the 
         $shiftRequest_drop = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->first();
         $shiftRequest_pickup = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->first();

            if ($shiftRequest_drop) {
                DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->delete();
            }

            if ($shiftRequest_pickup) {
                DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->delete();
            }

            if (!self::validateShiftRemoval($id)) {
                // the shift doesnt exist so lets return false
                return response()->json([
                    'status' => false,
                    'message' => 'The shift request does not exist'
                ]);
            }
            // shift couldnt be delete so throw some sort of error
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

      public function validateShiftRemoval($id)
      {
          // does the shift exist ?
            $shift_drop = DB::table('employee_drop_shifts')->where('employee_shift_id', $id)->first();
            $shift_pickup = DB::table('employee_pickup_shift')->where('employee_shift_id', $id)->first();

            if (!$shift_drop && !$shift_pickup) {
                return true;
            }
        // if the shift does exist then return false
            return false;
      }

 }

?>
