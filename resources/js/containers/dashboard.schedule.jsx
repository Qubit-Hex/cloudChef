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

               <h3 className='header-subtitle text-center'> Please select an option </h3>
               <small className='text-muted text-center'> Help us make a better schedule for you. </small>



                    {/* make a tile with add. edit, and delete buttons */}




                {/** containers for modals and notifcations here  */}
                <div id='notification-container' className='row'></div>
                <div id="modal-container" className="modal-container"></div>

                {/**  container for the schedule components   */}

                {/* refactor into an component that i CAN LOOP THOUGH  THE THE SCHEDULE DATA AND RENDER IT */}

                    {/** this may be a container now but not too sure yet on how to impliment it */}

                <div className='row'></div>

                {/** add some quick access navigation buttons  */}
                <div className='row'>
                    {/** add three buttons one for adding a schedule, editing a current schedule and  on for viewing current schedule */}
                    <div className='col-md-4'>
                        {/** add schedule tile */}
                        <div className='tile'>
                            <div className='tile-content'>
                                <img src='/img/SVG/time_flatline.svg' width={300} height={300} />
                                <h2 className='text-center m-2 header-subtitle'> Add Schedule </h2>
                                <small className='text-center text-muted'> Add a new schedule to your store</small>
                                    <div className='tile-icon btn-message text-center'>
                                        <i className='fa fa-plus'></i>
                                        <span> Create Schedule</span>
                                    </div>
                            </div>
                        </div>
                    </div>

                    {/** view schedule button */}
                    <div className='col-md-4'>
                        <div className='tile'>
                            <div className='tile-content'>
                                <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                                <h2 className='text-center m-2 header-subtitle'> View Schedule </h2>
                                <small className='text-center text-muted'> View the current schedule for your store</small>
                                <div className='tile-icon btn-message text-center'>
                                    <i className='fa fa-eye'></i>
                                    <span> View Schedule</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** edit a schedule  */}
                    <div className='col-md-4'>
                        <div className='tile'>
                            <div className='tile-content'>
                                <img src='/img/SVG/schedule_event.svg' width={300} height={300} />
                                <h2 className='text-center m-2 header-subtitle'> Edit Schedule </h2>
                                <small className='text-center text-muted'> Edit the current schedule for your store</small>
                                <div className='tile-icon btn-message text-center'>
                                    <i className='fa fa-edit'></i>
                                    <span> Edit Schedule</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** delete a schedule  */}

                    <div className='col-md-4'>
                        <div className='tile'>
                            <div className='tile-content'>
                                <img src='/img/errors/empty_schedule.svg' width={300} height={300} />
                                <h2 className='text-center m-2 header-subtitle'> Delete Schedule </h2>
                                <small className='text-center text-muted'> Delete the current schedule for your store</small>
                                <div className='tile-icon btn-message text-center'>
                                    <i className='fa fa-trash'></i>
                                    <span> Delete Schedule</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='col-md-4'>
                        {/* add a labour cost tile */}
                        <div className='tile'>
                            <div className='tile-content'>
                                <img src='/img/SVG/money.svg' width={300} height={300} />
                                <h2 className='text-center m-2 header-subtitle'> Labour Cost </h2>
                                <small className='text-center text-muted'> View your store's labour cost </small>
                                <div className='tile-icon btn-message text-center'>
                                    <i className='fa fa-plus'></i>
                                    <span> VLabour Cost</span>
                                </div>
                            </div>
                        </div>


                    </div>
                    
                <div className='col-md-4'>
                    <div className='tile'>
                        <div className='tile-content'>
                            <img src='/img/SVG/employee_card.svg' width={300} height={300} />
                            <h2 className='text-center m-2 header-subtitle'> Schedule Requests </h2>
                            <small className='text-center text-muted'> View employees schedule requests </small>
                            <div className='tile-icon btn-message text-center'>
                                <i className='fa fa-eye'></i>
                                <span> Schedule Requests</span>
                            </div>
                        </div>
                    </div>
                </div>

                </div>

                <div className='row'>
                    <div className='card'>
                        <div className='card-header' style={{
                            backgroundColor: 'transparent'
                        }}>

                            <h4 className='card-title'>
                                {/** calender icon  */}
                                <i className="fa fa-calendar-alt" aria-hidden="true"></i>
                                Add Schedule
                            </h4>
                        </div>
                        <div className='card-body'>
                            <div className='row text-center'>
                                    <img src='/img/SVG/time_flatline.svg' width={300} height={300} />
                                <div className='col'>
                                     {/* section to add a schedule to the current store  */}
                                     <div className='row'>
                                         <div className='form-group'>
                                             <label htmlFor="select-schedule-date" style={{
                                                    fontSize: '1.2em',
                                                    fontWeight: 'bold',
                                                    margin: '10px'
                                             }}>Select a week </label>
                                               <input type='week' id='select-schedule-date' className='form-control w-50 mx-auto'/>
                                         </div>
                                         <div className='form-group mt-4 '>
                                             <button className='btn btn-message w-50' onClick={this.updateScheduleState}>
                                                    {/** add calender button icon  */}
                                                    <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
                                                    Add
                                             </button>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                <div className="row">   {/* row for the schedule components */}

                {/* add a section for the ability to add a new schedule */}


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
