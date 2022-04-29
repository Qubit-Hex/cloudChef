<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class contact_send extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($info)
    {
        $this->email = $info['email'];
        $this->name = $info['name'];
        $this->phone = $info['phone'];
        $this->company = $info['company'];
        $this->request_id = $info['request_id'];

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('oshwaba@cloud-chef.ca', 'Cloud Chef')
            ->subject('Contact Form Submission')
            ->view('email/contact')
            ->with([
                'email' => $this->email,
                'name' => $this->name,
                'phone' => $this->phone,
                'company' => $this->company,
                'request_id' => $this->request_id,
            ]);
    }
}
