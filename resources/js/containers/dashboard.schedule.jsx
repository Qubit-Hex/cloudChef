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
import { AddScheduleEntry } from "../components/dashboard/schedule/schedule.add.entry";
import { ViewSchedules } from "../components/dashboard/schedule/schedule.view";
import { EditSchedules } from "../components/dashboard/schedule/schedule.edit";
import { DeleteSchedules } from "../components/dashboard/schedule/schedule.delete";

export const  SchedulePage = (props) => {

        return (
            <div className="container dashboard-content mx-auto">
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
                            <AddScheduleEntry />
                        </Route>
                        <Route path="/dashboard/schedule/view">
                            <ViewSchedules />
                        </Route>
                        <Route path="/dashboard/schedule/edit/">
                            <EditSchedules />
                        </Route>
                        <Route path="/dashboard/schedule/delete">
                            <DeleteSchedules />
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
