<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class mailer extends Controller
{

    // settings for our email controller to send the email


    // admin account to send the emails to
    protected $adminEmail = 'oliver.shwaba@gmail.com';
    protected $robotEmail = 'oshwaba@cloud-chef.ca';


     /**
     *
     *  @method: contact_send
     *
     * @purpose: this method is used to send the contact form data to the admin
     *
     */

    public function contact_send(Request $request)
    {

        // check all the fields to make sure they are not empty.

       if (empty($request->input('email')) || empty($request->input('name')) || empty($request->input('phone')) || empty($request->input('company'))) {
        // send the message back to the server
            return response()->json([
                'status' => 'error',
                'message' => 'All fields are required'
            ], 403);
        }

        // get the data from the request inorder to send it to the email template.

       $info = array(
           'email' => $request->input('email'),
           'name' => $request->input('name'),
           'phone' => $request->input('phone'),
           'company' => $request->input('company'),
           'request_id' => uniqid(),
       );

       // was the message successfull?
       if (!Mail::to($this->adminEmail)->send(new \App\Mail\contact_send($info))) {
        // send the message back to the server
            return response()->json([
                'status' => 'success',
                'message' => 'Your message has been sent successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'There was an error sending your message'
            ], 500);
        }
    }

    /**
     *
     *  @method: user_registration
     *
     *  @purpose: this method is used to send the user registration data to the admin
     *
     */

     public function user_registration($email, $password, $store_id, $token)
     {
        // for when a user registers on the site
        $info = array(
            'email' => $email,
            'password' => $password,
            'store_id' => $store_id,
            'request_id' => uniqid(),
            'token' => $token
        );


        // send the email to the newly registered user
        Mail::send(['html' => 'email/registration'], $info, function ($message)
        {
            $message->to('oliver.shwaba@gmail.com', 'Admin')->subject('Thank you for registering on Cloud Chef');
            $message->from('oshwaba@cloud-chef.ca', 'User Registration');
        });


         return response()->json([
            'status' => 'success',
            'message' => 'contact form data sent']);
     }


     /**
      *  @method: password_reset
      *
      *  @purpose: inorder to send the password reset to the email inorder to reset that password
      *
      */

      public function password_reset($email, $token, $user_id)
      {

        // for when a user forgets their password
        $info = array(
            'email' => $email,
            'token' => $token,
            'user_id' => $user_id,
            'created_at' => date('Y-m-d H:i:s'),
            'from' => $this->robotEmail
        );

        // send the request to the server.
       if (!Mail::to($email)->send(new \App\Mail\password_reset($info))) {



              return response()->json([
                'status' => 'success',
                'message' => 'password reset email sent']);
         }
          else {
              return response()->json([
                'status' => 'error',
                'message' => 'password reset email not sent']);
       }
      }

      /**
       *
       *  @method: new_password
       *
       *
       *  @purpose: inorder to send the new password to the user
       *
       */

       public function new_password($email, $password, $store_id)
       {
        // for when a user forgets their password
        $info = array(
            'email' => $email,
            'password' => $password,
            'store_id' => $store_id,
            'request_id' => uniqid(),
        );

        // send the request to the server.
       if (!Mail::to($email)->send(new \App\Mail\newPassword($info))) {
              return response()->json([
                'status' => 'success',
                'message' => 'password reset email sent']);
         }
          else {
              return response()->json([
                'status' => 'error',
                'message' => 'password reset email not sent']);
       }

      }
}
