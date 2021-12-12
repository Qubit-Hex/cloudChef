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
// import React Router

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// this stores our dashboard templkate and the dashboard componen....
import { DashboardNav } from "../components/dashboard/dashboardNav";


// store all the pages for our api calls here
import { ContactsPage } from "./dashboard.contacts";
import { SchedulePage } from "./dashboard.schedule";
import { MessagePage } from "./dashboard.message";




/**
 * 
 * @function: DashboardContainer
 * 
 * 
 * @purpose: to route the dashboard pages for the user! 
 * 
 * 
 */

export default function DashboardContainer(props) {


  // react hooks for fetch the page name

  return (
    <div className='content_container'>
      <DashboardNav />
{/* We are going to Route the Dashboard Sub Routes here for now might put this as a function in the route file later 
    to better orginize the code but for now it will stay :/ */}
    
      <Router>
        <Switch>
          <Route path='/dashboard/contacts/' component={ContactsPage} />
          <Route path='/dashboard/schedule/' component={ SchedulePage } />
          <Route path='/dashboard/messages/' component={ MessagePage } />
          
        </Switch>
      </Router>

      </div>
  );
}