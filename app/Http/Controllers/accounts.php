<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPUnit\Framework\MockObject\Api;

use App\Models\User;
use App\Models\User_registration_log;
use App\Models\user_activation;
use App\Models\password_reset;
use App\Models\store_members as members;
use App\Http\Controllers\mailer;

class accounts extends Controller
{
    /**
     *
     *  @method: reset_password
     *
     *  @purpose: to reset the password of the user
     *
     */

    static function reset_password(Request $request, $token)
    {
        // generate a random password for the user to use for the reset
        // does the entry in the database exist
        $passwordResetEntry = password_reset::where('token', $token)->first();

        if ($passwordResetEntry) {
            // get the user id
            $created_at = $passwordResetEntry->created_at;

            // is the token for the user still valid? if not valid delete the entry.
            if (time() - strtotime($created_at) > 3600) {
                $passwordResetEntry->delete();
                return response()->json([
                    'message' => 'This password reset token is invalid.'
                ], 404);
            }

            // next lets generate a random password
            $user = User::find($passwordResetEntry->user_id);
            $salt = $user->salt;
            // generate a random password.
            $password = bin2hex(openssl_random_pseudo_bytes(8));
            // get the store id of the user

            $store_id = members::where('userID', $user->userID)->first()->storeID;
            // data to send to the user...
            $data = [
                'email' => $user->email,
                'password' => $password,
                'store_id' => $store_id,
                'request_id' =>  uniqid(),
            ];
            // update the users password and remove the reset password entry
            $user->password = hash('sha256', $password . $salt);
            $user->save();
            // delete the password reset entry
            $passwordResetEntry->delete();

            // init the mailer object inorder to send the email to the user in question. 
            $mail = new mailer();

            // send the email to the user with the new password.
            if ($mail->new_password($data['email'], $data['password'], $data['store_id'])) {
                return "Password reset successfully <a href='/login/'>Login</a> Please check your email for your new password and login";
            }

                return "Password reset failed";
        }

        return "Password reset failed! Link has expired";
    }
    /**
     *
     *  @method: activate_account
     *
     *  @purpose: to activate the account of the user
     *
     */

     static function activate_account(Request $request, $token)
     {
        // run some tests to make sure the token is valid

        $activation  = user_activation::where('activation_code', $token)->first();
        $currentAccount = User::where('userID', $activation->user_id)->first();

        // check if the user is already activated
        if ($currentAccount->status === 0) {
            // show the user a message if the account is already activated
            echo "Account is already activated, click <a href='/login'>here</a> to login";
            return;
        }

        if (User::activate_account($activation->user_id)) {
            // show the user a message if the account is activated
            echo "Account activated, click <a href='/login'>here</a> to login";
            return;
        }
    }
}
