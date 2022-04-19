/**
 *
 *  file: dashboard.container.jsx
 *
 *
 *  purpose:  container for the dashboard component
 *
 *
 */

import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import FetchServiceProvider from "../lib/fetchServiceProvider";
import {DashboardNav} from "../components/dashboard/dashboardNav";
import {ContactsPage} from "./dashboard.contacts";
import {SchedulePage} from "./dashboard.schedule";
import {DashboardRecipies} from "./dashboard.recipies";
import {EmployeesPage} from "./dashboard.employees";
import {DashboardHome} from "./dashboard.home";
import {DashboardSettings} from "../components/dashboard/settings/settings";

/**
 *
 *  @component: UnAuthDashboard
 *
 *  @description: render the 401 page
 *
 */

const UnauthorizedPage = () => {
    return (
        <div>
            <h1 className="header-subttile text-center">401</h1>
            <h2 className="header-title text-center">
                You are not authorized to view this page
            </h2>
            <img src="/img/authentication.svg" alt="authentication"/>
        </div>
    );
};

/**
 *
 * @function: DashboardContainer
 *
 *
 * @purpose: to route the dashboard pages for the user!
 *
 *
 */

export const DashboardContainer = (props) => { // the state of our component.
    const [authenticated, setAuthenticated] = React.useState(false);

    // request the user's authentication status
    const requests = () => {
        const api = new FetchServiceProvider();
        const route = "/api/auth/verify";

        const header = {
            "Content-Type": "application/json",
            "accessToken": api.getCookie("accessToken")
        };

        return api.get(route, header);
    };

    React.useEffect(() => {

        if (authenticated === false) {
            requests().then(response => {
                if (response.status === 200) {
                    setAuthenticated(true);
                }
            });
        }
    });

    // return the unauthenticated page if the user is not authenticated
    if (authenticated === false) {
        return <UnauthorizedPage/>;
    }
        return (
            <div className="content_container">
                <DashboardNav/>

                <Router>
                    <Switch>
                        <Route path="/dashboard/recipie/"
                            component={DashboardRecipies}/>
                        <Route path="/dashboard/contacts/"
                            component={ContactsPage}/>
                        <Route path="/dashboard/schedule/"
                            component={SchedulePage}/>
                        <Route path="/dashboard/employees/"
                            component={EmployeesPage}/>
                        <Route path="/dashboard/settings/"
                            component={DashboardSettings}/>
                        <Route path="/dashboard/logout/">
                            {/** logout the user   */} </Route>
                        <Route path="/dashboard/"
                            component={DashboardHome}/>
                    </Switch>
                </Router>
            </div>
        );
}
