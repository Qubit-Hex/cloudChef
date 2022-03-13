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

// main components of the schedule
import { AddSchedule } from "../components/dashboard/schedule/schedule.add";
import { ScheduleDrop } from "../components/dashboard/schedule/schedule.dropShift";
import { SchedulePickup } from "../components/dashboard/schedule/schedule.pickupshift";

import { ScheduleGridMenu } from "../components/dashboard/schedule/core/schedule.gridMenu";
import { DisplaySchedule } from "../components/dashboard/schedule/core/schedule.viewSchedule";
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

    /**
     *
     * @method: calculateDate
     *
     * @purpose: to calculate the date range with only the year and week number
     *
     */

    calculateDate(year, weekNumber) {
        let date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        let day = date.getDay();
        let startDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + (day === 0 ? -6 : 1) - date.getDay()
        );
        let endDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + (day === 0 ? 0 : 7) - date.getDay()
        );
        let startDateString = startDate.toLocaleDateString();
        let endDateString = endDate.toLocaleDateString();

        // validation check to see if the date is valid
        if (
            year === null ||
            weekNumber === null ||
            year === "" ||
            weekNumber === ""
        ) {
            return "No date selected";
        }

        return startDateString + " - " + endDateString;
    }

    render() {
        return (
            <div className="container-xl dashboard-content">
                <h2 className="ml-4">
                    <b style={{
                        fontSize: '1.5em'
                    }}>
                        Schedule
                    </b> <br/>

                            <span className="text-center" style={{
                                fontSize: '1em',
                         
                                fontWeight: '700',
                                marginLeft: '20px'
                            }}>
                                View, edit, and drop shifts!
                            </span>

                            <p style={{
                                marginLeft: '18em',
                            }}>
                            Welcome ({this.state.user} )
                            </p>
                </h2>

                <Router>
                    <Switch>
                        <Route path='/dashboard/schedule/add/'>
                            <AddSchedule />
                        </Route>
                        <Route path="/dashboard/schedule/view">
                            <DisplaySchedule />
                        </Route>
                        <Route path="/dashboard/schedule/drop/">
                            <ScheduleDrop />
                        </Route>
                        <Route path='/dashboard/schedule/pickup/'>
                            <SchedulePickup />
                        </Route>
                        <Route exact path="/dashboard/schedule/">
                            <ScheduleGridMenu />
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
