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
use Psr\Http\Message\ResponseInterface;

class DispatchMessage implements MessageInterface
{


    // we will impliment a encryption pipelines for the users in the coverstations 
    const PrivateMessageKey = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // TODO inpliment encapuslation for this class to make it more secure
    // and hide the details of how the message is send/received/deleted




    // IMPLIMENT A PIPELINE FOR LIMITING THE NUMBERS OF MESSAGES THAT CAN BE SENT IN A GIVEN TIME PERIOD
    const RateLimit = 10;
    const RateLimitTime = 60;


    public function __construct()
    {
        // initilize are event dispatcher here 

        // we will use this accross class to verify the requests of the message
        $this->initMessageKey = openssl_random_pseudo_bytes(32);

    }

   
    /**
     * 
     * @function: getAllMessages
     * 
     *  @purpose: this function is used to get all the messages
     *
     */

    public function getAllMessages()
    {
        $messages = DB::table('messages')->get();
        // dump the database of messsage to the console
        return Response()->json('DB_MESSAGES', $messages);
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
        $db = DB::table('user_messages')->where('messageID', $id)->first();

        // check if the message is found in the database

        if ($db) {
            return Response()->json(['message' => 'message found', 
                                     'data' => $db]);
        }

        return Response()->Json(['message' => 'message not found'], 404);
    }

    /**
     *  @method: deleteMessage
     * 
     * @purpose: this function is used to detach the message
     */


    static function deleteMessage($id)
    {

       $db = DB::table('user_messages')->where('messageID', $id)->delete();

       if ($db) {
           return Response()->json(['message' => 'message deleted']);
       }

       return Response()->json(['message' => 'message not found'], 404);

    }


    /**
     *  @method: createMessage
     *
     *  @purpose: this function is used to create the message sql query
     *
     */

