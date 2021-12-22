<?php 
/**
 *  @class: MessageService
 * 
 * 
 *  @purpose: to direct message requests of our messaging API 
 */

namespace App\Http\Services\Message;


use App\Http\Services\Message\MessageValidation;
use Facade\FlareClient\Http\Response;
use Illuminate\Bus\Dispatcher;

class MessageService  {


    /**
     * 
     *  @method: getMessages 
     * 
     *  @purpose: this will send the message object futher down the pipeline inorder to validate the input before sending it to the core 
     */


    static function getMessages($requestObject)
    {   
       $validation = new MessageValidation($requestObject);

      if (!$validation->isUserValid()) {
    
        return Response()->json(['error' => 'Invalid user id'], 401);
      }

      if (!$validation->isStoreValid()) {
          return Response()->json(['error' => 'Invalid store id'], 401);
      } 

        return DispatchMessage::getMessages($requestObject);
    }
    
    /**
     * 
     *  @method:  sendMessage 
     * 
     *  @purpose:  this is will send the message object futher down the pipeline inorder to validate the input before sending it to the core of our
     *              application. 
     * 
     */


    static function sendMessage($requestObject)
    {
        $validation = new MessageValidation($requestObject);

        if (!$validation->isUserValid()) {
            return Response()->json(['message' => 'Invalid user id'], 401);
        }

        // send the message to user 

        return DispatchMessage::sendMessage($requestObject);
    }


    static function deleteMessage($requestObject)
    {
        $validation = new MessageValidation($requestObject);

        // TODO: add validation for the message id
        // before any changes are made to the datbase 
        
        return DispatchMessage::deleteMessage($requestObject);
    }


}



?>