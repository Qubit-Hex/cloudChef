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

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\store_members;
use App\Models\employeeModel;
use App\Models\scheduleGroup;
use App\Http\Services\schedule\SchedulePolicy;


class schedule extends Controller
{

    public function __construct(Request $request)
    {

        // load the models for the controller...
        $this->service = new SchedulePolicy($request);
        $this->userModel = new User();
        $this->scheduleGroupModel = new scheduleGroup();
        $this->store_membersModel = new store_members();
        $this->employees = new employeeModel();
    }



    /**
     *
     *  @method:  get
     *
     *  @purpose: to get the schedule of the employee
     *
     */

    public function get(Request $request)
    {
        // validate the request baseed on the users input...
        $token = $request->header('accessToken');
        $member  = $this->service->isUserMember($token, true);

        if ($member) {
            $getSchedules = $this->scheduleGroupModel->getSchedulesByStore($member->storeID);
            $getEmployeeData = $this->employees->getEmployeeByStoreAndUserID($member->storeID, $member->userID);
            if (!$getSchedules) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No schedule found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'schedule entries found',
                'data' => $getSchedules,
                'employee' => $getEmployeeData
            ], 200);

        }
        return response()->json([
            'status' => 'error',
            'message' => 'You are not a member of this store'
        ], 404);
    }




     /**
      *  @method: add
     *
     *  @purpose: inorder to add a schedule entry into the database so that we can link it a employees shifts.
     *           so this acts as a group entry. we can add multiple shifts to a single entry.
     */

     public function add(Request $request)
     {
         // check if a schedule entry already exists the schedule entry ?
         // if not then create a new entry

         if (empty($request->header('accessToken'))) {
             // return authorization error
                return response()->json([
                    'status' => 'error',
                    'message' => 'unauthorized access'
                ], 401);
         }

         // check for empty inputs if any are empty cancel the request.
         if (empty($request->input('date')) || empty($request->input('month') || empty($request->input('year'))) || empty($request->input('week'))) {
             // return error
                return response()->json([
                    'status' => 'error',
                    'message' => 'empty input'
                ], 400);
         }

        $getMemberInfo = $this->service->isUserAdmin($request->header('accessToken'), true);
        // get check if the user is a admin of the store

        $year = $request->input('year');
        $month = $request->input('month');
        $week = $request->input('week');
        $date = $request->input('date');

        // check does the schedule exist in the system?
        $doesScheduleExist = $this->scheduleGroupModel->getScheduleGroup($year, $month, $week, $getMemberInfo->storeID);

        if (!$doesScheduleExist) {
            // create a new schedule
            $createScheduleEntry = $this->scheduleGroupModel->createScheduleGroup($year, $month, $week, $getMemberInfo->storeID);

            // check if the schedule was created
            if ($createScheduleEntry) {
                $doesScheduleExist = $this->scheduleGroupModel->getScheduleGroup($year, $month, $week, $getMemberInfo->storeID);
                return response()->json([
                    'status' => 'success',
                    'message' => 'Schedule entry created successfully',
                    'schedule' => $doesScheduleExist
                ], 200);
            } else { // return the error schedule entry was not created
                return response()->json([
                    'status' => 'error',
                    'message' => 'Schedule entry could not be created'
                ], 401);
            }
        } else { // schedule already exists so return the schedule entry
            return response()->json([
                'status' => 'success',
                'message' => 'Schedule already exists',
                'schedule' => $doesScheduleExist
            ], 200);
        }
     }



     /**
      *  @method: delete
      *
      *  @purpose: inorder to deleta a schedule entry from the databasse
      *
      */

      public function delete(Request $request)
      {
          // check if a schedule first exists
          // then once we have the schedule entry we can validate the request
          // if that is the case then delete the schedule entry.
          // return the response to the user based on the result of the delete operation.
          // first check if the user is a admin before continuing

          $token = $request->header('accessToken');
          $scheduleID = $request->header('scheduleID');
          $employeeID = $request->header('employeeID');


          // check if the headers are empty?
          if (empty($token) || empty($scheduleID) || empty($employeeID)) {
              return response()->json([
                  'status' => 'error',
                  'message' => 'empty input'
              ], 400);
          }

          // check if the user is a admin of the store
            $getMemberInfo = $this->service->isUserAdmin($token, true);

            if (!$getMemberInfo) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not a admin of this store'
                ], 401);
            }

            // check if the schedule entry exist
            $scheduleEntry = $this->scheduleGroupModel->findSchedule($scheduleID, $getMemberInfo->storeID);

            if (!$scheduleEntry) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Schedule entry does not exist'
                ], 404);
            }

            // delete the schedule and all the shifts associated with it
            // check if the schedule entry was deleted

            if ($this->scheduleGroupModel->deleteSchedule($scheduleID, $getMemberInfo->storeID)) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Schedule entry deleted successfully'
                ], 200);
            }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Schedule entry could not be deleted'
                ], 401);

        }

        /**
         *
         *  @method: getRecent
         *
         *  @purpose: inorder to fetch the most recent schedule of the system
         *
         */

         public function getRecent(Request $request)
         {

             $token = $request->header('accessToken');
             $isMember = $this->service->isUserMember($token, true);

             // check if the user is a member of the store
             if (!$isMember) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not a member of this store'
                ], 401);
             }

             // get the most recent schedule entry
             $getSchedules = $this->scheduleGroupModel->getRecentSchedule($isMember->storeID);

             if ($getSchedules) {
                // return the most recent schedule entry to the user in question

                return response()->json([
                    'status' => 'success',
                    'message' => 'schedule entries found',
                    'data' => $getSchedules
                ], 200);

             } else {
              // no schedules were found in the system.
                 return response()->json([
                     'status' => 'error',
                     'message' => 'No schedule entries found'
                 ], 404);
             }
         }

}
