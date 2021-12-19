<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\Message\MessageService;
use PDO;

/**
 * 
 *  @controller: Message
 * 
 * 
 *  @purpose: inorder to controll our messaging datta
 */

class Message extends Controller
{

    private $rateLimit = 5;
    private $rateLimitPeriod = 1;

    public function __construct()
    {
        // include our authentication middleware for this route 
        // generate a random token for logs for each request
        // we also have a rate throttler for this route we need to add
        // prevent any one from sending more than 5 messages per second 

        $this->requestToken  = bin2hex(openssl_random_pseudo_bytes(16));
        //$this->middleware('auth');
    }
    /**
     *  @method:  get 
     * 
     *  @purpose: inorder to retrive the converstation for the api between a group / and or 2 users 
     */
    
    public function get(Request $request)
    {

        // message request structure 
        $messageRequest = [
            'storeID' => $request->input('storeID'),
            'messageFrom' => $request->input('messageFrom'),  
            'messageTo' => $request->input('messageTo'),
            'time' => $request->input('time'),
            'signature' => $this->requestToken,
        ];

        return MessageService::getMessages($messageRequest);
    }

    /** 
     * 
     *  @method: send 
     * 
     * 
     *  @purpose: inorder to send a message in a converstation 
     * 
     */

     public function send(Request $request)
     {

        // send message structure
        $messageRequest = [
            'storeID' => $request->input('storeID'),
            'messageFrom' => $request->input('messageFrom'),
            'messageTo' => $request->input('messageTo'),
            'message' => $request->input('message'),
            'time' => $request->input('time'),
            'signature' => $this->requestToken,
        ];

        return MessageService::sendMessage($messageRequest);

     }

}
