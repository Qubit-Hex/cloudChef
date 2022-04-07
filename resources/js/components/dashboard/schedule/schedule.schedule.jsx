/*
 *
 *
 *  @file:  Schedule.Schedule.jsx
 *
 *
 *  @purpose: This component is the main component for the schedule.
 *
 *
 *  @responsibilities:
 *                       - Renders the schedule.
 *                       - It get the schedule data from the server.
 *                       - and checks permissions on each request to see weather we want to show the user schedule or the admin schedule.
 *
 *
 *
 */


import React, { Children, useState } from "react";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";


/**
 *  @todo: in the future we will need to add the ability to edit the schedule.
 *         i also need to writes some tests for this component. inorder to make sure that the component works as expected.
 */


/**
 *
 *  @function: getStoreSchedule
 *
 *
 *  @purpose: this is inorder to get the schedule for the store returning a promise containing our schedule
 *            data for use to work with in other functions.
 *
 */

const getStoreSchedule = async (cookie, year, week) => {
    const headers = {
        "Content-Type": "application/json",
        accessToken: cookie,
        week: week,
        year: year
    };

    const route = "/api/store/schedule/get";

    const api = new FetchServiceProvider();

    const request =  api.get(route, headers);

    return await request;
};


/***
 *
 *  @function: getEmployeeSchedule
 *
 *  @purpose: This function is inorder to get the schedule for the employee returning a promise containing our schedule
 *
 */

const getEmployeeInfo = async(employeeID) => {
    const api = new FetchServiceProvider();
    const headers = {
        "Content-Type": "application/json",
        accessToken: api.getCookie("accessToken")
    };

    const route = "/api/store/employee/get/" + employeeID + "/";
    const $request = await api.get(route, headers);

    return $request;

}

/**
 *
 * @Component: RenderSchedule
 *
 * @purpose: inorder to render the schedule we need to get the schedule data from the server.
 *          we need to check the permissions to see if we want to show the user schedule or the admin schedule.
 */

const RenderSchedule = (props) => {

    let employees = props.employees;
    let schedule = props.storeSchedule;

    schedule = schedule.sort((a, b) => {
        return a.employeeID - b.employeeID;
    });

    // map the schedule by employeeID
    let scheduleByEmployee = {};

    schedule.forEach(function(item) {
        if (!scheduleByEmployee[item.employeeID]) {
            scheduleByEmployee[item.employeeID] = [];
        }
        scheduleByEmployee[item.employeeID].push(item);
    });

    if (schedule.length === 0 ) {
        // display a message to the user that there is no schedule for the week.
        return (
            <tr>
                <td colSpan={9}>
                    <div className="alert">
                        <img src='/img/errors/empty_schedule.svg' alt="no schedule"  width={200} height={200} className='img-fluid mx-auto d-block'/>
                        <br />
                        <strong className='text-center'>No Schedule
                            <i className="far fa-calendar-times" style={{
                                fontSize: '1.25em',
                                marginLeft: '5px',
                                color: '#ff0000'
                            }}></i>
                        </strong>
                            <br/>
                        <small className='text-muted text-center'> Please select an schedule <br/>

                        </small>
                        {/** font awesome error icon */}

                    </div>
                </td>
            </tr>);
    }


    /**
     * @function: parseTimes
     *
     * @purpose: inorder to parse the times we need to get the start and end time from the schedule.
     *
     */
    const parseTimes = (start, end) => {
        // parse the time based on 12 hour clock
        start > 12 ? start = start - 12 + ":00" + " PM" : start = start + ":00" + " AM";
        end > 12 ? end = end - 12 + ":00" + " PM" : end = end + ":00" + " AM";
        return start + " - " + end;
    }


    return employees.map((employee, index) => {
        return (
            <tr key={index}>
                <td>
                {

                    Object.keys(employee).map((key, index) => {
                        // run through the employee object and return the employee name.
                        if (index === 1) {
                            return (<div key={index}>
                                <div className="col">
                                <img
                                    src={ employee['url'] }
                                    className="profile-img-sm"
                                    alt="user photo"
                                />
                            </div>

                            <br />

                            <div className="col">
                                <span> { employee['name'] }</span>
                            </div>

                            <div className="col">
                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                    { employee['department'] }
                                </span>
                            </div>
                        </div>);
                         }
                    })
                }
                </td>

                {/** render the schedule here  */}
                {
                    Object.keys(scheduleByEmployee).map((key, index) => {
                        // run through the employee only once
                        // ok there is a bug here, we need to fix this.
                        // were if only table in the db isn't set from employee it will break. the table.
                        // add some sort of check to check the lengths of the schedule and the employee id.

                        if (index === 0) {
                            return  scheduleByEmployee[key].map((item, index) => {
                                if (item.is_off_day === 1) {
                                    return (
                                        <td key={index} className="off-day">
                                        <span className="role-danger badge badge-danger card-text-sub-text  bold">
                                            {" "}
                                            OFF{" "}
                                        </span>
                                        </td>
                                    );
                                    return "OFF";
                                } else if (item.is_open === 0) {
                                    return (
                                        <td key={index} className="closed-day">
                                        <span className="role-na badge badge-danger card-text-sub-text bold">
                                            {" UNAVAILABLE "}
                                        </span>
                                        </td>
                                    )
                                }

                                else {
                                    // this is temporary. we will be changing to float values inorder to get the hours + the minutes.
                                    // of the schedule time.
                                    return (
                                        <td key={index} className="open-day">
                                        <span className="role-badge badge badge-success card-text-sub-text  bold">
                                           { /** covert time into am or pm based on starr time and endtime  */}
                                            { parseTimes(item.start_time, item.end_time) }
                                        </span>
                                        </td>
                                    );
                                }
                            });
                        }
                    })
                }

                {/** calculate total hours for each user every week and display it */}
                {
                    Object.keys(scheduleByEmployee).map((key, index) => {
                        // calculate the total hours for each user.
                        if (index === 0) {
                            let totalHours = 0;
                            scheduleByEmployee[key].forEach((item) => {
                                if (item.is_off_day === 0) {
                                    totalHours += item.end_time - item.start_time;
                                }
                            });
                            return (
                                <td key={index} className="total-hours">
                                <span className="role-badge badge badge-success card-text-sub-text  bold">
                                    {" "}
                                    {totalHours}{" "}
                                </span>
                                </td>
                            );
                        }
                    })
                }
            </tr>
        )
    })
}

