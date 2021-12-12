/**
 *
 *  @file: DashboardMessage
 *
 *
 *  @class: MessagePage
 *
 *
 *  @purpose: This component is used to display the messages page of the dashboard.
 *
 *
 */

import React, { Component } from "react";

import { MessagesContactCard } from "../components/dashboard/messages/msgProfileCard";

export class MessagePage extends React.Component {
    constructor(props) {
        super(props);
    }

    showMessageCenter() {
        let container = document.getElementById("chat-component-hide");
    }

    /**
     *
     * @method: validation
     *
     *  @purpose: to check if a input is equal to 0 if it is then display a errro message to the user
     *
     */

    validation(e) {
        let errorMessage = document.getElementById("textarea-error");
        console.log(e.target.value.length);

        return e.target.value.length === 0
            ? (errorMessage.innerHTML = "Please fill out this field")
            : (errorMessage.innerHTML = "");
    }

    render() {
        return (
            <div className="container-fluid profile_card dashboard-content">
                <div className="row">
                    {/** Contact list section  */}
                    <div className="col message-contact shadow">
                        <div className="modal-header">
                            <h2>
                                {" "}
                                <i class="fas fa-user-tie"></i> <b>Contacts</b>{" "}
                            </h2>
                            <i
                                className="fa fa-comments"
                                aria-hidden="true"
                            ></i>
                        </div>

                        <div className="form-group mt-2 mb-2 message-pannel-container">
                            <label for="searchbox">
                                Search Your Contacts
                            </label>{" "}
                            
                            <div className="input-group-append ">
                            <input
                                type="text"
                                message-search="true"
                                className="form-control searchBox"
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            
                                <button
                                    message-button-search="true"
                                    className="btn btn-primary ml-2"
                                    type="button"
                                >
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <MessagesContactCard
                            name="Heather Smith"
                            role="@heathersmith"
                            image="/img/face2.jpg"
                            date="53 minutes ago"
                            active="false"
                            isActive="ONLINE"
                            onClick={this.showMessageCenter()}
                        />

                        <MessagesContactCard
                            name="John Doe"
                            role="@johndoe"
                            image="/img/face.jpg"
                            date="1 hour ago"
                            isActive="OFFLINE"
                        />

                        <MessagesContactCard
                            name="Adam Smith"
                            role="@AdmSmith"
                            image="/img/face4.jpg"
                            date="2 days ago"
                            isActive="ONLINE"
                        />
                    </div>
                    {/*  Message box*/}

                    <div className="col" id="chat-component-hide">
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
                                <div className="message-pannel-container">
                                    {/** Here is the container that will render the message boxs */}

                                    <div className="message-pannel-header">
                                        <div className='col'>

                                        <img
                                            src="/img/face2.jpg"
                                            className="img-fluid profile-img-sm m-4"
                                        />
                                        <b> Heather Smith </b>
                                        <i className="fa fa-circle online text-success fa-beat"></i>

                                        </div>


                                        <div className='row'>
                                            <div className='col m-4'>

                                        <button
                                            className="btn btn-message"
                                            onMouseEnter={(e) => {
                                                let container =
                                                    document.getElementsByClassName(
                                                        "button-text"
                                                    )[0];

                                                container.innerHTML = "Profile";
                                            }}
                                            onMouseLeave={(e) => {
                                                let container =
                                                    document.getElementsByClassName(
                                                        "button-text"
                                                    )[1];
                                                // the text of the container in order make the text dis apear

                                                container.innerHTML = "";
                                            }}
                                        >
                                            <i className="fa fa-user-circle">
                                                {" "}
                                            </i>

                                            <div className="hidden-label">
                                                <b className="button-text"> </b>
                                            </div>
                                        </button>
                                            </div>
                                        {/* cal, the user button */}

                                        <div className='col m-4'>

                                        <button
                                            className="btn btn-message"
                                            onMouseEnter={(e) => {
                                                let container =
                                                    document.getElementsByClassName(
                                                        "button-text"
                                                    )[1];

                                                container.innerHTML = "Phone";
                                            }}
                                            onMouseLeave={(e) => {
                                                let container =
                                                    document.getElementsByClassName(
                                                        "button-text"
                                                    )[1];
                                                // the text of the container in order make the text dis apear

                                                container.innerHTML = "";
                                            }}
                                        >
                                            <i className="fas fa-phone"> </i>
                                            <div className="hidden-label">
                                                <b class="button-text"></b>
                                            </div>
                                        </button>
                                        </div>
                                        </div>

                                        {/**  user profile button */}
                                    </div>

                                    {/* converstation container for our conversations */}

                                    {/**
                                     *  left = recipient
                                     *  right: you
                                     */}
                                    {/* converstations will repeat form right to left ording fashion  */}  
                                
                                    <div className="container-chat-log">
                                    
                                        <div className="chat-bubble">
                                            <div className="row">
                                                <div className="col">
                                                    <p className="convo-user  m-1">
                                                        short message test test
                                                        2 <br />
                                                        <small className="text-muted covo-sent-msg">
                                                            {" "}
                                                            Recived At: 12:01pm
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                               
                                                    <p className="convo-recipient m-1">
                                                        Testing a long Message
                                                        Lorem ipsum dolor, sit
                                                        amet consectetur
                                                        adipisicing elit. Quos
                                                        accusamus obcaecati
                                                        soluta nihil
                                                        necessitatibus iure
                                                        quidem nemo sequi,
                                                        minima voluptas aut
                                                        porro eos optio debitis
                                                        dicta dolorum veritatis,
                                                        ut a.
                                                        <br />
                                                        <small className="text-muted covo-sent-msg">
                                                            {" "}
                                                            Sent At: 12:00pm{" "}
                                                        </small>
                                                    </p>
                                            </div>
                                        </div>

                                        {/* end of the chat container section  */}
                                    </div>
                                    {/* Message box container  */}
                                    {/**  employee image modal    */}
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
                                                    <button className="btn btn-message">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
