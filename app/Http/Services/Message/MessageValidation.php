<?php


/**
 * 
 *  @class:  MessageValidation 
 * 
 *  @purpose: inorder to validate the message Request before sending it futher down the application 
 */

namespace App\Http\Services\Message;

use Illuminate\Support\Facades\DB;


class MessageValidation {

    public function __construct($messageObject)
    {
        // our structure 

    }

    /**
     * 
     *  @method: isUserValid
     * 
     *  @purpose: this will validate if the user belongs to the repected store  
     */

    public function isUserValid()  {
            
    }


    /**
     *  \
     *  @method: isMessageValid
     * 
     * 
     *  @purpose: this will validate if the message is valid
     */

     public function isMessageValid() {

     }
 }
?>