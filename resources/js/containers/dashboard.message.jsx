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
import FetchServiceProvider from "../lib/fetchServiceProvider";
import ReactDOM from "react-dom";
import { map } from "jquery";

export class MessagePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                // display all the user data
                contacts: [],
            },
            name: null,
            profileImg: null,
        };

        const messagePannel = this.messagePannel = React.createRef();
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
     *  @method: componentDidMount
     *
     *  @purpose: to get the data from the api and render it to the dom
     *
     *
     */

    componentDidMount() {



        
        const fetchService = new FetchServiceProvider();
        // headers

        const headers = {
            "Content-type": "application/json",
            Accept: "application/json",
            // we will add the toke to header after testing is complete
        };

        // grab the user data from the api
        fetchService.$get("/api/members/get", headers, (response) => {
            // we will render the data here
            let data = response.data;
            // rendeer our react component here

            if (response.data) {
                // render the data
                this.setState({
                    // set the state of the data
                    userData: {
                        contacts: data,
                    },
                });
            }
            // render issue message
            return false;
        });



        // add a web worker threads
        

    }

    render() {
        /// trigger a error message if our contact data isn't available

        console.log(this.setState.userData);
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
                            <label for="searchbox">Search Your Contacts</label>{" "}
                            {/**  add on change event we will use to search the databse
                             *
                             */}
                            <div className="input-group-append ">
                                <input
                                    type="text"
                                    id="contact-search"
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

                        <div
                            className="contacts-container"
                            id="container-contact-list"
                        >
                            {this.state.userData.contacts.map((contact) => {
                                return (
                                    <UserProfile
                                        key={contact.userID}
                                        profileID={contact.profileID}
                                        userID={contact.userID}
                                        name={contact.name}
                                        role={contact.role}
                                        image={contact.profileIMG}
                                        date="53 minutes ago"
                                        active="false"
                                        isActive="ONLINE"
                                        storeID={contact.storeID}
                                    />
                                );
                            })}
                        </div>
                    </div>
                
                    <div className="col">
                        <div id="messagePannel-container" ref={this.messagePannel}>
                           {this.props.children}
                        </div>
                    </div>
                    {/*  Message box*/}
                </div>
            </div>
        );
    }
}
