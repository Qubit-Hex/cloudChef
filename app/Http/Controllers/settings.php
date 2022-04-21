<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\employeeModel;
use App\Models\store_members;
use Faker\Core\Number;

class settings extends Controller
{
    /**
     *
     *  @method: changePassword
     *
     *  @purpose: inorder to change the password of the user
     *
     */
    public function changePassword(Request $request)
    {
        // change the password of the current user
        $userModel = new User();
        $currentUser =  $userModel->getUserByRemeberToken($request->header('accessToken'));


       function generatePasswordHash($password, $salt)
       {
            return hash('sha256', $password . $salt);
       }



        // generate the new password hash for the user
        $currentPassword = generatePasswordHash($request->input('oldPassword'), $currentUser->salt, 'sha256');
        $newPassword = generatePasswordHash($request->input('newPassword'), $currentUser->salt, 'sha256');
        $newPasswordHash = $userModel->changePassword($currentUser->userID, $currentPassword, $request->input('newPassword'));
        // is the oldPassword correct?

        // check if the passwords match before proccessing the request.
        if ($request->input('newPassword') !== $request->input('confirmPassword')) {

            return response()->json([ 'status' => 'error', 'message' => 'The new password and the confirm password do not match'], 400);
        }

        if ($currentPassword == $currentUser->password) {
            // return the new password hash
            if ($newPasswordHash === true) {
                return response()->json(['status' => 200, 'message' => 'Password changed successfully'], 200);
            } else {
                return $newPasswordHash;
            }
        }

        return response()->json(['status' => 'error',
                                 'message' => 'The password you provided does not match the current password in the system'],  401);
    }

    /**
     *
     *
     *  @method: changeAddress
     *
     *  @purpose: inorder to change the address of the user
     *
     */

    public function changeAddress(Request $request)
    {
        $employee = new employeeModel();
        $user = new User();
        $member = new store_members();

        // get all of the information about the user
        $currentUser =  $user->getUserByRemeberToken($request->header('accessToken'));

        // is the address the same as one that is already in the system?
        // check if the address is already in the system

        if ($employee->getEmployeeByAddress($request->input('address'), $currentUser->userID)) {
            return response()->json(['status' => 'error', 'message' => 'The address you provided is already in the system'], 400);
        }

        $currentEmployee = $employee->changeEmployeeAddress($currentUser->userID, $request->input('address'));

        if ($currentEmployee === true) {
            return response()->json(['status' => 'success', 'message' => 'Address changed successfully'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'The address you provided is not valid'], 400);
        }
    }

    /**
     *
     *  @method: changePhoneNumber
     *
     *  @purpose: inorder to change the phone number of the user
     *
     */

    public function changePhoneNumber(Request $request)
    {
        $phone = (int) $request->input('phone');

        // validate the phone number php validation
        // make sure the input is a number and remove any non-numeric characters

        $phone = preg_replace('/\D/', '', $phone);
        // remove any dash characters
        $phone = str_replace('-', '', $phone);
        $phone = (int) $phone;

        if (strlen($phone) > 12  || strlen($phone) < 10) {
            return response()->json(['status' => 'error', 'message' => 'The phone number you provided is not valid'], 400);
        }

        // change the phone numebr of the current user
        $user = new User();
        $currentUser =  $user->getUserByRemeberToken($request->header('accessToken'));
        $employee = new employeeModel();

        // is the phone the same as the only in the database
        $currentEmployee = $employee->changeEmployeePhoneNumber($currentUser->userID, $phone);

        return response()->json(['status' => 'success',
         'message' => 'Phone number changed successfully'], 200);

    }


    /**
     *
     *  @method: changeLocation
     *
     *  @purpose: inorder to change the location of the user
     *
     */

    public function changeLocation(Request $request)
    {

        $user = new User();
        $emp = new employeeModel();
        $currentUser = $user->getUserByRemeberToken($request->header('accessToken'));
        $userLocation = $request->input('state') . ', ' . $request->input('city');

        $currentEmployee = $emp->changeEmployeeLocation($currentUser->userID, $userLocation);

        if ($currentEmployee === true) {
            return response()->json(['status' => 'success', 'message' => 'Location changed successfully'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'The location you provided is not valid'], 400);
        }
    }
}
