<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\employee_shifts;
use App\Models\store_members;
use App\Models\User;
use App\Models\scheduleGroup;

class shifts extends Controller
{

    public function __construct()
    {

        $this->employeeShifts = new employee_shifts();
        $this->storeMembers = new store_members();
        $this->user = new User();
        $this->scheduleGroup = new scheduleGroup();
    }


    /**
     *
     *  @method: get
     *
     *  @purpose: inorder to retrive all the shifts from a store that has a scheduleID, and users that are assigned to that shift
     *
     */

     public function get(Request $request)
     {


        // first check if the required data is empty

        if (empty($request->header('accessToken')) || empty($request->header('employeeID')) || empty($request->header('scheduleID'))) {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Please provide all the required data'
                ], 400);
            }

            // next lets validate the request that is being

            $currentUser = $this->user->getUserByRemeberToken($request->header('accessToken'));

            if (!$currentUser) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Invalid access token'
                    ], 400);
            }

            // next lets get the users store relationship

            $currentUserStore = $this->storeMembers->getMembersByID($currentUser->userID);

            if (!$currentUserStore) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'You are not a member of any store'
                    ], 400);
            }

            // now is the user a admin since this is a admin only priv

            $currentUserAdmin = $this->storeMembers->storeMemberAdmin($currentUserStore->storeID, $currentUser->userID);

            if (!$currentUserAdmin) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'You are not an admin of this store'
                    ], 400);
            }

            // now lets now start the process of getting the shift
            // does the scheduleID exists ?

            $currentScheduleID = $this->scheduleGroup->getScheduleEntry($request->header('scheduleID'));

            if (!$currentScheduleID)  {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The scheduleID does not exist'
                ], 400);
            }

            // check if the employee storeID, scheduleID, and employeeID exists
            // only the shifts table inorder to get the shifts to the current user

            $currentEmployeeShifts = $this->employeeShifts->getEmployeeShifts($currentUserStore->storeID, $request->header('scheduleID'), $request->header('employeeID'));

           if ($currentEmployeeShifts) {
                // if shifts exist we will modify instead of creating

                return response()->json([
                    'status' => 'success',
                    'message' => 'Shifts found',
                    'data' => $currentEmployeeShifts
                ], 200);
           } else {
                // not shifts found so we will create
                return response()->json([
                    'status' => 'error',
                    'message' => 'The employee does not have any shifts'
                ], 400);
           }
    }
}
