/**
 *
 *  @file: chatbox.messages.jsx
 *
 *
 *
 *  @purpose: to render the chatbox messages in our messages pannel
 */

import react from "react";

import { ChatboxMessageBubble } from "./chatbox.chatBubble";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import ReactDOM from "react-dom";

export class ChatboxMessages extends react.Component {
    constructor(props) {
        super(props);

        /**
         *   @blueprint
         *  
         *  user -> userID
         * 
         *  profileImg -> profileImg
         * 
         *  sharedState -> the parents state 
         *
         */

        this.state = {
            user: this.props.user,
            profileImg: this.props.profileImg,
            sharedState: this.props.sharedState,
            userID: this.props.userID,
            token: this.props.token,
        };
    }


    /**
     *  
     * @method: getCookie 
     * 
     * 
     * 
     *  @purpose: to get the cookie value via name in a string  
     * 
     *
     */

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    verifySender()  {


    }

    /**
     *
     *
     *   @method: fetchChatMessages
     *
     *   @purpose: inorder to fectch our chat messages and render them using our bubble
     *             component
     *
     */

    fetchChatMessages() {
      // change this to use web sockets instead of fetch

        let fetchService = new FetchServiceProvider();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        console.log(this.state.sharedState);

        const request = {
            storeID: 1,
            token: this.getCookie('accessToken'), // users token that is logged in  
            userID: this.state.userID,
            requestTime: Date.now(),
        };

      

        /// build the query for our api inorder to get the messages from the database
        let url = `/api/messages/get?storeID=${request.storeID}&token=${request.token}&userID=${request.userID}&requestTime=${request.requestTime}`;
        

        return fetchService.$get(url, headers, (response) => {
            let container = document.getElementById("chatbubble-container");


            // proccess error messages
            if (response.error) {
              return  ReactDOM.render(
                    <div className="col"> 
                        <img src='/img/something_wrong.png' className="img-fluid" width={150}  height={150}  />
                        <b style={{fontWeight: 600}}>Error</b> 
                        <b className='h4'> { response.error }</b>
                       
                    </div>,
                    container
                );
            }

            if (response.message.length === 0) {
                return ReactDOM.hydrate(
                    <div className="col">        
                        <b style={{fontWeight: 700}}> No Messages </b>
                        <img src='/img/SVG/empty_inbox.svg' className="img-fluid" width={100}  height={100}  />
                       
                    </div>,
                    container
                );

            }


            // proccess success messages
            if (response.message) {
                // parse out messages boxes
                let chatBubbles = [];
                for (let i = 0; i < response.message.length; i++) {
                    console.log(this.state.sharedState);
                    
                    chatBubbles.push( <ChatboxMessageBubble
                        key={i}
                        message={response.message[i].message}
                        user={this.state.user}
                        profileImg={this.state.profileImg}
                        sharedState={this.state.sharedState}
                        status="to"
                        
                    />);
                    
                }

                ReactDOM.render(chatBubbles, container);
            }
            });
    }

    render() {
        return (
            <div className="container-chatbox-messages">
                <div className="container-chat-log">
                    <div
                        className="container-fluid chat-bubble"
                        id="chatbubble-container">
                        {this.fetchChatMessages()}
                    </div>

                    {/* end of the chat container section  */}
                </div>
            </div>
        );
    }
}
