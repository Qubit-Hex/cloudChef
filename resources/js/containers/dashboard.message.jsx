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
                contacts: this.fetchStoreContacts(),
            },
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

    fetchStoreContacts() {
        let container = document.getElementById("container-contact-list");
        let fetchService = new FetchServiceProvider();

        let headers = {
            "Content-type": "application/json",
            Accept: "application/json",
            // we will add the toke to header after testing is complete
        };
        // fetch our members data from the api

        let contactElements = [];

        fetchService.$get("/api/members/get", headers, (response) => {
            // we will render the data here
            let data = response.data;
            // rendeer our react component her

            console.log(response); 
            
            if (response.data) {

                for (let i = 0; i < data.length; i++) {
                    contactElements.push(
                        <UserProfile
                            key={i}
                            profileID={data[i].profileID}
                            userID={data[i].userID}
                            name={data[i].name}
                            role={data[i].role}
                            image={data[i].profileIMG}
                            date="53 minutes ago"
                            active="false"
                            isActive="ONLINE"
                            storeID={data[i].storeID}
                        />
                    );
                }
                // to get the value you have to return the promise
                return this.renderContactList(contactElements);
            }
            // render issue
            return false;
        });

        return contactElements;
    }


    /**
     *
     *  @method: renderContactList
     * 
     *  @purpose: inorder to render the contact list from an jsx.elent
     *
     */


    renderContactList(contacts) {
       let container = document.getElementById('container-contact-list');
       return ReactDOM.hydrate(contacts, container);
    }


    render() {
            /// trigger a error message if our contact data isn't available


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

                        <div className="contacts-container" id="container-contact-list">
                            
                          
                        </div>
                    </div>

                    <div className="col">
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
                    {/*  Message box*/}
                </div>
            </div>
        );
    }
}
