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
         *   user -> the userid  of the we are messaging
         *   sharedKey -> a shared key for to establish a message request handshake to actually send the
         *              message if only the key is valid
         *   message -> the message
         *   time -> the current of the rwquest
         *
         *  messageStatus -> this is a boolean and will switch to true if the user has seen the message
         *
         */
        this.state = {
            user: this.props.user,
            profileImg: this.props.profileImg,
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
        // @TODO: add auth header once route testing is done
        // we will add the authorization header later
        let fetchService = new FetchServiceProvider();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        const request = {
            userID: 4,
            sharedKey: "testKey",
            message: null,
            time: Date.now(),
        };

        /// build the query for our api inorder to get the messages from the database
        let url =
            `/api/messages/get?userID=${request.userID}
            &sharedKey=${request.sharedKey}
            &message=${request.message}
            &time=${request.message}`;

        

        return fetchService.$get(url, headers, (response) => {
            let container = document.getElementById("chatbubble-container");

            if (response.message) {
                // parse out messages boxes

                let chatBubbles = [];

                let counter = 0;

                for (const node of response.message) {
                    if (counter % 2 === 0) {
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

                    if (response.message.length === 0) {
                        ReactDOM.render(
                            <div className="d-flex"> 
                                <img src='/img/SVG/empty_inbox.svg' width={200}  height={200} className="img-fluid"  />
                                <b className='h1'>No Messages</b>
                               
                            </div>,
                            container
                        );
                    }
                    return setTimeout((res) => {   
                    this.fetchChatMessages();
                }, 7000);
            }else {
                // return an errro
                return false;
            }
        });
    }

    render() {
        return (
            <div className="container-chatbox-messages">
                <div className="container-chat-log">
                    <div
                        className="container-fluid chat-bubble"
                        id="chatbubble-container"
                    >
                        {this.fetchChatMessages()}
                    </div>

                    {/* end of the chat container section  */}
                </div>
            </div>
        );
    }
}
