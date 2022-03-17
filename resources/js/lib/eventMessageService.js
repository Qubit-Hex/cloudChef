/**
 *
 *  @class: EventMessageService
 *
 *
 *  @purpose: inorder to send and receive messages from the server
 *             this class will be used to send and receive messages
 *
 */

export class EventMessageService  {


    constructor(baseUrl) {
        // provides the setting we need inorder to setup our connection to and from the server
        this.baseUrl = baseUrl;
        // generate our unique handshake key inorder to interact with the server
        this.handshakeKey = this.getCookie('handshakeKey');
        // generate our unique access token inorder to interact with the server
        this.accessToken = this.getCookie('accessToken');
        // generate our unique refresh token inorder to interact with the server
        this.refreshToken = this.getCookie('refreshToken');
    }

    /**
     *
     *  @method Listen
     *
     *  @purpose: to listen for messages from the server
     *
     */
    listen(callback) {
        // create a new event source
        let eventSource = new EventSource(`${this.baseUrl}/event-stream`);

        // listen for messages
        eventSource.addEventListener('message', (message) => {
            callback(message.data);
        });

        // listen for errors
        eventSource.addEventListener('error', (error) => {
            if (eventSource.readyState === 0) {
                // connection was closed
                console.log('The EventSource connection was closed');
            }
        });
    }

    /**
     *
     *  @method Send
     *
     *
     *  @purpose: to send a message to the server
     *
     */
    
    send(message) {
        // send the message to the server
        return fetch(`${this.baseUrl}/event-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
    }

    /**
     *  @method: close
     *
     * @purpose: to close the connection to the server
     *
     */

    close() {
        // close the connection to the server
        this.eventSource.close();
    }
}
