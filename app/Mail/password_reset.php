<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class password_reset extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $email; // the email address of the user
    public $token; // the token to be sent to the user
    public $user_id; // the user id of the user


    public function __construct($data)
    {
        $this->email = $data['email'];
        $this->token = $data['token'];
        $this->user_id = $data['user_id'];
        $this->sender = $data['from'];
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        // send the email to reset the password
        return $this->from($this->sender)
            ->subject('Password Reset')
            ->view('email/reset_password')
            ->with([
                'email' => $this->email,
                'token' => $this->token,
                'user_id' => $this->user_id,
            ]);
    }
}
