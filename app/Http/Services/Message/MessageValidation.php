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

        $this->userID = $messageObject['userID'];
        $this->shareKey = $messageObject['sharedKey'];
        $this->message = $messageObject['message'];
        $this->time = $messageObject['time'];

    }

    /**
     *  
     *  @method: isShareTokenValid
     * 
     * 
     *  @purpose: checks to see if our shared converstation toke is valid 
     */

    public function  isSharedTokenValid() {
        $db = DB::table('messageService')->where('sharedKey', $this->shareKey)->first();
        if($db) {
            return true;
        }
        return false;
    }

    /**
     * 
     *  @method: isUserValid
     * 
     *  @purpose: this will validate if the user belongs to the repected store  
     */

    public function isUserValid()  {
            
            $user = DB::table('users')->where('userID', $this->userID)->first();
    
            if($user) {
                return true;
            }
    
            return false;
    }


    /**
     *  \
     *  @method: isMessageValid
     * 
     * 
     *  @purpose: this will validate if the message is valid
     */

     public function isMessageValid() {

        if (strlen($this->message) > 0) {
            return true;
        }
        return false;
     }
 }
?>