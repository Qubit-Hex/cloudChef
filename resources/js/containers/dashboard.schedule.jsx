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
import { ScheduleLabour } from "../components/dashboard/schedule/schedule.labour";



export const  SchedulePage = (props) => {

        return (
            <div className="container dashboard-content mx-auto">

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
                        <Route path='/dashboard/schedule/labour/'>
                            <ScheduleLabour />
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
