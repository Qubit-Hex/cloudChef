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
        // TODO: Implement getAllMessages() method.
        // that will return all the messages of a user 
        return DB::table('store_messages')->get();
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
         return DB::table('store_messages')->where('messageID', $id)->first();
     }

     /**
      *  @method: deleteMessage
      * 
      * @purpose: this function is used to detach the message
      */


     public function deleteMessage($id)
     {
         $db = DB::table('store_messages')->where('messageID', $id)->delete();

         return $db === true ? response()->json(['message' => 'Message deleted successfully'], 200) 
                                 : response()->json(['message' => 'Message not deleted'], 400);
     }


     /**
      *  @method: createMessage
      *
      *  @purpose: this function is used to create the message sql query
      *
      */

     public function createMessage($data)
     {
       // well come back to this later when we test our route some more inorder to 
       // create a message query just by calling this function and leave the guess work out for the rest of the code
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
        $request = [
            'userID' => $data['userID'],
            'sharedKey' => $data['sharedKey'],
            'message' => $data['message'],
            'time' => $data['time'],
            'token' => $data['token']
        ];

        $user = DB::table('messageService')->where('userID', $data['userID'])->first();

        $recipientUser = DB::table('messageService')->where('sharedKey', $data['sharedKey'])->first();

        if($user && $recipientUser)
        {
            $response = [
                'status' => 'success',
                'message' => 'Message sent successfully',
                'data' => $request
            ];


            // form the response to send the new message to the recipient

            $sql = [
                'storeID' => 1,
                'userID' => $user->userID,
                'sharedKey' => $recipientUser->sharedKey,
                'message' => $data['message'],
                'timestamp' =>  date('Y-m-d H:i:s'),
                'status' => 0, // 0 for unread 1 for read
            ];

            if (DB::table('store_messages')->insert($sql)) {
                // return the success response
                return response()->json($response);
            } else {
                return response(['status' => 'error', 'message' => 'Message not sent'], 500);
            }

            return response()->json($response, 200);
        }
        else
        {
            $response = [
                'status' => 'error',
                'message' => 'Message not sent',
                'data' => $request
            ];
        }

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
        $request = [
            'userID' => $data['userID'],
            'sharedKey' => $data['sharedKey'],
            'message' => $data['message'],
            'time' => $data['time'],
            'token' => $data['token']
        ];

        // first validate the sharedkey key of the repected user 
        $user = DB::table('messageService')->where('userID', $data['userID'])->first();

        $shareKey = $user->sharedKey;

        // CHANGE THIS LATER TO A DYNAMIC VALIDATION function
        // this is just to test our api route for the messages for our store
        if ($request['sharedKey'] == $shareKey) {
            // key is valid so proccess 

            $messageGet = DB::table('store_messages')->where('userID', $data['userID'])->where('sharedKey', $data['sharedKey'])->get();

            // we will check our api resposne 
            return response()->json(['message' => $messageGet]);
        } else {
            return response()->json([
                'message' => 'Invalid shared key',
                'status' => 'failed',
                'backtrace' => 'Service/Dispatcher',
            ]);
        }
     }

     /**
      * 
      *  @method: dispatch 
      *
      *  @purpose: this function is used to dispatch the message to the user
      *
      */

  
    public function dispatch($message, $user)
    {
        // impliment a state machine to handle the message requst
        // this will hide our details using abstraction so we only 
        // the actions of the message route

        switch($message)
        {
            case 'create':
                // create the message
            break;
            case 'get':
                // get the message
            break;
            case 'delete':
                // delete the message
            break;
            case 'send':
                // send the message
            break;
            case 'getAll':
                // get all the messages
            break;
            default:
                // return an error
        }
    }




}
