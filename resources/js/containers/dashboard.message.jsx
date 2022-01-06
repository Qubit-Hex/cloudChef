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


        // @NOTES: CHANGES THIS TO USE PROPS INSTEAD OF STATE

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
            ? (errorMessage.textContent = "Please fill out this field")
            : (errorMessage.textContentsel = "");
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


    /**
     * 
     * @returns 
     * 
     */

    render() {
        /// trigger a error message if our contact data isn't available

        console.log(this.setState.userData);
        return (
            <div className="container-fluid profile_card dashboard-content">
                
                <div className="row">
                    {/** Contact list section  */}

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


                    <div className="col mt-4 message-contact shadow">

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
                                        image={contact.img}
                                        date="53 minutes ago"
                                        active="false"
                                        isActive="ONLINE"
                                        storeID={contact.storeID}
                
                                    />

                                );
                            })}
                        </div>
                    </div>
                    {/** Message section */}    

                    <div className="col mt-4">

                    <div className='row' id='mesage-info-node'>
                            <div className='col-md-12 '>
                                    <h3 className='text-center mt-4'> <b> Please select a contact to view messages  </b></h3>
                                    <br/>

                                    <img src='/img/SVG/mail.svg' 
                                        alt='mail' 
                                        className='mx-auto d-block mt-4' 
                                        width={300} 
                                        height={300}/>

                                </div>
                            </div>  

                        <div id="messagePannel-container" className='mt-4' ref={this.messagePannel}>
                           {this.props.children}
                        </div>
                    </div>
                    {/*  Message box*/}
                </div>
            </div>
        );
    }
}
