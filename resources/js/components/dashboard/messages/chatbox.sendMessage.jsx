/**
 * 
 *  @file: chatbox.sendMessage 
 * 
 *  @purpose: this will send messages to the user 
 * 
 */


import React from "react";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";


export class ChatboxSendMessage extends React.Component {


    constructor(props)
    {
        super(props);

        this.state = {
            user: this.props.user,
            profileImg: this.props.profileImg,
            sharedState: this.props.sharedState,
            token: this.props.token,
            userID: this.props.userID,
        };
    }


    /**
     * 
     *  @method: sendMessage 
     * 
     *  @purpose: this is going to send a message to the user           
     *
     **/

    sendMessage(event)
    {
        let fetchService = new FetchServiceProvider();

        // headers 

        const headers = {
            "Content-type": "application/json",
            Accept:  "application/json",
        };

        // request object

        const request = {
            userID: this.state.user,
            profileImg: this.state.profileImg,
            sharedState: this.state.sharedState,
            token: this.state.token,
            message: document.getElementById('chatbox-message-content').value,
        };


        let url =
        `/api/messages/send?userID=${request.userID}&profileImg=${request.profileImg}&sharedState=${request.sharedState}&token=${request.token}&message=${request.message}`;
    
        return fetchService.$get(url, headers, (response) => {
            console.log(response);
        });
    }


    /**
     * 
     *  @method: validation 
     *      // change to validatation message and have a validate method to return a boolean value so we can reuse the method 
     * 
     *  @purpose: this will validate the input of the controls
     */

     validation(e) 
     {
        let errorMessage = document.getElementById("textarea-error");
        return e.target.value.length === 0 ? (errorMessage.innerHTML = "Please fill out this field") : (errorMessage.innerHTML = "");
    }


    render() {


        return (
            <div className='chatbox-message-controls'>
                              <div className="form-group">
                                        <label for="message" className="m-4">
                                            Message{" "}
                                            <span
                                                id="textarea-error"
                                                className="text-danger"
                                                style={{
                                                    fontWeight: "300",
                                                    fontSize: "14px",
                                                }}
                                            ></span>
                                        </label>

                                        <textarea
                                            message-content="true"
                                            onChange={(e) => {
                                                this.validation(e);
                                            }}
                                            class="form-control"
                                            id="chatbox-message-content"
                                            rows="3"
                                        ></textarea>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <button className="btn btn-message"
                                                    
                                                    onClick={
                                                        (e) => {
                                                            this.sendMessage(e)
                                                    }}>
                                                        {" "}
                                                        Send{" "}
                                                        <i
                                                            class="fa fa-paper-plane hidden-label"
                                                            aria-hidden="true"
                                                            id='make_loading_event'
                                                        ></i>
                                                    </button>
                                                </div>

                                                <div className="col">
                                                    <button className="btn btn-danger">
                                                        {" "}
                                                        Cancel{" "}
                                                        <i class="fas fa-comment-slash hidden-label"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </div>
        );
    }
}