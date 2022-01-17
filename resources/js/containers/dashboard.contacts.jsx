/**
 *
 *  @file: dashboard.contacts.jsx
 *
 *
 *  @purpose: to render the contacts page
 *
 */




import React, { Component } from 'react';
import { ProfileCard } from "../components/dashboard/profile-card";
import { ContactNavbar} from "../components/dashboard/contactsNavbar";


export class ContactsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // add the components states here inorder to fetch the users profile in json format
        };
    }

    render() {
        return (

      <div className='container-fluid rm-pm dashboard-content'>




      <div className='row'>
        <h2 className='ml-4'> <b>Contacts</b> <small className='sub-caption ' > Welcome ( john doe) </small></h2>

       <ContactNavbar />


        <div className="row">
          {/* contact navigation bar */}

          {/**
           *
           *  @component: ProfileCard
           *
           *  @purpose: inorder to render the profile card component for users in the database
           *
           */}


        <div id='message-box-container'> </div>
        <ProfileCard user='Chad Micheal'
          image='/img/profiles/male_user.svg'
          address='123 lorne st'
          location='my example, province'
          phone='306-555-555-555'
          email='example@GMAIL.COM'
          name='HAVY'
          role='MANAGER'
          />
        </div>

        <div className='row'>
        <ProfileCard user='Adam Smith'
          image='/img/profiles/male_user.svg'
          address='123 lorne st'
          location='my example, province'
          phone='306-555-555-555'
          email='oliver@gmail.com'
          name='havery'
          role='Kitchen Manager' />
        </div>


      </div>


      </div>

            );
        }

    }
