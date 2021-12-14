<?php


/**
 * 
 *  @interface MessageInterface
 * 
 * 
 *  @purpose: Interface for Dispatch Message Service
 */


 namespace App\Http\Services\Message;


 interface MessageInterface {





    /**
     * 
     *  @function: getAllMessages
     * 
     *  @purpose: Get all messages
     * 
     *  @param: none
     * 
     *  @return: array
     * 
     */

    public function getAllMessages();


    /**
     * 
     *  @function: getMessageById
     * 
     *  @purpose: Get message by id
     * 
     *  @param: $id
     * 
     *  @return: array
     * 
     */

    public function getMessageById($id);


    /**
     * 
     * @function: sendMessage 
     * 
     *  @purpose: Send message
     * 
     * @param: $data
     * 
     */

    static function sendMessage($data);


    /**
     * 
     *  @function: deleteMessage
     * 
     *  @purpose: Delete message
     * 
     *  @param: $id
     * 
     *  @return: boolean
     * 
     */

    static function deleteMessage($id);




    /**
     * 
     *  @function: createMessage 
     * 
     *  @purpose: Create message
     */

    public function createMessage($data);


 }