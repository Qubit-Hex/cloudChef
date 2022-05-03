<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class newPassword extends Mailable
{
    use Queueable, SerializesModels;

    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->email = $data['email'];
        $this->password = $data['password'];
        $this->store_id = $data['store_id'];
        $this->request_id = $data['request_id'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
         // send the email to reset the password
         return $this->from('oshwaba@cloud-chef.ca')
         ->subject('New Password Generated')
         ->view('email/newPassword')
         ->with([
             'email' => $this->email,
             'password'=> $this->password,
             'store_id' => $this->store_id,
            'request_id' => $this->request_id,
         ]);
    }
}