/**

 *  @function: SchedulePannel
 *
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 */

export const SchedulePannel = (props) => {


    // get the schedule from the server.
    const [storeSchedule, setStoreSchedule] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [year, setYear] = React.useState("");
    const [week, setWeek] = React.useState("");
    const api  = new FetchServiceProvider();
    const schedule = getStoreSchedule(api.getCookie("accessToken"), props.year, props.week);


    // set the state of the year and month. if state is empty ? set the current year and month.
    React.useEffect(() => {

        if (props.year === undefined || props.week === undefined) {
            // clear the state. and exit
            setStoreSchedule([]);
            setEmployees([]);
            return; // exit
        }
        if (props.year !== undefined && props.week !== undefined) {
            // set the year to the props of current year..
            if (props.year !== year || props.week !== week) {
                setYear(props.year);
                setWeek(props.week);
            }
        }
    }, [props.year, props.week]);

    // check if the props is set?
if (props.year !== null && props.week !== null) {
        if (props.year.length !== 0 && props.week.length !== 0) {
            // run our network requests here
            // check if the props has been changed and if so run the network request.
            if (props.year !== year || props.week !== week) {
                schedule.then(response => {
                    if (response.status === 'success') {
                        setStoreSchedule(response.data);
                    } else {
                        // did our network request fail?
                        if (response.status === 'fail') {
                            // clear the schedule and display a message to the user.
                            setStoreSchedule([]);
                        }
                    }
            });
        }
    }
} else {
    // clear the state of the schedule.
    if (props.year === null || props.week === null) {
        if (storeSchedule.length !== 0) {
            setStoreSchedule([]);
        }
    }
}

    // sort the storeSchedule and fetch the user Information to render the table
    const sortedStoreSchedule = storeSchedule.sort((a, b) => {
        return a.employeeID - b.employeeID;
    });

    // remove all duplicate employeeID's
    const uniqueEmployeeID = [...new Set(sortedStoreSchedule.map(item => item.employeeID))];

    // run are network requests here
    const employeeInfo = [];

    // grab the employee information
    for (let i = 0; i < uniqueEmployeeID.length; i++) {
        const employee = getEmployeeInfo(uniqueEmployeeID[i]);
        employeeInfo.push(employee);
    }

    // wait for all the requests to finish
    async function waitForAllRequests() {

        let allEmployeeInfo = [];

        for (let i = 0; i < uniqueEmployeeID.length; i++) {
            // get the next work requests
            const nextRequest = employeeInfo[i];
            // wait for the next request to finish
            await nextRequest.then(response => {
                return allEmployeeInfo.push(response);
            })
        }
        return allEmployeeInfo;
    }

    // wait for all the requests to finish set the state and now lets render it the table.
    waitForAllRequests().then(response => {
        if (response.length !== 0) {
            // check the setEmployees state was already set
            if (employees.length === 0) {
                    setEmployees(response);
            }
        }
        return false;
    })

    return (
        <table className="table mt-4">
            <thead>
                <tr>
                    <th scope="col"> Name </th>

                    <th scope="col"> Monday </th>
                    <th scope="col"> Tuesday </th>
                    <th scope="col"> Wednesday </th>
                    <th scope="col"> Thursday </th>
                    <th scope="col"> Friday </th>
                    <th scope="col"> Saturday </th>
                    <th scope="col"> Sunday </th>
                    <th scope="col"> Total Hours </th>
                </tr>
            </thead>
            <tbody>
                <RenderSchedule employees={employees} storeSchedule={storeSchedule}/>
            </tbody>
        </table>
    );
};
