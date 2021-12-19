/**
 * 
 *  @File  chatbox.container.jsx 
 * 
 * 
 * 
 *  @purpose inorder to hold our chatbox functionality components together 
 * 
 */



import React from "react";
import { ChatboxProfile } from "./chatbox.profile";
import { ChatboxMessages } from "./chatbox.messages";
import { ChatboxSendMessage } from "./chatbox.sendMessage";



export class ChatBoxContainer extends React.Component {
    
    
    constructor(props) {

        super(props);

        /**
         *  @Blueprint 
         * 
         *  how it will work is the props userID will create post request fetching a 
         *  once time public key for our converstation inorder to validate who is messaging within
         *  ours groups that our enforcer module that will take care of
         */
        this.state = {

            User: this.props.user,
            profileImg: this.props.profileImg,
            token: this.props.sharedToken, 
            sharedState: this.props.sharedState,
        };
    }


    render()
    {
        return (
            <div className='chatbox-container'>
                 <div id="chat-component-hide">
                        <div className="='message-pannel-container shadow">
                            <div className="modal-header">
                                <h2>
                                    {" "}
                                    <i class="fas fa-comment-dots"></i>
                                    <b>Messages</b>{" "}
                                </h2>
                                <i
                                    className="fa fa-comments"
                                    aria-hidden="true"
                                ></i>
                            </div>

                            <div className="col">
                                <div className="container message-pannel-container">
                                    {/** Here is the container that will render the message boxs */}


                                    <div className="message-pannel-header">

                                        {/**  
                                         *  this is going to render the profile 
                                         *   nav header 
                                         * 
                                        */}
                                        <ChatboxProfile 
                                            name={this.state.User}
                                            status={true}
                                            profileImg={this.state.profileImg} 
                                            sharedState={this.state.sharedState}  />

                                    </div>

                                    {/** message box */}
                                     <ChatboxMessages
                                        user={this.state.User}
                                        profileImg={this.state.profileImg}
                                        sharedState={this.state.sharedState}
                                     />


                                    {/** section for sending messages */}
                                     <ChatboxSendMessage 
                                        user={this.state.User} 
                                        profileImg={this.state.profileImg}
                                        sharedState={this.state.sharedState}
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>


        )
    }
}