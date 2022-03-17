/**
 *
 *  @component EditSchedule
 *
 *
 *  @purpose: This component is used to edit schedule to the database.
 *
 */



 import React from "react";
 import ReactDOM from "react-dom";
 import FetchServiceProvider from "../../../lib/fetchServiceProvider";

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
     *  @component: ScheduleEdit
     *
     *
     *  @purpose: This component is used to display the schedule of the user.
     */

export const ScheduleEdit = (props) => {


    const [dates, setDates] = React.useState([]);
    const [year, setYear] = React.useState("");
    const [week, setWeek] = React.useState("");



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
                        {" Please select a schedule to edit "}
                    </h2>

                    <img
                        src="/img/SVG/schedule_event.svg"
                        alt="schedule icon"
                        width="300px"
                        height="300px"
                        className="mx-auto img-fluid"
                    />
                    <div className="schedule_pill">
                        <div className="form-group ml-4">
                            <small className="text-muted text-center mb-4">
                                <b>
                                    Viewing Schedule of:
                                    {
                                        getDates( year, week)
                                    }
                                </b>
                            </small>

                            <select
                                id="select-schedule-date"
                                className="form-select"
                                >
                                <option>
                                    Please Select a schedule to continue.{" "}
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

                                    const container = document.getElementById("schedule-container");
                                    return ReactDOM.render(<ScheduleEntries title={" Edit the current schedule. "} scheduleID={scheduleRef} />, container);

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
