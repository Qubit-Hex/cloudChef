/*
 *
 *
 *  @file: dashboard.schedule.jsx
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 *
 *  @author: Oliver Shwaba -> Qubit-hEx
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// schedule components
import { ScheduleGridMenu } from "../components/dashboard/schedule/schedule.gridMenu";
import FetchServiceProvider from "../lib/fetchServiceProvider";





export class SchedulePage extends Component {
    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
            date: date.toLocaleDateString(),
            user: ""
        };
    }

    /**
     *
     * @method: getUsername - gets the username of the user
     *
     * @purpose: to get the username of the user
     *
     */

    getUsername() {
        const fetchService = new FetchServiceProvider();

        let headers = {
            "Content-Type": "application/json",
            accessToken: fetchService.getCookie("accessToken"),
        };

        fetchService.$get("/api/members/find", headers, (response) => {
            this.setState({ user: response.username });
        });
    }



    render() {
        return (
            <div className="container-xl dashboard-content">
                <h2 className="ml-4">
                    <b style={{
                        fontSize: '1.25em'
                    }}>
                        Schedule
                    </b> <br/>

                            <span className="text-center" style={{
                                fontSize: '0.75em',

                                fontWeight: '500',
                                marginLeft: '20px'
                            }}>
                                View, edit, and drop shifts!
                            </span>

                            <p style={{
                                marginLeft: '18em',
                            }}>
                            </p>
                </h2>

                <Router>
                    <Switch>
                        <Route path='/dashboard/schedule/add/'>
                        </Route>
                        <Route path="/dashboard/schedule/view">
                        </Route>
                        <Route path="/dashboard/schedule/edit/">
                        </Route>
                        <Route path="/dashboard/schedule/delete">
                        </Route>
                        <Route path="/dashboard/schedule/drop/">
                        </Route>
                        <Route path='/dashboard/schedule/pickup/'>
                        </Route>
                        <Route path='/dashboard/schedule/labour/'>
                        </Route>
                        <Route exact path="/dashboard/schedule/">
                            <ScheduleGridMenu />
                        </Route>

                        <Route path='/dashboard/schedule/request/'>
                        </Route>
                    </Switch>
                </Router>

                {/** containers for modals and notifcations here  */}
                <div id="notification-container" className="row"></div>
                <div id="modal-container" className="modal-container"></div>
            </div>
        );
    }
}
