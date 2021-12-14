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
            user: this.props.user
        };
    }


    /**
     * 
     *  @method: sendMessage 
     * 
     *  @purpose: this is going to send a message to the user           
     *
     **/

    sendMessage()
    {
        let fetchRequest = new FetchServiceProvider();

        

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
        console.log(e.target.value.length);

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
                                            id="message"
                                            rows="3"
                                        ></textarea>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <button className="btn btn-message"
                                                    
                                                    onClick={
                                                        (e) => {
                                                            this.sendMessage()
                                                    }}>
                                                        {" "}
                                                        Send{" "}
                                                        <i
                                                            class="fa fa-paper-plane hidden-label"
                                                            aria-hidden="true"
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