/**
 *
 *  @file: dashboard.contacts.jsx
 *
 *
 *  @purpose: to render the contacts page
 *
 */

import React, { Component } from "react";
import { ContactNavbar } from "../components/dashboard/contactsNavbar";
import { ContactsTable } from "../components/dashboard/contacts/contact.table";

export class ContactsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // add the components states here inorder to fetch the users profile in json format
        };
    }

    render() {
        return (
            <div className="container-fluid rm-pm dashboard-content">
                <div className="row">
                    <div className="row">
                        {/* contact navigation bar */}

                        <div id="message-box-container"> </div>

                        <div className="table-contacts-container">
                            <ContactsTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
