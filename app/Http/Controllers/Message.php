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

    // TODO inpliment encapuslation for the rate limits for this class to abstract details we dont
    // REALLY CARE ABOUT IN THIS CLASS  
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
     * 
     */
    
    public function get(Request $request)
    {

        // REDESIGN THIS DATA STRUCTURE TO FIT OUR NEW ARCHITECTURE DESIGN
        $messageRequest = [
            'storeID' => $request->input('storeID'),
            'token' => $request->input('token'),
            'userID' => $request->input('userID'),
            'requestTime' => $request->input('requestTime'),

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

        // REDESIGN THIS DATA STRUCTURE TO FIT OUR NEW ARCHITECTURE DESIGN
        $messageRequest = [
            'storeID' => $request->input('storeID'),
            'token' => $request->input('token'),
            'userID' => $request->input('userID'),
            'requestTime' => null,
            'message' => $request->input('message'),
        ];

        return MessageService::sendMessage($messageRequest);

     }

}
