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
use App\Http\Services\Schedule\core\_LOGGER;



class ScheduleService
{

    /**
     *
     * @method: add
     *
     * @purpose: inorder to add a new schedule into the system
     *
     */


    static function getUsersStore($accessToken) {
        // lets validate the access token and return the users store

        $user = DB::table('users')
            ->where('remember_token', $accessToken)
            ->first();

        if ($user) {
            $storeMembers = DB::table('store_members')
                ->where('userID', $user->userID)
                ->first();

            return $storeMembers->storeID;
        }
    }

    /**
     *
     *  @method: add
     *
     *
     *  @purpose: inorder to add a new schedule into the system
     *
     */

    static function add($payload) {

        // todo implement the add method
        // for adding scheudle data.
        $LOG = new _LOGGER();

        $LOG->log($payload);

        $scheduleID = 1;
        $employeeID = $payload['payload']['employeeID'];
        $schedule = $payload['payload']['schedule'];

        $storeID = self::getUsersStore($payload['access_token']);


        // perform the insert into the database for the current user.


        $groupInsert = [];


        // we need to loop through the schedule and insert it into the database.
        // we require 7 inserts for each day of the week.

        foreach ($schedule as $day => $daySchedule) {

            // function to convert the day into a number
            // closure to convert the day into a number
            $dayNumber = function ($day) {

                $day = strtolower($day);
                switch ($day) {
                    case 'monday':
                        return 1;
                        break;
                    case 'tuesday':
                        return 2;
                        break;
                    case 'wednesday':
                        return 3;
                        break;
                    case 'thursday':
                        return 4;
                        break;
                    case 'friday':
                        return 5;
                        break;
                    case 'saturday':
                        return 6;
                        break;
                    case 'sunday':
                        return 7;
                        break;
                }
            };


            $convertTimeToInt = function ($time) {

                // check if value is null
                if ($time == null) {
                    return null;
                } else {
                    // split the time into hours and minutes
                    $time = explode(':', $time);
                    return $time[0];
                }

            };

            $groupInsert[] = [
                'employeeID' => $employeeID,
                'storeID' => $storeID,
                'store_schedule' =>$scheduleID,
                'day' => $dayNumber($day),
                'start_time' => $convertTimeToInt($daySchedule['start']),
                'end_time' => $convertTimeToInt($daySchedule['end']),
                'is_open' => 1,
                'is_off_day' => $daySchedule['off'] === true ? 1 : 0
            ];
        }

        // was all the inserts successful?
        // if so return a success message. to the client side.


        // loop through the group insert and insert into the database.
        foreach ($groupInsert as $insert) {

            // update or insert if the record exists or not
            $exists = DB::table('employee_shift')
                ->where('employeeID', $insert['employeeID'])
                ->where('storeID', $insert['storeID'])
                ->where('store_schedule', $insert['store_schedule'])
                ->where('day', $insert['day'])
                ->first();

            if ($exists) {
                DB::table('employee_shift')
                    ->where('employeeID', $insert['employeeID'])
                    ->where('storeID', $insert['storeID'])
                    ->where('store_schedule', $insert['store_schedule'])
                    ->where('day', $insert['day'])
                    ->update($insert);
            } else {
                DB::table('employee_shift')
                    ->insert($insert);
            }
        }

       return response()->json([
           'status' => 201,
           'message' => 'Schedule successfully added.'
       ]);
    }


    /**
     *
     *  @method: getSchedule
     *
     *  @purpose: to get the schedule for a given user
     *
     */

