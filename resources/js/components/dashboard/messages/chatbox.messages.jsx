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
        };
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
            storeID: this.state.sharedState.storeID,
            messageFrom: 4,
            messageTo: this.state.sharedState.userID,
            time: Date.now(),
        };

        /// build the query for our api inorder to get the messages from the database
        let url = `/api/messages/get?messageFrom=${request.messageFrom}&messageTo=${request.messageTo}&storeID=${request.storeID}`;
        

        return fetchService.$get(url, headers, (response) => {
            let container = document.getElementById("chatbubble-container");


            console.log(response.message);

            if (response.message.length === 0) {
                ReactDOM.render(
                    <div className="d-flex"> 
                        <img src='/img/SVG/empty_inbox.svg' width={200}  height={200} className="img-fluid"  />
                        <b className='h1'>No Messages</b>
                       
                    </div>,
                    container
                );
            }

            if (response.message) {
                // parse out messages boxes
                let chatBubbles = [];
                let counter = 0;


                for (const node of response.message) {
                    //  check if the message belongs to the user 
                    if (node.userID === this.state.sharedState.userID) {
                        chatBubbles.push(
                            <div key={counter}>
                                <ChatboxMessageBubble
                                    message={node.message}
                                    time={node.timestamp}
                                    status="to"
                                    profileImg="/img/SVG/female_user.svg"
                                />{" "}
                            </div>
                        );
                    } else {
                        chatBubbles.push(
                            <div key={counter}>
                                <ChatboxMessageBubble
                                    message={node.message}
                                    time={node.timestamp}
                                    status="from"
                                    profileImg="/img/SVG/female_user.svg"
                                />{" "}
                            </div>
                        );
                    }

                    counter++;
                }
                
                    ReactDOM.render(chatBubbles, container);

                    }
                    return setTimeout((res) => {   
                    this.fetchChatMessages();
                }, 7000);
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
