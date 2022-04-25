<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\employee_shifts;
use App\Models\store_members;
use App\Models\User;
use App\Models\scheduleGroup;
use App\Models\employeeModel;

class shifts extends Controller
{

    public function __construct()
    {

        $this->employeeShifts = new employee_shifts();
        $this->storeMembers = new store_members();
        $this->user = new User();
        $this->scheduleGroup = new scheduleGroup();
        $this->employeeModel = new employeeModel();
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
                    'shifts' => true,
                    'message' => 'Shifts found',
                    'data' => $currentEmployeeShifts
                ], 200);
           } else {
                // not shifts found so we will create
                return response()->json([
                    'status' => 'success',
                    'shifts' => false,
                    'message' => 'The employee does not have any shifts'
                ], 400);
           }


    }

    /**
     *
     *  @method: add
     *
     *  @purpose: inorder to add a shift to a specific employee
     *
     *
     */

     public function add(Request $request)
     {
        // some validation checks before we continue to add the shift into the system.

        // first check if the required data is empty
        if (empty($request->header('accessToken'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }


        // next the inputs do we have a scheduleID, employeeID, and a day
        if (empty($request->input('scheduleID')) || empty($request->input('employee')) || empty($request->input('day'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

        // next is the inputs of our post request valid or not check
        // to make sure the inputs are valid

        // Validation:
        ///     scheduleID (int)
        //      employeeID (int)
        //      day (int)


        // now lets validate the request that is being
        if (!is_numeric($request->input('scheduleID')) || !is_numeric($request->input('employee')) || !is_numeric($request->input('day'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }


        // there is no more than 7 days in a  week and it cannot be a or 0
        if ($request->input('day') < 1 || $request->input('day') > 7) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

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

                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not an admin of this store'
                ], 400);
        }


        // does the employee belong to the current users store

        $currentEmployee = $this->employeeModel->getEmployeeByID($request->input('employee'));


        if (!$currentEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not exist'
            ], 400);
        }


        // check if the store of the admin and the store of employee match before continuing

        if ($currentUserStore->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not belong to your store'
            ], 400);
        }
        // now lets now start the process of adding the shift into the database

        $scheduleID = $request->input('scheduleID');
        $employeeID = $request->input('employee');
        $currentScheduleID = $this->scheduleGroup->getScheduleEntry($request->input('scheduleID'));
        $start = $request->input('start_time');
        $end = $request->input('end_time');
        $is_off = $request->input('is_off');
        $day = $request->input('day');

        // check if the schedule id belongs to the store

        if (!$currentScheduleID)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not exist'
            ], 400);
        }

        if ($currentScheduleID->storeID != $currentUserStore->storeID ||
            $currentScheduleID->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not belong to your store'
            ], 400);
        }

        // run the post schedule entry method
        $insertNewShift = $this->employeeShifts->postEmployeeShifts(
            $scheduleID,
            $employeeID,
            $start,
            $end,
            $day,
            $is_off
        );

        if ($insertNewShift) {
            return response()->json([
                'status' => 'success',
                'message' => 'The shift has been added successfully'
            ], 200);
        }


        return response()->json([
            'status' => 'error',
            'message' => 'The shift could not be added, Please check input and try again.'
        ], 400);
     }

     /**
      *  @method: edit
      *
      *  @purpose; inorder to edit a shift
      *
      */

      public function edit(Request $request)
      {
           // some validation checks before we continue to add the shift into the system.

        // first check if the required data is empty
        if (empty($request->header('accessToken'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }


        // next the inputs do we have a scheduleID, employeeID, and a day
        if (empty($request->input('scheduleID')) || empty($request->input('employee')) || empty($request->input('day'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

        // next is the inputs of our post request valid or not check
        // to make sure the inputs are valid

        // Validation:
        ///     scheduleID (int)
        //      employeeID (int)
        //      day (int)


        // now lets validate the request that is being
        if (!is_numeric($request->input('scheduleID')) || !is_numeric($request->input('employee')) || !is_numeric($request->input('day'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }


        // there is no more than 7 days in a  week and it cannot be a or 0
        if ($request->input('day') < 1 || $request->input('day') > 7) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

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

        if (!$currentUserAdmin) {      $currentUser = $this->user->getUserByRemeberToken($request->header('accessToken'));

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

                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not an admin of this store'
                ], 400);
        }


        // does the employee belong to the current users store

        $currentEmployee = $this->employeeModel->getEmployeeByID($request->input('employee'));


        if (!$currentEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not exist'
            ], 400);
        }


        // check if the store of the admin and the store of employee match before continuing

        if ($currentUserStore->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not belong to your store'
            ], 400);
        }
        // now lets now start the process of adding the shift into the database

        $scheduleID = $request->input('scheduleID');
        $employeeID = $request->input('employee');
        $currentScheduleID = $this->scheduleGroup->getScheduleEntry($request->input('scheduleID'));
        $start = $request->input('start_time');
        $end = $request->input('end_time');
        $is_off = $request->input('is_off');
        $day = $request->input('day');

        // check if the schedule id belongs to the store

        if (!$currentScheduleID)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not exist'
            ], 400);
        }

        if ($currentScheduleID->storeID != $currentUserStore->storeID ||
            $currentScheduleID->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not belong to your store'
            ], 400);
        }

        // run the post schedule entry method
        $insertNewShift = $this->employeeShifts->postEmployeeShifts(
            $scheduleID,
            $employeeID,
            $start,
            $end,
            $day,
            $is_off
        );

        if ($insertNewShift) {
            return response()->json([
                'status' => 'success',
                'message' => 'The shift has been Modified successfully'
            ], 200);
        }


        return response()->json([
            'status' => 'error',
            'message' => 'The shift could not be modified, Please check input and try again.'
        ], 400);

      }


      /**
       *
       *  @method: delete
       *
       *  @purpose; inorder to delete a shift from the systme
       *
       */

       public function delete(Request $request)
       {

            // some validation checks before we continue to add the shift into the system.


        $accessToken = $request->header('accessToken');
        $scheduleID = $request->header('scheduleID');
        $employeeID = $request->header('employee');
        $day = $request->header('day');

        // first check if the required data is empty
        if (empty($accessToken)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

        // next the inputs do we have a scheduleID, employeeID, and a day
        if (empty($scheduleID) || empty($employeeID) || empty($day)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

        // now lets validate the request that is being
        if (!is_numeric($scheduleID) || !is_numeric($employeeID) || !is_numeric($day)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }


        // there is no more than 7 days in a  week and it cannot be a or 0
        if ($day < 1 || $day > 7) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all the required data'
            ], 400);
        }

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

                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not an admin of this store'
                ], 400);
        }

        // does the employee belong to the current users store
        $currentEmployee = $this->employeeModel->getEmployeeByID($employeeID);

        if (!$currentEmployee) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not exist'
            ], 400);
        }

        // check if the store of the admin and the store of employee match before continuing
        if ($currentUserStore->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The employee does not belong to your store'
            ], 400);
        }
        // now lets now start the process of adding the shift into the database
        $currentScheduleID = $this->scheduleGroup->getScheduleEntry($scheduleID);

        // check if the schedule id belongs to the store
        if (!$currentScheduleID)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not exist'
            ], 400);
        }

        if ($currentScheduleID->storeID != $currentUserStore->storeID ||
            $currentScheduleID->storeID != $currentEmployee->storeID) {
            return response()->json([
                'status' => 'error',
                'message' => 'The scheduleID does not belong to your store'
            ], 400);
        }


        /// delete the shift from the database

        $deleteShift = $this->employeeShifts->deleteEmployeeShift(
            $scheduleID,
            $employeeID,
            $day
        );

        // did the employee shift get deleted
        if ($deleteShift) {
            return response()->json([
                'status' => 'success',
                'message' => 'The shift has been deleted successfully'
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'The shift could not be deleted, Please check input and try again.',
            'deleteShift' => $deleteShift
        ], 400);
    }



}
