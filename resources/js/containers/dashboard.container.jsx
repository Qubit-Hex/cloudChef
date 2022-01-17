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

import FetchServiceProvider from "../lib/fetchServiceProvider";

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

export default class DashboardContainer extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isAuthenticated: false,
      // some information about the user
      user: {
        name: '',
        userID: '',
      },
    };

    this.cookieValue = this.parseCookieByName('accessToken');
    this.auth = this.checkAuthentication(this.cookieValue);
  }

  /**'
   *
   *
   * @method: parseCookieByName
   *
   * @returns string
   *
   *
   */

  parseCookieByName = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
 *
 * @method: checkAuthentication
 *
 *
 * @returns  boolen
 *
 */

  checkAuthentication = (cookieValue) => {


    const API_checkToken = (cookieValue) => {

      let fetchServiceProvider = new FetchServiceProvider();

      /// set the token to the fetch service provider

      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "bearer": cookieValue,
      }

      // send the request to the server to check if the user is authenticated
     return fetchServiceProvider.$get('/api/auth/verify', headers, (response) => {
         if (response.auth === true) {
           this.setState({ isAuthenticated: true });
         } else {
            this.setState({ isAuthenticated: false });
         }
      });
    }

    const delayTime = 1000;

    async function didJobComplete() {
      return new Promise(resolve => {
          resolve(API_checkToken(cookieValue));
      });
    }

    return didJobComplete();
  }

  /**
   *   @method: getUserInformation
   *
   *
   *  @purpose: to get the user information from the server and store it in the application state
   */

  getUserInformation = () => {

    // ILL need to get the user information from the server and store it in the application state
    // ILL IMPLIMENT THIS LATER
    // BUG HUNTING RIGHT NOW.... BECAUSE THE GROUPS ISNT FULFILLING THE REQUIREMENTS
  }




  /**
   *
   *  @method: componentDidUpdate
   *
   *  @purpose: to check if the user is authenticated or not...
   *
   */

  componentDidUpdate(prevProps, prevState) {

    if (this.state.isAuthenticated !== prevState.isAuthenticated) {
      // if the user is authenticated then we will get their information
      if (this.state.isAuthenticated === true) {
        // get the user information and store the information inside the application state
        this.getUserInformation();
      } else {
        // if the user is not authenticated then we will redirect them to the login page
        // re render a blank screen

        return React.render(<div> Not Authenticated </div>, document.getElementById('root'));
      }
    } else {
        return React.render(<div> Not Authenticated </div>, document.getElementById('root'));
    }

  }


  render() {
    return (
      <div className='content_container'>
        <DashboardNav  />
        {/* We are going to Route the Dashboard Sub Routes here for now might put this as a function in the route file later
      to better orginize the code but for now it will stay :/ */}

        <Router>
          <Switch>
            <Route path='/dashboard/contacts/' component={ContactsPage} />
            <Route path='/dashboard/schedule/' component={SchedulePage} />
            <Route path='/dashboard/messages/' component={MessagePage} />

          </Switch>
        </Router>

      </div>
    );

  }

}
