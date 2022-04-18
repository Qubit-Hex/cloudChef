/**
 *
 *  file: dashboard.container.jsx
 *
 *
 *  purpose:  container for the dashboard component
 *
 *
 */

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
import { DashboardRecipies } from "./dashboard.recipies";
import { EmployeesPage } from "./dashboard.employees";
import { DashboardHome } from "./dashboard.home";
import { DashboardSettings } from "../components/dashboard/settings/settings";

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
    // might change this as a later time inorder to handle the error
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
   *
   *  @method: componentDidUpdate
   *
   *  @purpose: to check if the user is authenticated or not...
   *
   */

  componentDidUpdate(prevProps, prevState) {
    // flags inorder to check if the user is authenticated or not
    if (!this.state.isAuthenticated !== prevState.isAuthenticated) {
      // if the user is authenticated then we will get their information
        return React.render(<div> Not Authenticated </div>, document.getElementById('root'))
    }

    if (!this.state.isAuthenticated) {
        // get the user information and store the information inside the application state
        return React.render(<div> Not Authenticated </div>, document.getElementById('root'));
      }
  }

  render() {
    return (
      <div className='content_container'>
        <DashboardNav  />

        <Router>
          <Switch>
            <Route path='/dashboard/recipie/' component={DashboardRecipies} />
            <Route path='/dashboard/contacts/' component={ContactsPage} />
            <Route path='/dashboard/schedule/' component={SchedulePage} />
            <Route path='/dashboard/employees/' component={EmployeesPage} />
            <Route path='/dashboard/settings/' component={DashboardSettings} />
            <Route path='/dashboard/logout/'>
                {/** logout the user   */}
            </Route>
            <Route path='/dashboard/' component={DashboardHome} />
          </Switch>
        </Router>

      </div>
    );

  }

}
