/**
 * 
 *  file: dashboard.container.jsx
 * 
 * 
 *  purpose:  container for the dashboard component
 * 
 *  
 */


import * as d3 from "d3";

import React, { Component } from 'react';
import { ProfileCard } from "../components/dashboard/profile-card";
import { ContactNavbar} from "../components/dashboard/contactsNavbar";


export default function DashboardContainer(props) {

  return (
    <div className='content_container'>
      <nav className="navbar dashboard-nav-color navbar-expand-lg navbar-transparent ml-auto mt-auto">
        <h3 className='dashboard-nav-title'>
          {/** store icon font awesome  */}
          <i className="fas fa-store mr-2"></i>
          Store / <small className='dashboard-nav-title-sub'>example restaurant </small> </h3>


        <div className='nav'>


          <div className='nav-items'>
            <img src='/img/logo/Cloud Chef-logos_white.png' width='100px' height='100px' alt='cloud chef logo' className='img-fluid' />

          </div>

          <a className='nav-link'>
            <i className="fas fa-home"></i>
            <span className='nav-link-text'>Home</span>
          </a>

          <a className='nav-link'>


            <i class="fas fa-calendar-week"></i>
            <span className='nav-link-text'>
              Schedule
            </span>
          </a>

          <a className='nav-link'>
            {/** font awesome chat icon */}
            <i class="fas fa-comments"></i>
            <span className='nav-link-text'>
              Messages
            </span>
          </a>

          <a className='nav-link'>
            <i class="fas fa-user-tie"></i>
            <span className='nav-link-text'>
              Contacts
            </span>
          </a>


          <a className='nav-link'>
            {/** font awesome gear icon */}
            <i class="fas fa-cog"></i>
            <span className='nav-link-text'>
              Settings
            </span>
          </a>

          <a className='nav-link'>
            {/** font awesome power button */}
            <i class="fas fa-power-off"></i>
            <span className='nav-link-text'>
              Logout
            </span>
          </a>
        </div>


      </nav>

      {/** create a nav bar for search employee and filtering by dept */}

      <div className='container-fluid rm-pm dashboard-content'>




        <div className='row'>
          <h1 className='header-title'> Contacts <small className='sub-caption ' > Welcome ( john doe) </small></h1>
          
         <ContactNavbar />


          <div class="col">
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
            image='/img/face.jpg' 
            address='123 lorne st'
            location='my example, province'
            phone='306-555-555-555'
            email='example@GMAIL.COM'
            name='HAVY'
            role='MANAGER'
            />
           
          </div>

          <div className='col'>

            <ProfileCard user='Heather Smith' 
            image='/img/face2.jpg' 
            address='123 lorne st'
            location='my example, province'
            phone='306-555-555-555'
            email='example@GMAIL.COM'
            name='HAVY'
            role='HOSTESS'
            />
           
          </div>
        </div>

        <div className='row'>
          <div className='col'>
          <ProfileCard user='Amanda Smith' 
            image='/img/face3.jpg' 
            address='123 lorne st'
            location='my example, province'
            phone='306-555-555-555'
            email='example@GMAIL.COM'
            name='HAVY'
            role='COOK'
            />
          </div>



          <div className='col'>
          <ProfileCard user='Adam Smith'
            image='/img/face4.jpg'
            address='123 lorne st'
            location='my example, province'
            phone='306-555-555-555'
            email='oliver@gmail.com'
            name='havery'
            role='Kitchen Manager' />
          </div>

      </div>
      </div>

    </div>

  );
}