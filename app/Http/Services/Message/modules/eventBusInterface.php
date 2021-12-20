<?php 

/**
 * 
 *  @interface: eventBusInterface
 * 
 * 
 *  @purpose: template for our eventBusDispatcher
 * 
 */



 namespace App\Http\Services\Message\modules;

use phpDocumentor\Reflection\Types\Self_;

// BUS APPLICATION CODES




 interface EventBusDispatcher {


  


      public function __construct($EVENT, $data);


    /**
     *  @method: call
     * 
     * 
     *  @purpose: this function will call our dispatcher and will return some information based on what the event is 
     * 
     *
     * @param [type] $eventName
     * @param [type] $message
     * @return void
     * 
     */

    static function call($eventName, $messageCode );

    /**
     *  @method: dispatch
     * 
     *  @purpose: this function will dispatch the message to the user
     * 
     *
     * @param [type] $eventName
     * @param [type] $message
     * @return void
     * 
     */
    static function dispatch($eventName, $messageCode);


    /**
     * 
     *  @method: block transaction 
     * 
     *  @purpose: this will block our message transaction and prevent our invalid message from being sent
     * 
     */

    static function blockTransaction();


    /**
     *  
     *  @method: unblock transaction
     * 
     * 
     *  @purpose: this will unblock our message transaction and allow our invalid message to be sent
     * 
     */
    static function unBlockTransaction();


    /**
     * 
     *  @method: approveTransaction
     * 
     *  @purpose: in this function we will approve our transaction and allow our message to be sent 
     * 
     */

     static function approveTransaction();

 }

?>