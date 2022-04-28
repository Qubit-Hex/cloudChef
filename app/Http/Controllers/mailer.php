<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class mailer extends Controller
{

    // settings for our email controller to send the email


    // admin account to send the email to
    protected $adminEmail = 'oliver.shwaba@gmail.com';


     /**
     *
     *  @method: contact_send
     *
     * @purpose: this method is used to send the contact form data to the admin
     *
     */

    public function contact_send(Request $request)
    {


       $info = array(
           'email' => $request->input('email'),
           'name' => $request->input('name'),
           'phone' => $request->input('phone'),
           'company' => $request->input('company'),
           'request_id' => uniqid(),

       );
       Mail::send(['html' => 'contact'], $info, function ($message)
       {
           $message->to($this->adminEmail, 'Admin')->subject('Contact Form')
           ->subject('Contact Form request');
           $message->from('oshwaba@cloud-chef.ca', 'Contact Form');
       });

        return response()->json([
           'status' => 'success',
           'message' => 'contact form data sent']);
    }



}
