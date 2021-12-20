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
        $this->messageObject = $messageObject;
    }

    /**
     * 
     *  @method: isUserValid
     * 
     *  @purpose: this will validate if the user belongs to the repected store  
     */

    public function isUserValid()  {
        // chedck if the user is valid
        $db = DB::table('users')->where('remember_token', $this->messageObject['token'])->first();

        if ($db) {
            return true;
        }
        return false;
    }


    /**
     * 
     *  @method: isStoreValid 
     * 
     *  @purpose: this will validate if the store belongs to the repected user
     * 
     */

     public function isStoreValid()  {
        // chedck if the user is valid
        $db = DB::table('users')->where('remember_token', $this->messageObject['token'])->first();

        $uID = $db->userID;

        $store = DB::table('store_members')->where('userID', $uID)->where('storeID', $this->messageObject['storeID'])->first();

        if ($store) {
            return true;
        }
        return false;
     }


    /**
     *  
     *  @method: isMessageValid
     * 
     * 
     *  @purpose: this will validate if the message is valid
     */

     public function isMessageValid() {

     }

     /**
      *  @methoed: isGroupValid
      *
      * @purpose: this will  validatew if the messsage group is valid 
      */

      public function isGroupValid() {

      }



 }
?>