    public function createMessage($data)
    {
        # make a structure for sending messages 
        
        $message = [
            'storeID' => $data['storeID'],
            'token' => $data['token'],
            'userID' => $data['userID'],
            'requestTime' => $data['requestTime'],
            'message' => $data['message'],
            'status' => $data['status'],
        ];

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
            // add message structure for store messsages 


            /**
             *  @blueprint: 
             * 
             *   storeID -> users store 
             *   token -> the unique access token for the user 
             *   userID -> the recipient of the user 
             *   requestTime -> time of the request  
             *   Message -> the message we are going to send to the user 
             * 
             */



             // form request object to send to the server 
             // TODO: add validation for the message
             $requestObject = [
                 'storeID' => $data['storeID'],
                 'token' => $data['token'],
                 'userID' => $data['userID'],
                 'requestTime' => $data['requestTime'],
                 'message' => $data['message']
             ];



             // check if the user message is empty ? 
             if (strlen($requestObject['message']) ===  0) {
                 return Response()->json(['error' => 'Message cannot be empty',
                                         'inputError' => true,
                                         'errorMessage' => "Message cant be empty please fill out this field"], 401);
             }


             // get current user db info
             $currentUser = DB::table('users')->where('remember_token', $requestObject['token'])->first()->userID;
             $user_profile = DB::table('user_profile')->where('storeID', $requestObject['storeID'])->where('userID', $requestObject['userID'])->first();



             // check if im trying to send a message to myself 
             if ($currentUser == $requestObject['userID']) {
                 return response()->json([
                     'status' => 'error',
                     'message' => 'You cannot send message to yourself'
                 ]);
                }


                // is user profile valid?
             if (!$user_profile) {
                 return response()->json([
                     'status' => 'error',
                     'message' => 'The user you are trying to send message to is not a member of this store',
                     'trace' => $requestObject
                 ]);
             }


             // get group id of the user
             $groupID = DB::table('user_group_member')->where('userID', $requestObject['userID'])->where('storeID', $requestObject['storeID'])->first()->groupID;


             // insert new message into the datababse
             $insertMessage = DB::table('user_messages')->insert([
                 'storeID' => $requestObject['storeID'],
                 'userID' => $currentUser,
                 'groupID' => $groupID,
                 'message' => $requestObject['message'],
                 'time' => $requestObject['requestTime'],
                 'read' => 0,
             ]);


             // check if the message was sent successfully
             if ($insertMessage) {
                 return response()->json([
                     'status' => 'success',
                     'message' => 'Message sent successfully',
                     'trace' => $requestObject
                 ]);
                }

                // check if the user is blocked by the current user
            

             // debug json response for REST API  REMOVE THIS LATER
             return Response()->json([
                 'status' => 'success',
                 'message' => 'message sent successfully',
                 'data' => [
                     'storeID' => $requestObject['storeID'],
                     'token' => $requestObject['token'],
                     'userID' => $requestObject['userID'],
                     'requestTime' => $requestObject['requestTime'],
                     'message' => $requestObject['message'],
                     'status' => 'sent',
                     'user_profile' => $user_profile,
                     'message' => $requestObject['message'],
                 ]
             ]);



        
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
        $user_profiles = DB::table('user_profile')->where('storeID', $data['storeID'])->where('userID', $data['userID'])->get();

        // check if we are talking to our selfs
        if ($response['userID'] === $currentUser) {
            // we are talking to ourself 
            $response['message'] = 'You cannot send a message to yourself';
            $response['status'] = 'error';

             die(Response()->json(['error' => $response['message']], 400));
        }


        if ($user_profiles) {

            // next filter the store group

            $currentUserConvos = DB::table('user_group_member')->where('storeID', $response['storeID'])->where('userID', $currentUser)->get();
            $fetch_user_convo = DB::table('user_group_member')->where('storeID', $response['storeID'])->where('userID', $response['userID'])->get();
            if ($fetch_user_convo) {

                // your current conversations
                $userGroups = array_map(function ($key) {
                    return $key['groupID'];
                }, json_decode(json_encode($fetch_user_convo, true), true));


                // requesting the messages
                $recipientGroups = array_map(function ($key) {
                    return $key['groupID'];
                }, json_decode(json_encode($fetch_user_convo, true), true));

                // check if a key exists in both arrays
                $switched = false;
                $convoGroupID = null;
                // check we already have a converstation with the user 
                for ($i = 0; $i < count($recipientGroups); $i++) {
                    // now check if the user has a conversation with the current user
                    if (in_array($recipientGroups[$i], $userGroups)) {
                        $switched = true;
                        $convoGroupID = $recipientGroups[$i];
                        break;
                    } 


                    // change this later inorder to properly fetch the new messages
                    for ($i = 0; $i < count($userGroups); $i++) {
                        // now check if the user has a conversation with the current user
                        if (in_array($userGroups[$i], $userGroups)) {
                            $switched = true;
                            $convoGroupID = $recipientGroups[$i];
                            break;

                        } 
                    }
                        
                    
                    // make sure we are not messaging ourself
                    if ($currentUser === $user_profiles[$i]->userID) {
                        return Response()->json(['error' => $user_profiles], 401);
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
     *  @purpose: inorder to remove a user from the group / also acts as a clean up function if something goes wrong with our inserts :/
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
     * 
     *  @method: generateSignature
     * 
     *  @purpose: this function is used to generate a signature for the message
     * 
     * 
     */

     public function generateSignature($message, $rounds = 5)
     {
         $message;


         #iterate through the rounds seems to better than using recursion 
         # for speed bottle necks   
         
        for ($i = 0; $i < $rounds; $i++) {
            $message = hash('sha256', $message);
        }
        # we will use this a key for each user to encrypt/decrypt the message  
        return $message;
     }

    /**
     * 
     *  @method: dispatcherPrivateState 
     * 
     *  @purpose: this function is used to dispatch the private state of the user
     */


    private function dispatcherPrivateState($userID, $storeID, $args = [])
    {

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
        // simple state machine for accepting messages from the user using event broadcasting 


    }
}
