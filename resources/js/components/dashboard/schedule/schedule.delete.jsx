/**
 *
 *  @file: schedule.delete.jsx
 *
 *
 *  @purpose: This component is responsible for rendering the schedule page of deleting schedules into the system.
 *
 */



 import React from "react";
 import ReactDOM from "react-dom";
 import FetchServiceProvider from "../../../lib/fetchServiceProvider";
 import { TemplateModal } from "../recipe/core/template.modal";

 import { ScheduleEntries } from "./core/schedule.entries";



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

     function updateScheduleState(props) {
        // loop though select to see what the user has selected
        let selectedSchedule = document.getElementById("select-schedule-date");

        // loop though the schedules available to find the schedule that the user has selected
        for (let i = 0; i < selectedSchedule.length; i++) {
            if (selectedSchedule[i].selected === true) {
                let year = selectedSchedule[i].getAttribute("data-year");
                let week = selectedSchedule[i].getAttribute("data-week");

               return {
                  week: week,
                  year: year
               }
            }
        }
    }

    /**
     *
     *  @method: fetchSchedules
     *
     *  @purpose: This method is responsible for fetching the schedule data from the server and return a promise.
     *            upon the return of said data
     *
     */

       const fetchSchedules =  async (year = "", week = "") => {
        let request = new FetchServiceProvider();

        let headers = {
            "Content-Type": "application/json",
            accessToken: request.getCookie("accessToken"),
            year: year,
            week: week,
        };

        const apiRoute = "/api/store/schedule/find";
        const response = await request.get(apiRoute, headers);

        return response;
    }

    /**
     *
     *  @component: ScheduleDelete
     *
     *
     *  @purpose: This component is used to display the schedule of the user.
     */

export const ScheduleDelete  = (props) => {


    const [dates, setDates] = React.useState([]);
    const [year, setYear] = React.useState("");
    const [week, setWeek] = React.useState("");
    const [dateRange, setDateRange] = React.useState("");



    React.useEffect(() => {

        let date = updateScheduleState(props);
            fetchSchedules(date.year, date.week).then((response) => {
                // convert to array first.
                    let schedules = [];
                    for (let i = 0; i < response.data.length; i++) {
                        schedules.push(response.data[i]);
                    }
                    setDates(schedules);
            });
    }, []);

    // calculate the date
    const getDates = (year, weekNumber) => {

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

    return (
        <div className="row">

            <div className="col">
                <div className="col card fit-table">
                    <h2 className="header-subtitle text-center mt-4 ">
                        {" Please select a schedule to delete.  "}
                    </h2>

                    <img
                        src="/img/SVG/schedule_icon_alt.svg"
                        alt="schedule icon"
                        width="300px"
                        height="300px"
                        className="mx-auto img-fluid"
                    />
                    <div className="schedule_pill">
                        <div className="form-group ml-4">
                            <small className="text-muted text-center mb-4">
                                <b>
                                    Viewing Schedule of: {dateRange}
                                </b>
                            </small>

                            <select
                                id="select-schedule-date"
                                className="form-select"
                                >
                                <option>
                                    Please Select a schedule to continue.
                                </option>
                                {

                                    dates.map(
                                        (schedule) => {
                                            // map the schedules available and display them in the dropdown
                                            return (
                                                <option
                                                    className="text-bold"
                                                    key={schedule.id}
                                                    data-year={schedule.year}
                                                    data-week={schedule.week}
                                                    value={schedule.id}
                                                >
                                                    {"Schedule # " + schedule.id + " - " + getDates(schedule.year, schedule.week)}

                                                </option>
                                            );
                                        }
                                    )
                            }
                            </select>

                            <button
                                className="btn btn-message btn-sm mt-4"
                                onClick={(e) => {
                                    const selectElement = document.getElementById('select-schedule-date');
                                    // get the attribute of the selected schedule
                                    let scheduleRef = selectElement.options[selectElement.selectedIndex].value;

                                    let refWeek = selectElement.options[selectElement.selectedIndex].getAttribute("data-week");
                                    let reYear = selectElement.options[selectElement.selectedIndex].getAttribute("data-year");

                                    // set the state of the date to the selected schedule

                                    // pass the schedule Ref # to the next component inorder to activate the
                                    // delete schedule modal.
                                    setDateRange(getDates(reYear, refWeek));

                                    // now lets render the schedule Deelte modal and pass the schedule ref to it.

                                    //
                                    let container = document.getElementById('modal-container');

                                    ReactDOM.render(<TemplateModal title={" Please Confirm "} body={
                                        <div>
                                            <div className="row">
                                                <div className="col">
                                                    <h3 className="text-center">
                                                        {"Are you sure you want to delete this schedule?"}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className='form-group d-flex'>
                                                <button className="btn-danger m-2 btn-sm" onClick={(e) => {
                                                        // now lets render the schedule Deelte modal and pass the schedule ref to it.
                                                        //
                                                    }}> No </button>

                                                    <button className="btn-message m-2 btn-sm" onClick={(e) => {
                                                        // now lets render the schedule Deelte modal and pass the schedule ref to it.
                                                        //
                                                    }}> Yes </button>
                                                </div>

                                            </div>
                                        </div>

                                    } />, container)
                                }}>
                                    Choose
                            </button>
                        </div>
                            <div id="schedule-container" className="row">
                                {/** render our component here after that event occurs */}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
