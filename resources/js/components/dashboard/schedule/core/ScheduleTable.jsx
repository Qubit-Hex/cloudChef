/**
 *
 *  @file: ScheduleTable.jsx
 *
 *
 *  @purpose: inorder to render the schedule table for the required component
 *
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import moment from 'moment';
import { ModalAddShift } from "./Modal.addShift";
import { ModalEditShift } from "./Modal.editShift";
import { ModalDeleteShift } from "./Modal.deleteShift";
import * as Alerts from "../../../../base/notification";
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";


/***
 *
 *  @component: TableCell
 *
 *  @purpose: inorder to render the table cell for the required component
 *
 *  @props:  day, start_time, end_time, employeeID, scheduleID
 *
 *
 */

const TableCell = (props) => {

    const validateTime = (start_time, end_time, off) => {
        // convert military time to am or pm
        const start_time_am_pm = moment(start_time, 'HH:mm').format('h:mm A');
        const end_time_am_pm = moment(end_time, 'HH:mm').format('h:mm A');

        if (off === 0) {
            return start_time_am_pm + ' - ' + end_time_am_pm;
        } else {
            return "OFF";
        }
    }


    const currentShiftTime = validateTime(props.start_time, props.end_time, props.off);


    // is the shift modification turned off.
    if (props.viewOnly === true) {
        return (
            <td className="text-center" key={props.day}>
            <div className="row">
                <div className="text-center">
                    <b className="p-2" style={{
                        fontSize: '1rem',
                    }}>
                    {/** font awesome clock icon */}
                    <i className="fa fa-clock" aria-hidden="true"></i>
                     { currentShiftTime }
                    </b>
                    <hr />
                </div>
            </div>
        </td>
        );
    }


    return (
        <td className="text-center" key={props.day}>
        <div className="row">
            <div className="text-center">
                <b className="p-2">

                {/** we need to make these label reactive so when ever a value change these
                 *   labels will change as well.
                 *
                 */}
                {/** font awesome clock icon */}
                <i className="fa fa-clock" aria-hidden="true"></i>
                 { currentShiftTime }
                </b>
                <hr />
            </div>
        </div>

        <div className="row p-0 m-0">
            {/** calender icon */}
            <button
                className="text-center btn btn-outline-dark m-2 w-auto mx-auto"
                title="hide the controls for this shift"
                onClick={(e) => {
                    const controlsDiv =
                        e.currentTarget.parentElement.querySelector(
                            "._controls_"
                        );
                    // toggle controlsDiv
                    if (controlsDiv.classList.contains("d-none")) {
                        e.currentTarget.innerText = "Show";
                        controlsDiv.classList.remove("d-none");
                    } else {
                        e.currentTarget.innerText = "Hide";
                        controlsDiv.classList.add("d-none");
                    }
                }}
            >
                {" "}
                Hide{" "}
            </button>
            <div className="text-center d-flex _controls_">
                <button
                    className="btn btn-message m-2"
                    onClick={(e) => {
                        const container = document.getElementById("modal-container");
                        // scheduleID, employeeID, day
                        ReactDOM.render(<ModalAddShift day={props.day} employeeID={props.employeeID} scheduleID={props.scheduleID}/>, container);
                    }}
                >
                    Add
                </button>
                <button
                    className="btn btn-warning m-2"
                    onClick={(e) => {
                        const container = document.getElementById("modal-container");
                        ReactDOM.render(<ModalEditShift  current={currentShiftTime} day={props.day} employeeID={props.employeeID} scheduleID={props.scheduleID} />, container);
                    }}
                >
                    {" "}
                    Edit{" "}
                </button>
                <button
                    className="btn btn-danger m-2"
                    onClick={(e) => {
                        // show a messsage on wether or not the shift for the user was deleted successfully
                        const container =
                            document.getElementById("modal-container");
                        // add the delete modal to the system
                        ReactDOM.render(<ModalDeleteShift day={props.day} employeeID={props.employeeID} scheduleID={props.scheduleID} />, container);
                    }}
                >
                    {" "}
                    Delete{" "}
                </button>
            </div>
        </div>
    </td>
    )
}

/***
 *
 *
 *  @component: GenerateTableData
 *
 *  @purpose: This is responsible for rendering the schedule table for the required component
 *
 *
 *  props: scheduleID, employeeID
 *
 */

