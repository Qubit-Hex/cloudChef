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
    constructor(props) {
        super(props);

        // refs
        this.messageContent = React.createRef();
        this.sendMessageContent = React.createRef();

        this.state = {
            user: this.props.user,
            profileImg: this.props.profileImg,
            sharedState: this.props.sharedState,
            token: this.props.token,
            userID: this.props.userID,
            textareaError: "",
            messageContent: "",
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
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     *
     *  @method: sendMessage
     *
     *  @purpose: this is going to send a message to the user
     *
     **/

    sendMessage() {
        let fetchService = new FetchServiceProvider();

        // headers

        const headers = {
            "Content-type": "application/json",
            Accept: "application/json",
        };

        // request object

        let messageContent = this.state.messageContent;

        const request = {
            storeID: this.state.sharedState.storeID,
            userID: this.state.userID,
            profileImg: this.state.profileImg,
            // format date to be sent to the server
            requestTime: Date.now(),
            token: this.getCookie("accessToken"),
            message: messageContent,
        };

        console.log(messageContent);

        // NOTES: NEED TO ADD WEB WORKER TO LISTEN FOR MESSAGE EVENTS AND THEN ADD TO THE CHATBOX AFTER
        // MY ROUTE TESTING IS COMPLETE...

        let url = `/api/messages/send?storeID=${request.storeID}&userID=${request.userID}&profileImg=${request.profileImg}&&token=${request.token}&message=${request.message}&requestTime=${request.requestTime}`;

        return fetchService.$get(url, headers, (response) => {
            if (response.inputError === true) {
                // proccess error
                this.setState({ textareaError: response.errorMessage });
            }
        });
    }

    /**
     *
     *  @method: validation
     *      // change to validatation message and have a validate method to return a boolean value so we can reuse the method
     *
     *  @purpose: this will validate the input of the controls
     */

    validation(e) {
        let errorMessage = document.getElementById("textarea-error");
        return e.target.value.length === 0
            ? (errorMessage.innerHTML = "Please fill out this field")
            : (errorMessage.innerHTML = "");
    }

    /**
     *
     *  @method: componentDidMount
     *
     *
     *  @purpose: this will run after the component has mounted
     *
     *
     *
     */

    componentDidMount() {
        this.messageContent.current.addEventListener("change", (e) => {
            this.setState({
                messageContent: this.messageContent.current.value,
            });
        });

        this.sendMessageContent.current.addEventListener("click", (e) => {
            this.sendMessage();

            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="chatbox-message-controls">
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
                        >
                            {this.state.textareaError}
                        </span>
                    </label>

                    <textarea
                        message-content="true"
                        onChange={(e) => {
                            this.validation(e);
                        }}
                        class="form-control"
                        id="chatbox-message-content"
                        ref={this.messageContent}
                        rows="3"
                    ></textarea>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button
                                    className="btn btn-message"
                                    ref={this.sendMessageContent}
                                >
                                    {" "}
                                    Send{" "}
                                    <i
                                        class="fa fa-paper-plane hidden-label"
                                        aria-hidden="true"
                                        id="make_loading_event"
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