    static function getSchedule($request)
    {

        $user = DB::table('users')->where('remember_token', $request['token'])->first();

        if ($user) {
            $member = DB::table('store_members')->where('userID', $user->userID)->first();
            if ($member) {

                $employee = DB::table('employee')->where('storeID', $member->storeID)->where('is_active', 1)->where('userID', $user->userID)->first();

                if ($employee) {


                    // get max value in year table of store_schedule

                    $max_year = DB::table('store_schedule')->where('storeID', $member->storeID)->max('year');
                    // based on the year get the max value in week for a given year
                    $max_week = DB::table('store_schedule')->where('storeID', $member->storeID)->where('year', $max_year)->max('week');
                    $latestSchedule = DB::table('store_schedule')->where('storeID', $member->storeID)->where('year',
                      $max_year)->where('week', $max_week)->first();

                    $selectedSchedule = DB::table('store_schedule')->where('storeID', $member->storeID)->where('year',
                         $request['year'])->where('week', $request['week'])->first();

                    if ($selectedSchedule) {

                        $schedule = DB::table('employee_shift')->where('storeID', $member->storeID)->
                        where('store_schedule', $selectedSchedule->id)->get();

                        // view the schedule on week at a time.
                        return response()->json([
                            'status' => 'success',
                            'data' => $schedule
                        ]);


                    } else {
                        return response()->json([
                            'status' => 'fail',
                            'message' => 'No schedule found for the given year and week',
                            'data' => $latestSchedule
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'You are not an active employee in this store'
                    ], 401);
                }

            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not a member of any store'
                ], 401);
            }



        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ]);
        }

    }


    /**
     *
     * @method: findSchedule
     *
     *  @purpose: inorder to find schedules for the current users store and return them to the client
     *
     */

    static function findSchedule($request)
    {

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
                    'data' => $schedule
                ], 200);
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
     *  @method: createScheduleEntry
     *
     *  @purpose: to create a new schedule entry for a store
     *
     */

     static function createScheduleEntry ($request) {
        // this method will be responsible for creating a new schedule entry for a store.

        /// first check if the user is a store member
        $user = DB::table('users')->where('remember_token', $request['accessToken'])->first();

        if ($user) {
            $member = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($member) {
                // check if the store has a schedule entry for the given year and week
                $schedule = DB::table('store_schedule')->where('storeID', $member->storeID)->where('year', $request['payload']['year'])->where('week', $request['payload']['week'])->first();

                if ($schedule) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Schedule already exists for this year and week'
                    ]);
                } else {
                    // create a new schedule entry
                    $schedule = DB::table('store_schedule')->insert([
                        'storeID' => $member->storeID,
                        'year' => $request['payload']['year'],
                        'week' => $request['payload']['week']
                    ]);

                    // if the schedule entry was created successfully
                    if ($schedule) {

                        // retunr the schedule id for the newly created schedule entry

                        $getScheduleID = DB::table('store_schedule')->where('storeID', $member->storeID)->where('year', $request['payload']['year'])->where('week', $request['payload']['week'])->first();


                        // return this response to the client for us to create the schedule entries
                        // for employees belonging to this store. 
                        return response()->json([
                            'status' => 'success',
                            'scheduleID' => $getScheduleID->id,
                            'message' => 'Schedule successfully created'
                        ]);
                    } else {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Schedule could not be created'
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not a member of any store'
                ], 401);
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token'
            ], 401);
        }

        /// unknown error occured
        // none of our edge cases where met
        return response()->json([
            'status' => 'error',
            'message' => 'Unknown error occured'
        ], 500);
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

    static function createSchedule($request)
    {

        // validate the request

    }


    /**
     *
     *  @method: deleteSchedule
     *
     *   @purpose: to delete a schedule for a given user
     *
     */

    static function deleteSchedule($request)
    {
        // validate the request`

    }


    /**
     *  @method: updateSchedule
     *
     * @purpose: to update a schedule for a given user
     *
     */

    static function updateSchedule($request)
    {
        // validate the request
    }



    /**
     *
     *  @method: dropShift
     *
     *  @purpose: inorder to send a drop shift request to the server
     *
     */

    static function dropShift($request)
    {
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
                                        'storeID' => $store_members->storeID,
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


    /**
     *  @method: getDroppedShifts
     *
     *  @purpose: to get all the dropped shifts for a given store
     */

    static function getDroppedShifts($request)
    {
        $user = DB::table('users')->where('remember_token', $request['token'])->first();

        if ($user) {
            $storeMembers = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($storeMembers) {
                // let check if the user is a employee of the store
                $employee = DB::table('employee')->where('userID', $user->userID)->first();

                if ($employee) {

                    // department that our employee works in
                    $department = DB::table('department')->where('id', $employee->department_id)->first();

                    // get all the shifts that the store has dropped
                    $droppedShifts = DB::table('employee_drop_shifts')->where('storeID', $employee->storeID)->get();

                    $employeeInfo = [];
                    $shiftInfo = [];
                    $response = [];

                    for ($i = 0; $i < count($droppedShifts); $i++) {
                        $employeeInfo[$i] = DB::table('employee')->where('id', $droppedShifts[$i]->employee_id)->first();
                        $shiftInfo[$i] = DB::table('employee_shift')->where('id', $droppedShifts[$i]->employee_shift_id)->first();


                        // format our response to match the front end
                        $response[$i] = [
                            'employee' => $employeeInfo[$i]->first_name . ' ' . $employeeInfo[$i]->last_name,
                            'dropShiftDate' => date('Y-M-D m:h', $droppedShifts[$i]->date_dropped),
                            'role' => DB::table('department')->where('storeID', $employee->storeID)->where('id', $employeeInfo[$i]->department_id)->first()->name,
                            'start_time' => $shiftInfo[$i]->start_time,
                            'end_time' => $shiftInfo[$i]->end_time,
                            'is_approved' => $droppedShifts[$i]->approved,
                            'reason' => $droppedShifts[$i]->reason,
                            'shift_id' => $droppedShifts[$i]->id,

                        ];
                    }

                    return response()->json([
                        'status' => 'success',
                        'message' => 'dropped shifts',
                        'data' => $response,
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'you are not an employee of this store'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'you are not a member of this store'
                ]);
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid token'
            ], 401);
        }
    }


    /**
     *
     *  @method: postShiftPickupRequest
     *
     *
     * @purpose: to request a shift pickup
     *
     */

    static function postShiftPickupRequest($request)
    {
        $user = DB::table('users')->where('remember_token', $request['token'])->first();

        if ($user) {
            $storeMembers = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($storeMembers) {
                // let check if the user is a employee of the store
                $employee = DB::table('employee')->where('userID', $user->userID)->first();

                if ($employee) {

                    // department that our employee works in
                    $department = DB::table('department')->where('id', $employee->department_id)->first();
                    // get the shift that the employee is requesting to be picked up
                    $droppedShift = DB::table('employee_drop_shifts')->where('id', $request['shift'])->first();

                    // add an entry to the employee_pick_up_request table
                    // inorder to request a shift pickup

                    // check if we already have a request for this shift
                    $request = DB::table('employee_pickup_shift')->where('employee_shift_id', $droppedShift->employee_shift_id)->where('employee_id', $employee->id)->first();

                    if ($request) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'you already have a request for this shift'
                        ]);
                    } else {

                        $insert = DB::table('employee_pickup_shift')->insert([
                            'storeID' => $employee->storeID,
                            'employee_id' => $employee->id,
                            'employee_shift_id' => $droppedShift->employee_shift_id,
                            'date_picked_up' => strtotime(date('Y-m-d H:i:s')),
                            'approved' => 1,
                        ]);
                        // check the insert status of our request!
                            if ($insert) {
                                return response()->json([
                                    'status' => 'success',
                                    'message' => 'shift pickup request sent'
                                ]);
                            } else {
                                return response()->json([
                                    'status' => 'error',
                                    'message' => 'error sending shift pickup request'
                                ]);
                            }
                    }

                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'you are not an employee of this store'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'you are not a member of this store'
                ]);
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid token'
            ], 401);
        }
    }
}
