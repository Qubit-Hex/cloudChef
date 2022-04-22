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
use App\Models\scheduleGroup;

class schedule extends Controller
{

    public function __construct()
    {

        // load the models for the controller...

        $this->userModel = new User();
        $this->scheduleGroupModel = new scheduleGroup();
        $this->store_membersModel = new store_members();
    }

    /**
     *
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

        $doesUserExist = $this->userModel->getUserByRemeberToken($request->header('accessToken'));

        if (!$doesUserExist) {
            return response()->json([
                'status' => 'error',
                'message' => 'User does not exist'
            ], 401);
        }

        $getMemberInfo = $this->store_membersModel->getMembersByID($doesUserExist->userID);

        if (!$getMemberInfo) {
            return response()->json([
                'status' => 'error',
                'message' => 'User does not exist'
            ], 401);
        }

        $isStoreMemberAdmin = $this->store_membersModel->storeMemberAdmin($getMemberInfo->storeID, $doesUserExist->userID);

        if (!$isStoreMemberAdmin) {
            return response()->json([
                'status' => 'error',
                'message' => 'User does not have permission to perform this action'
            ], 401);
        }
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
}
