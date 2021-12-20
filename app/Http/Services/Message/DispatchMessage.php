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


    // give me a key of 100 bits
    private $key = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


    // TODO inpliment encapuslation for this class to make it more secure
    // and hide the details of how the message is send/received/deleted

    /**
     * 
     * @function: getAllMessages
     * 
     *  @purpose: this function is used to get all the messages
     *
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
    /*
      * @method: getMessages 
      * 
      * @HTTP_METHOD: GET
      *
      * @purpose: this function is used to get the messages
      *
      */

    static function getMessages($data)
    {

        // form our response message 
        $response = [
            'storeID' => $data['storeID'],
            'token' => $data['token'],
            'userID' => $data['userID'],
            'requestTime' => $data['requestTime'],
        ];

        // user id of the user logged in
        $currentUser = DB::table('users')->where('remember_token', $data['token'])->first()->userID;

        // load profiles from our store 
        $user_profiles = DB::table('user_profile')->where('storeID', $data['storeID'])->get();
        // load the user we want to talk to 
        $userSelected = $user_profiles->where('userID', $data['userID'])->first();

        if ($userSelected) {

            // next filter the store group

            $currentUserConvos = DB::table('user_group_member')->where('storeID', $data['storeID'])->where('userID', $currentUser)->get();
            $fetch_user_convo = DB::table('user_group_member')->where('storeID', $data['storeID'])->where('userID', $data['userID'])->get();
            if ($fetch_user_convo) {

                // your current conversations
                $userGroups = array_map(function ($key) {
                    return $key['groupID'];
                }, json_decode(json_encode($fetch_user_convo, true), true));


                // requesting the messages
                $recipientGroups = array_map(function ($key) {
                    return $key['groupID'];
                }, json_decode(json_encode($currentUserConvos, true), true));

                // check if a key exists in both arrays

                $switched = false;
                $convoGroupID = null;


                // check we already have a converstation with the user 
                for ($i = 0; $i < count($recipientGroups); $i++) {

                    // make sure we are not messaging ourself
                    if ($currentUser === $userSelected->userID) {
                        return Response()->json(['error' => 'You cannot send a message to yourself'], 401);
                    }
                    // now check if the user has a conversation with the current user
                    if (in_array($recipientGroups[$i], $userGroups)) {
                        $switched = true;
                        $convoGroupID = $recipientGroups[$i];
                        break;
                    } 
                }
                
                // check if our switch has been activiated
                if ($switched === true ) {
                    // now get the messages with the group id
                    $userConverstation = DB::table('user_messages')->where('groupID', $convoGroupID)->get();
                    return Response()->json(['status' => 'success',
                                             'message' => json_decode(json_encode($userConverstation, true), true)], 200);
                     
                } else {
                    // create a new conversation group one doesnt exist 
                }

                // now lets search all the group ids to see if the current user exists in the group 
                return Response()->json([
                    'status' => 'success',
                    'data' => $response,
                    'message' => 'example message',
                ], 200);
            } else {
                return Response()->json([
                    'status' => 'error',
                    'data' => $response,
                    'message' => ''
                ], 404);
            }

        } else {
            // return the resposne to the application 
            return Response()->json([
                'status' => 'error',
                'message' => 'user not found',
                'data' => $response
            ]);
        }

        // return our message response to the user
        return Response()->json(['message' => $response], 200);
    }


    /**
     *  @method: addUserToGroup 
     *
     *  @purpose: inorder to add a user to the group 
     */

    public function addUserToGroup()
    {
        // impliment details later 
    }


    /**
     *  @method: removeUserFromGroup
     * 
     *  @purpose: inorder to remove a user from the group 
     * 
     */

    public function removeUserFromGroup()
    {
        // impliment details later 
    }


    /**
     * 
     *  @method: dispatcher 
     *
     *  @purpose: this function is used to dispatch the correct message to the user
     *
     */

    public function dispatcher($data)
    {
    }
}
