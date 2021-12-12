<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



/**
 * 
 *  @class: messages 
 * 
 * 
 *  @purpose: to handle all the messages between stores and store members
 * 
 */

class messages extends Controller
{   
    public function __construct()
    {
        
    }

    /**
     * 
     *  @method: sendMessages 
     * 
     *  @purpose: to send messages between stores and the customers
     */

    public function sendMessage(Request $request)
    {

         // DS FOR OUR MESSAGE REQUEST 

         $message = [
             'to' => $request->input('to'),
            'from' => $request->input('from'),
            'message' => $request->input('message'),
            'groupID' => $request->input('groupID'), // this is for group coverstations to 
            // share a id between multiple users
         ];

         return $this->proccessRequest($message);
    }



    /**
     * 
     *  @method: proccessRequest
     * 
     *  @purpose: prepare our sql query and send it to the database
     * 
     */


    public function proccessRequest($message)
    {

    }

    /**
     *  
     *  @method: getMessages
     * 
     * 
     *  @return: returns all the comminication data by a user in the store if validated 
     * 
     */

    public function getMessages(Request $request)
    {

    }




}
