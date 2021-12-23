/**
 * 
 *  @file: messageRelayListener.js
 * 
 * 
 *  @purpose: This worker is responsible for listening for messages from the message system 
 *            and relaying them to the appropriate worker.
 */

class MessageRelayListener {

    constructor(messageSystem) {

        this.messageSystem = messageSystem;
        this.messageSystem.addListener(this);

    }

    /**
     * 
     *  @method: listen
     * 
     * 
     *  @purpose: This method is responsible for listening for messages from the message system
     * 
     *  @callback: function to be called when a message is received
     * 
     */

    listen = (eventName, callback) => {
      return this.messageSystem.on(eventName, callback);
    
    }

    send = (eventName, data) => {
        this.messageSystem.emit(eventName, data);
    }


    destroy = () => {
        this.messageSystem.removeAllListeners();
    }


}

export default MessageRelayListener;