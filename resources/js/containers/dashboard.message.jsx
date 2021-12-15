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

import { UserProfile } from "../components/dashboard/messages/userProfileCard";
import { ChatBoxContainer } from "../components/dashboard/messages/chatbox.container";

export class MessagePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            name: null,
            profileImg: null,
        };
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

    /**
     *
     *  @method: renderContactList
     *
     *
     *  @purpose: inorder to render contacts the user has searched for the in specific store
     *
     */

    renderContactsList() {}

    render() {
        return (
            <div className="container-fluid profile_card dashboard-content">
                <div className="row">
                    <div className="col">
                        {/**
                         *
                         *  refactor section into some sub sections to reduce the complexity
                         *
                         *    - @messageBox Pannel -> the container to hold our content
                         *    - @profileHeader -> the user you are contacting there data eg photo, contact button, and phone button
                         *    - @messageContainer -> the container that will call the message api every x amount of time to
                         *                            refesh to message to get real time updates.
                         *
                         */}

                        {/** this is the container that we will update inorder to show the chatBox of
                         *   a user
                         */}
                        <div id="messagePannel-container">
                            <img
                                src="/img/SVG/network_outline.svg"
                                className="img-fluid m-auto"
                            />

                            <b className="text-center">
                                {" "}
                                Please select a contact to start chatting{" "}
                            </b>
                        </div>
                    </div>

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
                            <label for="searchbox">Search Your Contacts</label>{" "}
                            {/**  add on change event we will use to search the databse
                             *
                             */}
                            <div className="input-group-append ">
                                <input
                                    onChange={this.renderContactsList()}
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

                        <div className="contacts-container">
                            {/**  we will rende rthe contacts of the user when a name is searched here
                             *  TODO: AFTER I finish reactactoring
                             */}

                            <UserProfile
                                name="Heather Smith"
                                role="@heathersmith"
                                image="/img/face2.jpg"
                                date="53 minutes ago"
                                active="false"
                                isActive="ONLINE"
                            />

                            <UserProfile
                                name="John Doe"
                                role="@johndoe"
                                image="/img/face.jpg"
                                date="1 hour ago"
                                isActive="OFFLINE"
                            />

                            <UserProfile
                                name="Adam Smith"
                                role="@AdmSmith"
                                image="/img/face4.jpg"
                                date="2 days ago"
                                isActive="ONLINE"
                            />
                        </div>
                    </div>

                    {/*  Message box*/}
                </div>
            </div>
        );
    }
}
