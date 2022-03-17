/**
 *
 *  @component AddSchedule
 *
 *
 *  @purpose: This component is used to add a new schedule to the database.
 *
 */



import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";

import { ScheduleEntries } from "./core/schedule.entries";

/**
 *
 *  @function: CreateStoreSchedule
 *
 *
 *  @purpose: This function will be used to create the store schedule
 *
 */

  const CreateStoreSchedule = (date) => {


        // perform the validation of the form
        function validation(date) {
            if (date === null || date === '') {
                alert('Please select a date');
                return false;
            }

            // ok that data is some sort of data let make sure that the data is the correct format
            // split the string into an array

            const dateSplit = date.split('-');

            // the first entry will be the year the second will be the week number

            const year = dateSplit[0];
            const weekNumber = dateSplit[1];
            // remove the first character from the week number beause its a 'W' but i just need the (int ) number
            const weekNumberInt = parseInt(weekNumber.substring(1));

            // return the year and week number in an object
            return {
                week: weekNumberInt,
                year: year
            }
            // return an object that contains that data year and the date week
        }

        // perform the request of our element
        function request(date) {
            const api = new FetchServiceProvider();
            const route = '/api/store/schedule/create/';


            const headers = {
                'Content-Type': 'application/json',
                'accessToken': api.getCookie('accessToken')

            }

            // the data that will be sent to the server via a post request
            const data = {
                'year': date.year,
                'week': date.week
            }
            return api.post(route, data, headers);
        }

        // first lets check the validation.
        if (validation(date) === false) {
            alert('Please select a date');
            return;
        }

        // now that our date has passed the validation we can request the data
        const parsedDate = validation(date);

        // return the promise for the user to work with it.
        return request(parsedDate);
  }



/**
 *
 *  @component :  AddSchedule
 *
 *
 *  @purpose : This component is used to add a new schedule to the database.
 *
 *
 */

export const AddSchedule = (props) => {

    return (
        <div className='container-fluid'>
        <div className="row">

        <div className="col">
            <div className="col card fit-table">
                <h2 className="header-subtitle text-center mt-4 ">
                    {"Add a new schedule"}
                </h2>

                <img
                    src="/img/SVG/user_status.svg"
                    alt="schedule icon"
                    width="300px"
                    height="300px"
                    className="mx-auto img-fluid"
                />
                <div className='col'>
                    {/** select a week date for creating the new schedule  */}
                    <div className="form-group ml-4 text-center">
                        <small className="text-muted text-center mt-3">
                            <b> Select a week date for creating a new schedule </b>
                        </small>
                        <input type='week' className="form-control mt-2 " id="select-schedule-date" />
                        <button className='btn btn-message mt-3 text-center w-25'  onClick={
                            (e) => {
                                // get the date from the input
                                const datePicker = document.getElementById('select-schedule-date');
                                // next lets call our dataPicker function
                                // inorder to validate the request and post the new schedule to the database
                                // first check the type is a promise ? or not

                                return CreateStoreSchedule(datePicker.value).then(response => {
                                    // here we are going to inject the schedule into the dom.
                                    const container = document.getElementById('schedule-container');

                                    if (response.status === 200) {
                                        // the server gives us the ok to inject
                                        // the schedule into the dom
                                        ReactDOM.render(<ScheduleEntries title={" Create a new schedule "} scheduleID={response.scheduleID}/>, container);
                                    } else{
                                        // trigger an error since our request has failed...
                                        alert('Error creating schedule');
                                    }
                                });
                            }
                        }>
                            {/** calender icon */}
                            <i className="fas fa-calendar-alt"></i>
                            Create Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id='schedule-container'></div>
</div>
    )
}