const GenerateTableData = (props) => {




    const [shiftsData, setShiftsData] = React.useState([]);
    const [error, setError] = React.useState(false);



    // return any shifts data if they is some for this shift.
    const request = async() => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/shifts/get';

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'employeeID': props.employeeID,
            'scheduleID': props.scheduleID
        };

        return  await api.get(route, headers);
    }

    // if there is no shifts data for this shift.
    // just render as normal.
    React.useEffect(() => {
            request().then((response) => {
                if (response.status === 'success') {
                    // render the table with a base of two
                    // option if we got shifts or if we didnt get any shifts
                    if (response.shifts === true) {
                        // we got shifts from the server
                        setShiftsData(response.data);
                        // preform long polling requests to update the table
                        // when the user is editing their schedule.

                        // if the load increases for the site use a socket server instead.
                        // this will allow the user to edit their schedule without
                        // having to refresh the page.
                        //
                        if (props.viewOnly === false || props.viewOnly === undefined) {
                            const longPolling = setInterval(() => {
                                request().then((response) => {
                                    if (response.status === 'success') {
                                        // render the table with a base of two
                                        // option if we got shifts or if we didnt get any shifts
                                        if (response.shifts === true) {
                                            // we got shifts from the server
                                            setShiftsData(response.data);
                                        } else {
                                            // we didnt get any shifts from the server
                                            // clear the interval
                                            clearInterval(longPolling);
                                        }
                                    } else {
                                        // we got an error from the server
                                        // clear the interval
                                        clearInterval(longPolling);
                                    }
                                });
                            }, 10000);
                        }
                    }
                        // we didnt get any shifts from the server
                        // just render o
                } else {
                    // render the error here
                    setError(true);
                }
            })
    }, []);


    // if there is an error render the error message
    const RenderTableError = (props) => {
        return (
            <div className='text-center'>
                <div className='text-center m-4'>
                    {/** add a font awesome icon */}
                    <h3>
                        <i className='fa fa-check-circle text-danger'></i>
                        <span style={{
                            fontWeight: 600,
                        }}>No Schedule Found</span>
                    </h3>
                </div>
            </div>
        )
    }

    //  error boundry
    if (error) {

        // this is temporary we will render a better looking errorr message later.
        return (<RenderTableError />);
    }

    if (shiftsData.length === 0) {
        // new schedule since no shifts were returned
        const tableData = [];

        for (let i = 0; i < 7; i++) {
            tableData.push(
                <TableCell
                    key={i}
                    day={i}
                    start_time={null}
                    end_time={null}
                    employeeID={props.employeeID}
                    scheduleID={props.scheduleID}
                    viewOnly={props.viewOnly}
                />
            );
        }
        // retunr the table data
            return tableData.map((data) => {
                return data;
            });
    } else {
        // render the table with the shifts data since the shifts were returned
        const tableData = [];

        for (let i = 0; i < 7; i++) {
            if (shiftsData[i] === undefined) {
                tableData.push(
                    <TableCell
                        key={i}
                        day={i}
                        start_time={null}
                        end_time={null}
                        employeeID={props.employeeID}
                        scheduleID={props.scheduleID}
                        viewOnly={props.viewOnly}
                    />
                );
            } else {
                tableData.push(
                    <TableCell
                        key={i}
                        day={i}
                        start_time={shiftsData[i].start_time}
                        end_time={shiftsData[i].end_time}
                        off={shiftsData[i].off}
                        employeeID={props.employeeID}
                        scheduleID={props.scheduleID}
                        viewOnly={props.viewOnly}
                    />
                );
            }
        }

        return tableData.map((data) => {
            return data;
        });
    }


};

/**
 *
 *  @component: ScheduleTable
 *
 *  @purpose: inorder to render active schedules of the organization inorder to edit or modify
 *            the schedule based on the date sent to the component
 *
 *
 *  @props: week, year, scheduleID, date
 */

export const ScheduleTable = (props) => {

    const [employees, setEmployees] = React.useState([]);

    const request = () => {
        const api = new FetchServiceProvider();
        const route = "/api/store/employees/";
        const headers = {
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };

        // next request to the api to get the employees
        return api.get(route, headers);
    };

    // get all the employees of the said store
    React.useEffect(() => {
        request().then((response) => {
            if (response.status === "success") {
                setEmployees(response.eData);
            }
        });
    }, []);

    /**
     *
     *   @function: renderEmployees
     *
     *
     *   @purpose: inorder to render the employees of the store
     *
     */

    function renderEmployees(data) {
        return Object.keys(data).map((employee, index) => {
            return (
                <tr key={index}>
                    <td>
                        <span>
                            <i className="fa fa-user-tie fa-3x"></i> <br />
                            <br />
                            <b>
                                {" "}
                                {data[employee].first_name +
                                    " " +
                                    data[employee].last_name}{" "}
                            </b>
                        </span>
                    </td>
                    <GenerateTableData
                        employeeID={data[employee].id}
                        scheduleID={props.scheduleID}
                        viewOnly={props.viewOnly}
                    />
                </tr>
            );
        });
    }

    return (
        <table className="schedule-table">
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                {/** start the employee map here */}
                {renderEmployees(employees)}
            </tbody>
        </table>
    );
};
