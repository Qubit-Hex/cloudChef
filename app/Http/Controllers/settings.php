<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\employee;
use App\Http\Services\Auth\modules\encryption;

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
        $enc = new encryption();

        // generate the new password hash for the user
        $currentPassword = $enc->generatePasswordHash($request->input('oldPassword'), $currentUser->salt, 'sha256');
        $newPassword = $enc->generatePasswordHash($request->input('newPassword'), $currentUser->salt, 'sha256');
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
        $employee = new employee();
        $userData =  new User();
        $input = $request->input('address');

        $storeMember = $userData->getUserByRemeberToken($request->header('accessToken'));

        // preform some checks first
        if (empty($input)) {
            return response()->json(['status' => 'error', 'message' => 'The address field is required'], 400);
        }

        // cheeck if the address is a proper length

        if (strlen($input) < 5) {
            return response()->json(['status' => 'error', 'message' => 'The address must be at least 5 characters long'], 400);
        }
        $employeeData = $employee->changeEmployeeAddress($storeMember->userID, $request->input('address'));

        if ($employeeData) {
            return response()->json(['status' => 200, 'message' => 'Address changed successfully'], 200);
        }
        
        // address could not be changed
        return response()->json(['status' => 'error', 'message' => 'The address could not be changed'], 400);
    }
}
