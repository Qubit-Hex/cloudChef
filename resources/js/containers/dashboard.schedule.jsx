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



// main components of the schedule
import { SchedulePannel } from "../components/dashboard/schedule/schedule.schedule";
import { ScheduleDrop } from "../components/dashboard/schedule/schedule.dropShift";
import { SchedulePickup } from "../components/dashboard/schedule/schedule.pickupshift";


import FetchServiceProvider from "../lib/fetchServiceProvider";

export class SchedulePage extends Component {
    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
            date: date.toLocaleDateString(),
            user: '',
            // we will use this state inorder to get the schedule data from the server.
            // and pass it to our schedule component in the props.
            year: '',
            week: '',
            currentScheduleLabel: '',
            // we will use this state inorder to get the schedule data from the server.
            // and parse in the <select> element for user to view whatever past or present
            // schedule they want to view.
            schedulesAvailable: [],
        };
    }

    /**
     *  @method: pickupRequest
     *
     *  @description: This method is responsible for sending a pickup request to the API.
     *
     */

    pickupRequest() {
        // temp
        alert("Pickup request sent!");
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
            "accessToken": fetchService.getCookie('accessToken'),
        }

        fetchService.$get("/api/members/find", headers, (response) => {

            this.setState({user: response.username});

        });
    }

    /**
     *
     *  @method: fetchSchedules
     *
     *  @purpose: This method is responsible for fetching the schedule data from the server and return a promise.
     *            upon the return of said data
     *
     */

    async fetchSchedules(year = '', week = '') {
        let request = new FetchServiceProvider();

        let headers = {
            "Content-Type": "application/json",
            "accessToken": request.getCookie('accessToken'),
            'year': year,
            'week': week
        }

        const apiRoute = '/api/store/schedule/find';
        const response = await request.get(apiRoute, headers);

        return response;
    }


    /**
     *
     *  @method: updateScheduleState
     *
     *  @description: This method is responsible for updating the state of the schedule.
     *                this is done inorder to update the schedule when the user selects a different
     *                schedule from the dropdown.
     *
     *
     */

    updateScheduleState(e)
    {
        // loop though select to see what the user has selected
        let selectedSchedule = document.getElementById('select-schedule-date');

        // loop though the schedules available to find the schedule that the user has selected
        for (let i = 0; i < selectedSchedule.length; i++) {
            if (selectedSchedule[i].selected === true) {
            let year = selectedSchedule[i].getAttribute('data-year');
            let week = selectedSchedule[i].getAttribute('data-week');

            return this.setState({
                year: year,
                week: week,
            });

            }
        }
    }


    /**
     *  @method: componentDidMount
     *
     *  @description: This method is responsible for updating the state of the component.
     *
     *
    */

    componentDidMount(prevProps, prevState) {

             // we need to add this inorder to prevent a infinite loop when the component is mounted
             if (this.state.user === '') {
                this.getUsername();
            }

            // grab the schedule state of the current store that we are working with from the server.
            if (this.state.schedulesAvailable.length === 0) {
                this.fetchSchedules()
                    .then((response) => {
                        this.setState({schedulesAvailable: response.data});

                    }).catch((error) => {
                        return new Error('We could not fetch the schedules');
                    });
            }

            return;


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
        let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? -6 : 1) - date.getDay());
        let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day === 0 ? 0 : 7) - date.getDay());
        let startDateString = startDate.toLocaleDateString();
        let endDateString = endDate.toLocaleDateString();

        // validation check to see if the date is valid
        if (year === null || weekNumber === null || year === '' || weekNumber === '') {
            return 'No date selected';
        }

        return startDateString + " - " + endDateString;
    }


    render() {
        return (
            <div className="container-xl dashboard-content">
                {/**  container for sending modals to the user  */}

                <h2 className='ml-4'> <b>Schedule</b> <small className='sub-caption ' > Welcome (
               { this.state.user } ) <br /><span className='text-center'>View, edit, and drop shifts!</span> </small></h2>



                    {/* make a tile with add. edit, and delete buttons */}




                {/** containers for modals and notifcations here  */}
                <div id='notification-container' className='row'></div>
                <div id="modal-container" className="modal-container"></div>

                {/**  container for the schedule components   */}

                {/* refactor into an component that i CAN LOOP THOUGH  THE
                    THE SCHEDULE DATA AND RENDER IT */}

                <div className="row">   {/* row for the schedule components */}

                <div className="col">
                    <div className="col card fit-table">
                        <h2 className="header-subtitle text-center mt-4 ">
                          {" View your current schedule"}
                        </h2>

                        <img
                            src="/img/SVG/schedule_icon.svg"
                            alt="schedule icon"
                            width="300px"
                            height="300px"
                            className="mx-auto img-fluid"
                        />

                        <div className="schedule_pill">
                            {/* ADD SEARCH AND FILTER PARTS  */}

                                        <div className="form-group ml-4">

                                            <small className='text-muted text-center mb-4'>

                                                <b> Viewing Schedule of: { this.calculateDate(this.state.year, this.state.week) }</b>

                                            </small>

                                            {/** gonna transform this element into a functional componet one i have completed it */}
                                            <select  id='select-schedule-date' className="form-select">
                                                <option>Please Select a schedule to continue. </option>
                                                {this.state.schedulesAvailable.map((schedule) => {
                                                    // map the schedules available and display them in the dropdown
                                                    return (
                                                        <option className='text-bold' key={schedule.id} data-year={schedule.year} data-week={schedule.week}>
                                                                { 'Schedule #' + schedule.id } {this.calculateDate(schedule.year, schedule.week)}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            <button className="btn btn-message btn-sm mt-4"  onClick={
                                                (e) => {
                                                    this.updateScheduleState(e)
                                                }
                                            }>
                                                {" "}
                                                Choose{" "}
                                            </button>

                                    </div>
                                {/* RENDER THE SCHEDULE COMPONENT
                                    FIX: this is where the schedule is being rendered, WHEN U TRY TO RENDER A SCHEDULES
                                    COMPONENT, IT IS NOT BEING RENDERED. AND THE SCHEDULE DATA ISNT BEING FETCH PROPERLY
                                    FROM THE SERVER.
                                */}
                                 {
                                     <div id='schedule-container' className='row'>
                                            <SchedulePannel year={this.state.year} week={this.state.week} />
                                    </div>

                                }

                        </div>
                    </div>
                </div>
            </div>


            <div className='row card fit-table'>
                            <ScheduleDrop />
            </div>

            <div className="row card card fit-table">
                           <SchedulePickup />
            </div>

                </div>
        );
    }
}
