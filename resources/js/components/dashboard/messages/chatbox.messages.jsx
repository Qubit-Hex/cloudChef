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

    
    render() {
        return (
            <div className="container-chatbox-messages">
                <div className="container-chat-log">
                    <div className="container-fluid chat-bubble">

                        <ChatboxMessageBubble
                            message="test message"
                            time="10:00pm"
                            status="to"
                            profileImg='/img/SVG/female_user.svg'
                        />

                        <ChatboxMessageBubble
                            message="another test buble message "
                            time="10:00pm"
                            status="from"
                            profileImg='/img/SVG/male_user.svg'
                        />

                        <ChatboxMessageBubble
                            message="lorsidofkjsoghiuherwjlkm;"
                            time="10:00pm"
                            status="from"
                            profileImg='/img/SVG/male_user.svg'
                        />
                        
                
                    </div>

                    {/* end of the chat container section  */}
                </div>
            </div>
        );
    }
}
