<?php

/**
 * 
 *  @class: DispatchMessage
 * 
 *  @purpose: this class is used to dispatch message to the user    
 */




namespace App\Http\Services\Message;


use App\Http\Services\Message\MessageInterface;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Support\Facades\DB;
use App\Http\Services\Message\EventBus;

class DispatchMessage implements MessageInterface
{


    // TODO inpliment encapuslation for this class to make it more secure
    // and hide the details of how the message is send/received/deleted

    /**
     * 
     * @function: getAllMessages
     * 
     *  @purpose: this function is used to get all the messages
     */

    public function getAllMessages()
    {
    }

    /**
     *  
     *  @function: getMessageById
     * 
     *  @purpose: this function is used to get the message by id
     * 
     */

     public function getMessageById($id)
     {
     }

     /**
      *  @method: deleteMessage
      * 
      * @purpose: this function is used to detach the message
      */


     static function deleteMessage($id)
     {
       
     }


     /**
      *  @method: createMessage
      *
      *  @purpose: this function is used to create the message sql query
      *
      */

     public function createMessage($data)
     {
         // request for a new message object 
      
     }


     /**
      *   @method: sendMessage 
      *
      *
      *  @HTTP_METHOD: POST 
      *
      *  @purpose: this function is used to send the message
      */


     static function sendMessage($data)
     {
        

     }
     /**
      * @method: getMessages 
      * 
      * @HTTP_METHOD: GET
      *
      * @purpose: this function is used to get the messages
      *
      */


     static function getMessages($data)
     {

        // our query to get the messages
        }

     /**
      * 
      *  @method: dispatcher 
      *
      *  @purpose: this function is used to dispatch the correct message
      *
      */

      public function dispatcher($data)
      {

        
      }




}
