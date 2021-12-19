/**
 * 
 * 
 *  @class: MessageListener
 * 
 * 
 *  @purpose: to listen for incoming messages and update the user based on the response 
 * 
 * 
 * 
 */


/**
 * 
 *  @blueprint: Listener 
 * 
 *  my goal is to make a synthentic event listener that will listen for incoming messages
 *  and update the user based on the response
 * 
 * using a network i/o stream as a listener inorder to only update when completely ne 
 * 
 */


import React from "react";

class ProxyListener extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            sharedState: this.props.sharedState,
            url: this.props.url,
        };


        // network i/o stream

        this.listen();

    }


    /**
     * 
     * @method: listen
     * 
     * @purpose: to listen for incoming messages and update the user based on the response
     */

    listen() {
        while (true) {
            let listener = new EventSource(this.state.url);

            listener.onmessage = (event) => {
                console.log(event.data);
            };
        }
    }




}

export default ProxyListener;