/**
 * 
 *  @class" connectionInterface
 * 
 * 
 *  
 *  @purpose: inorder to make the connection between the server and the client and establish a active connection 
 *             using web worker threading 
 * 
 */


export class BroadcastChatProvider {

    constructor (connectionRequest) {

        this.connectionEvent = connectionRequest;

        /**
         * 
         *  @bluepirnt: connectionRequest 
         *                  
         *                 url: "http://localhost:8080/chat"
         *                method: "POST"  // or "GET"
         *               headers: {
         *                  "Content-Type": "application/json"
         *              }
         * 
         *              data: {
         *                 "username": "user1",
         *                "password": "password1"
         *             }
         * 
         *              timeout: 5000
         *              
         *              authorization: token,
         * 
         * 
         * 1
         */


        // here we are going to prevents any outside modification of our object instance
        Object.freeze(connectionRequest);

        // object state 
        this.state = {
            connected: false,
            disconnected: false,
            connecting: false,
        }

        // connection state if any changes the network state will be updated
        // and any futher connection will be dropped
        
        this.network = {
            status: false,  // true if connected to the server
            connection: null, // the connection object
        }
    }


    /**
     * 
     * @method: spawnSubConnection 
     * 
     *  @purpose: inorder to spawn a new connection to the server but return a creatation of a new connection object 
     *            we will use the for connections upon sub connections inorder to efficiently manage our connections and get resources 
     */

    spawnSubConnection(connectionRequest) {
        // spawn a new connection to the server

        // here we are just creating a interdace factory for our request method 
        return new BroadcastChatProvider(connectionRequest);
    }

    /**
     * 
     *  @method: getConnectionState 
     * 
     *  @purpose: to get the connection state of the client
     * 
     */

    getConnectionState() {
        const  networkStatus = () => {
            switch(this.network.status) {
               // some base cases to test before moving on into the application 
            }
        }

          return networkStatus();
    }


    /**
     *  @method: connect 
     * 
     *  @purpose: inorder to establish a active connection between the server and the client
     *            if we are successfully connected the network and state will be updated
     *            and will return a promise that objects can work with inorder to get data from the server 
     */

    connect() {
        // connect to our connection worker inorder to establish a active connection
    }


}
