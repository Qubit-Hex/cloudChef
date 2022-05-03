/**
 *
 *  @file: addSchedule.jsx
 *
 *
 * @description: This component is responsible for rendering the schedule of the organization.
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";

// sub imports
import * as Alerts from  "../../../base/notification";
import { ModalAddShift } from "./core/Modal.addShift";
import { ScheduleTable } from "./core/ScheduleTable";


export const AddScheduleEntry = (props) => {

    // this is the request that will create a new schedule or return an existing schedule from the database
    const request = (date, week, year, month) => {

        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/add/';

        const headers = {
            "Content-Type": "application/json",
            'accessToken': api.getCookie('accessToken'),
        }

        // sent the essiential data to the server
        const data = {
            'date': date,
            'year': year,
            'week': week,
            'month': month,
        }

        return api.post(route, data, headers);
    }

    // get the week number of the date
    const convertToWeekNumber = (currentDate) => {
        const date = new Date(currentDate);
        const yearStart = new Date(date.getFullYear(), 0, 1);
        const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    }

    // get the year of the date
    const getYearNumber = (currentDate) => {
       // get the year from the full date
         const date = new Date(currentDate);
            const year = date.getFullYear();
            return year;
    }


    const getMonthNumber = (currentDate) => {
        const date = new Date(currentDate);
        const monthNo = date.getMonth();
        return monthNo;
    }



    return (
        <div className="container-fluid mt-4">

            <div className="row">
                <h2 className='header-subtitle text-center'>Add Schedule</h2>
                <img src='/img/SVG/schedule_icon.svg' width={250} height={250} />
            </div>


            <div className='row'>

                <div className='col-md-6 mx-auto'>
                    <h3 className='text-center header-subtitle'> Please Select a week. </h3>
                    <div className='form-group'>
                        <label htmlFor='date'>Date</label>
                        <input type="date" className="form-control mt-2" id="date" placeholder="Date" />
                    </div>

                    <div className='form-group mt-2'>
                        <button className="btn btn-message"  onClick={
                            async (e) => {
                                const container = document.getElementById('schedule-table-container');
                                const date = document.getElementById('date').value;
                                const year = getYearNumber(date);
                                const week = convertToWeekNumber(date);
                                const month = getMonthNumber(date) + 1;

                                // now lets send the information to the server
                                return request(date, week, year, month).then(response => {
                                    if (response.status === 'success') {
                                        // now lets render the schedule table and return our group id to the component
                                        // destory container
                                        ReactDOM.unmountComponentAtNode(container);
                                        ReactDOM.render(<ScheduleTable scheduleID={response.schedule.id}/>, container);
                                    } else {
                                        // render the error message
                                        const alertContainer = document.getElementById('notification-container');
                                        ReactDOM.render(<Alerts.ErrorNotification message={response.message}/>, alertContainer);
                                        // get the timeout
                                        setTimeout(() => {
                                            // unmount the component after the timeout
                                            ReactDOM.unmountComponentAtNode(container);
                                        }, 3000);
                                    }
                                });

                            }
                        }>
                            <i className="far fa-calendar-alt"></i>
                            Create Schedule
                        </button>
                        <hr />
                    </div>
                </div>

            </div>

        {/** this is the container inorder to render the schedule table  */}
            <div className="row schedule_pill" id='schedule-table-container'>

            </div>
        </div>
    );
}
