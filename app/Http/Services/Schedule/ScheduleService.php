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

use Facade\FlareClient\Http\Response;
use Illuminate\Support\Facades\DB;



 class ScheduleService {


    /**
     *
     *  @method: getSchedule
     *
     *  @purpose: to get the schedule for a given user
     *
     */

    // TODO : add the logic to get the schedule for a given user
    // TODO: ADD THE LOGIC TO GET THE SCHEUDLE FOR A GIVEN STORE
    static function getSchedule($request) {
      $db = DB::table('employee_shift')->get();

      return response()->json([
          'data' => $db], 200);
    }


    /**
     *
     * @method: findSchedule
     *
     *  @purpose: inorder to find schedules for the current users store and return them to the client
     *
     */

     static function findSchedule($request) {

       $userRequest = DB::table('users')->where('remember_token', $request)->first();

       if ($userRequest) {
            // is the user a store member
            $store_members = DB::table('store_members')->where('userID', $userRequest->userID)->first();

            if ($store_members) {
                // next lets check the schedule entries
                $schedule = DB::table('store_schedule')->where('storeID', $store_members->storeID)->get();

                // sort the schedule entries for newest first
                $schedule = collect($schedule)->sortByDesc('id')->values()->all();


                return response()->json([
                    'data' => $schedule], 200);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'you are not a member of this store'
            ]);
       }
       // invalid token
         else {
            return response()->json([
                 'status' => 'error',
                 'message' => 'invalid token'
            ], 401);
         }
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



    /**
     *
     *  @method: dropShift
     *
     *  @purpose: inorder to send a drop shift request to the server
     *
     */

     static function dropShift($request) {
        // validate the request

        $userRequest = DB::table('users')->where('remember_token', $request['token'])->first();

        $reason = htmlspecialchars($request['reason']);

        // validate the input first

        if ($userRequest) {
            // check is the user is a store member
            $store_members = DB::table('store_members')->where('userID', $userRequest->userID)->first();
            if ($store_members) {
                // check if the user is a employee of the store
                $employee = DB::table('employee')->where('userID', $userRequest->userID)->first();

                if ($employee) {

                    // check the date that corresponds to the shift and the store
                    $storeShift = DB::table('store_schedule')->where('storeID', $store_members->storeID);

                    // date transformation to match the date in the database
                    // MIGHT CHANGE THIS LATER ON TO MAKE THE QUERYS EASIER TO
                    // THINK ABOUT RATHER THAN THIS WERID APPROACH
                    $weekNumber = (int) date("W", strtotime($request['shift']));
                    $yearNumber = (int) date("Y", strtotime($request['shift']));
                    $dayOfWeek = (int) date("w", strtotime($request['shift']));


                    $storeShiftPeriod = $storeShift->where('year', $yearNumber)->where('week', $weekNumber)->first();

                    if ($storeShiftPeriod) {

                        $shifts = DB::table('employee_shift')->where('employeeID', $employee->id)->where('store_schedule', $storeShiftPeriod->id)->get();

                        if ($shifts) {

                            $getCurrentShift = $shifts->where('day', $dayOfWeek)->first();

                            if ($getCurrentShift) {


                                // check is the shift is already dropped
                                $checkShiftDropStatus = DB::table('employee_drop_shifts')->where('employee_shift_id', $getCurrentShift->id)->first();
                                if ($checkShiftDropStatus) {
                                    return response()->json([
                                        'response' => 'shift_already_dropped',
                                        'status' => 'error',
                                        'message' => 'you have already dropped this shift'
                                    ]);
                                } else {

                                    $dropShift = DB::table('employee_drop_shifts')->insert([
                                        'employee_id' => $employee->id,
                                        'employee_shift_id' => $getCurrentShift->id,
                                        'reason' => $reason,
                                        'date_dropped' =>  strtotime(date('Y-m-d H:i:s')),
                                        'approved' => '0' // 0 = not approved yet 1 = approved
                                    ]);

                                    return response()->json([
                                        'status' => 'success',
                                        'message' => 'drop shift request sent. its currently pending approval'
                                    ], 200);

                                }


                                // db insert the larvel
                            } else {
                                return response()->json([
                                    'status' => 'error',
                                    'message' => 'you do not have a shift for this day'
                                ]);
                            }


                        } else {
                            return response()->json([
                                'request' => $request,
                                'status' => $employee->id,
                                'status' => 'error',
                                'message' => 'you do not have any shifts for this date'
                            ]);
                        }


                    } else {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'no schedule for this week'
                        ]);
                    }


                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'you are not an employee of this store'
                    ]);
                }
            } else {
                return Response()->json([
                    'status' => 'error',
                    'message' => 'you are not a member of this store'
                ]);
            }
        }
            return response()->json([
                'status' => 'error',
                'message' => 'invalid token'
            ], 401);
     }





 }
