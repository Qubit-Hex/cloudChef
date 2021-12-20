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


        // check if we are talking to our selfs
        if ($response['userID'] === $currentUser) {
            // we are talking to ourself 
            $response['message'] = 'You cannot send a message to yourself';
            $response['status'] = 'error';

             die(Response()->json(['errpr' => $response['message']], 400));
        }


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
                if ($switched === true) {
                    // now get the messages with the group id
                    $userConverstation = DB::table('user_messages')->where('groupID', $convoGroupID)->where('storeID', $data['storeID'])->get();
                    return Response()->json([
                        'status' => 'success',
                        'message' => json_decode(json_encode($userConverstation, true), true)
                    ], 200);
                } else {
                    // create a new conversation group one doesnt exist 
                    return Self::createConversation($data['storeID'], $currentUser, $data['userID']);
                }
            } else {
                // create a new conversation group one doesnt exist 
                return Self::createConversation($data['storeID'], $currentUser, $data['userID']);
            }
        } else {
            return Response()->json(['error' => 'User does not exist'], 401);
        }

        return Response()->json(['error' => 'User does not exist'], 401);
    }


    /**
     *  @method: createConversation
     * 
     *  @purpose: this function is used to create a new converstation
     *  
     */

    static function createConversation($storeID, $userID, $recipientID) {
        /**
         *  @blueprint:
         * 
         *  $storeID -> the storeID of the user
         *  $userID -> the userID of the user
         *  $recipientID -> the userID of the recipient
         * 
         */

         if ($userID === $recipientID) {
            return Response()->json(['error' => 'You cannot send a message to yourself'], 401);
         }

            // check if the user has a conversation with the recipient

        $currentUserConvos = DB::table('user_group_member')->where('storeID', $storeID)->where('userID', $userID)->get();

         define('storeID', $storeID);
         define('userID', $userID);
         define('recipientID', $recipientID);

        // create a new group

        return Self::createGroup($storeID, $userID, $recipientID);

    }

    /**
     * 
     *  @method: createGroup
     * 
     * 
     *  @purpose: this function is used to create a new group,
     * 
     */

     static function createGroup($storeID, $userID, $recipientID)
     {
         $db = DB::insert('insert into user_groups (storeID) values (?)', [$storeID]);

         // get the last inserted id
            $groupID = DB::table('user_groups')->latest('groupID')->first()->groupID;

         if ($db) {
             return Self::addUserToGroup($groupID, $userID, $recipientID);
         }
         return false;
     }


    /**
     *  @method: addUserToGroup 
     *
     *  @purpose: inorder to add a user to the group 
     */

    static function addUserToGroup($groupID, $userID, $recipientID) {
        /**
         *  @blueprint:
         * 
         *  $groupID -> the groupID of the user
         *  $userID -> the userID of the user
         *  $recipientID -> the userID of the recipient
         * 
         */

         /**
          *  @Objective:
          *
          *  we need to add something later for larger groups not just 1 on 1 conversations ?
          */

        $db = DB::insert('insert into user_group_member (groupID, userID, storeID) values (?, ?, ?)', [$groupID, $userID, storeID]);
        $db_recipient = DB::insert('insert into user_group_member (groupID, userID, storeID) values (?, ?, ?)', [$groupID, $recipientID, storeID]);

        if ($db && $db_recipient) {
            return true;
        } else {
            // check if the users exist in the datbase ?   
            $user_group_member = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $userID)->first();
            $user_group_member_recipient = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $recipientID)->first();

            // send error message for which user wasnt added to the database?
            if (!$user_group_member) {
                // run cleanup function
                return Response()->json(['error' => 'User is not in the group'], 401);
            } 

            if (!$user_group_member_recipient) {
                // run cleanup function
                return Response()->json(['error' => 'Recipient is not in the group'], 401);
            }
        }
    }


    /**
     *  @method: removeUserFromGroup
     * 
     *  @purpose: inorder to remove a user from the group / also acts as a clean up function if something goes wrong with our inserts 
     * 
     */

    public function removeUserFromGroup($groupID, $userID, $recipientID)
    {
        $db = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $userID)->delete();
        $db_recipient = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $recipientID)->delete();

        if ($db && $db_recipient) {
            return true;
        } else {
            // check if the users exist in the datbase ?   
            $user_group_member = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $userID)->first();
            $user_group_member_recipient = DB::table('user_group_member')->where('groupID', $groupID)->where('userID', $recipientID)->first();

            // send error message for which user wasnt added to the database?
            if (!$user_group_member) {
                // run cleanup function
                return Response()->json(['error' => 'User is not in the group'], 401);
            } 

            if (!$user_group_member_recipient) {
                // run cleanup function
                return Response()->json(['error' => 'Recipient is not in the group'], 401);
            }
        }
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
