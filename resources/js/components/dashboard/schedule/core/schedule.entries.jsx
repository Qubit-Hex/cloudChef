/**
 *
 *  @file: schedule.entries.jsx
 *
 *
 *  @purpose: This file is responsible for displaying the schedule of the store inorder to enter the
 *            time employees of the 'said' store are scheduled to work.
 *
 */



import { resolve } from "path-browserify";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";


/**
 *
 *  @function: getEmployees
 *
 *  @inorder to get the employees from the database
 */

 const getEmployees = async () => {

    const request = new FetchServiceProvider();
    const route = '/api/store/employees/';

    let headers = {
        "Content-Type": "application/json",
        accessToken: request.getCookie("accessToken"),
    };

    const response = await request.get(route, headers);
    return response;
}

/**
 *
 *  @function: getStoreSchedule
 *
 *  @purpose: This function is responsible for getting the schedules of a store based on the store schedule ID
 *
 *
 */
    const getStoreSchedule =  async (scheduleId) => {

        // first lets check that our schedule id and employee id are not empty

        if (scheduleId === '' || scheduleId === null || scheduleId === undefined) {
            return false;
        }

        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/show';

        const headers = {
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
            scheduleID: scheduleId
        };

        return api.get(route, headers);
    }



/**
 *  @function : generateTableRows
 *
 *  @purpose: to generate the table rows
 *
 */

 const GenerateTableRows = (props) => {

    // map the employees data via employee id
    const mapSchedule = (schedule) => {
        let map = {};
        for (let i = 0; i < schedule.length; i++) {
            if (map[schedule[i].employeeID] === undefined) {
                map[schedule[i].employeeID] = [];
                // push or value
                map[schedule[i].employeeID].push(schedule[i]);
            } else {
                map[schedule[i].employeeID].push(schedule[i]);
            }

        }
        return JSON.stringify(map);
    }


    const generateRows = (schedule, employeeID) => {


        const formatInt = (int) => {
            // format a date hh::ss

            if (int < 10) {
                return `0${int}:00`;
            } else {
                return `${int}:00`;
            }
        }


        // FORM OUT OBJECT
        let map = JSON.parse(schedule);

        const formatTime = (time) => {
            // take a number and covert it to either am or pm
            // the number input is a int 0- 24

            if (time < 12) {
                if (time > 9) {
                    return "0" + time + ":00" + "AM";
                } else {
                    return time + ":00" + "AM";
                }
            }
            // our conversion.
            let tn = time - 12;

            if (tn < 12) {
                return "0" + tn + ":00" + "PM";
            } else {
                return tn + ":00" + "PM"
            }
        }

        //  generate time format
        const timeFormat = (time) => {
            if (time > 12) {
                return time + ":00:00";
            }

            return "0" + time + ":00:00";
        }

        const isChecked = (state) => {
            if (state === 1) {
                return 'true';
            }
                return 'false';
        }



        let employeeRows = [];

        for (let i = 0; i < 7; i++) {
            // we need to perform some validation on the data returned from the server

            try {



                if (map[employeeID][i] !== undefined) {
                    employeeRows.push(

                        <td key={i}>
                            <div className='container'>

                            <div className='row m-0'>
                                {/** employee start time */}
                                <div className='row m-0'>

                                    <div className='form-group'>
                                        <small className='text-muted'>
                                            <b>
                                                Start Time {  formatTime(map[employeeID][i].start_time) }
                                            </b>
                                        </small>
                                        {/** 12 hour format time  */}
                                        <input type='time' className='form-control mt-1 w-100' defaultValue={timeFormat(map[employeeID][i].start_time)}  />
                                    </div>
                                </div>
                                {/** employee end time */}
                                <div className='row m-0'>
                                    <div className='form-group'>
                                        <small className='text-muted'>
                                            <b>
                                                End Time {  formatTime(map[employeeID][i].end_time) }
                                            </b>
                                        </small>
                                        <input type='time' className='form-control mt-1' defaultValue={timeFormat(map[employeeID][i].end_time)} />
                                    </div>
                                </div>

                                {/** employee off */}
                                <div className='row m-0'>
                                    <div className='form-group'>
                                        <small className='text-muted'>
                                            <b>
                                                Off { map[employeeID][i].is_off_day === 1 ? "OFF" : "" }
                                            </b>
                                        </small>
                                        <input type='checkbox' className='m-2'  onClick={
                                            (e) => {
                                                // get the parent parent container
                                                // this is hacky but it works might change it to something else later..
                                                const parent = e.target.parentNode.parentNode.parentNode;

                                                const checkbox = e.target;

                                                // check if the check box is checks
                                                if (checkbox.checked) {
                                                    // if it is checked then add the class
                                                    let inputsDate = parent.querySelectorAll('input[type="time"]');
                                                        // disable the inputs
                                                        inputsDate.forEach(input => {
                                                            input.disabled = true;
                                                        }
                                                    );
                                                } else {
                                                    // if it is not checked then remove the class
                                                    let inputsDate = parent.querySelectorAll('input[type="time"]');
                                                        // enable the inputs
                                                        inputsDate.forEach(input => {
                                                            input.disabled = false;
                                                        }
                                                    );
                                                }
                                            }
                                        }  />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </td>);
                }

            } catch (e) {

                // push the default form.
                employeeRows.push(

                    <td key={i}>
                        <div className='container w-80'>

                        <div className='row'>
                            {/** employee start time */}
                            <div className='row'>
                                <div className='form-group'>
                                    <small className='text-muted'>
                                        <b>
                                            Start Time
                                        </b>
                                    </small>
                                    {/** 12 hour format time  */}
                                    <input type='time' className='form-control mt-1'  />
                                </div>
                            </div>
                            {/** employee end time */}
                            <div className='row'>
                                <div className='form-group'>
                                    <small className='text-muted'>
                                        <b>
                                            End Time
                                        </b>
                                    </small>
                                    <input type='time' className='form-control mt-1'  />
                                </div>
                            </div>

                            {/** employee off */}
                            <div className='row'>
                                <div className='form-group'>
                                    <small className='text-muted'>
                                        <b>
                                            Off
                                        </b>
                                    </small>
                                    <input type='checkbox' className='m-2' onClick={
                                        (e) => {
                                            // get the parent parent container
                                            // this is hacky but it works might change it to something else later..
                                            const parent = e.target.parentNode.parentNode.parentNode;

                                            const checkbox = e.target;

                                            // check if the check box is checks
                                            if (checkbox.checked) {
                                                // if it is checked then add the class
                                                let inputsDate = parent.querySelectorAll('input[type="time"]');
                                                    // disable the inputs
                                                    inputsDate.forEach(input => {
                                                        input.disabled = true;
                                                    }
                                                );
                                            } else {
                                                // if it is not checked then remove the class
                                                let inputsDate = parent.querySelectorAll('input[type="time"]');
                                                    // enable the inputs
                                                    inputsDate.forEach(input => {
                                                        input.disabled = false;
                                                    }
                                                );
                                            }
                                        }
                                    } />
                                </div>
                            </div>
                        </div>

                    </div>
                </td>);


            }
        }

        return employeeRows;
    }

    // RETURN THE TABLE ROWS
    return generateRows(mapSchedule(props.schedule), props.employeeID);
}


/**
 *
 * @component: Post Schedule
 *
 * @purpose: This component is used to add a new schedule to the database.
 *
 */

const PostSchedule = async (employeeID, ScheduleMap, scheduleID) => {

    // validation function
    const validation = (MAP) => {
        // check if the map is empty
        if (Object.keys(MAP).length === 0) {
            return false;
        }
        // check if the map is valid
        for (let key in MAP) {
           // check if it is employees off day ?

                if (MAP[key].off !== true) {
                    // check if the value is empty
                    if (MAP[key].start === '' || MAP[key].end === '') {
                        return false;
                    }
                }
        }

        return true;
    }


    /// closure to preform our api call
    const request = (MAP) => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/add';

        console.log(MAP);

        const body = {
            employeeID: employeeID,
            schedule: MAP,
            scheduleID: scheduleID
        };

        const headers = {
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };

        return api.post(route, body, headers);
    }
    // if the request is valid then post the schedule
    if (validation(ScheduleMap) === true) {
        return request(ScheduleMap);
    } else {
        // if the request is invalid then return false
        return false;
    }
}



/**
 *
 * @component: ScheduleEntries
 *
 *
 *  @purpose: This component is used to add / edit a schedule to the database.
 *
 *
 *  @props: {
 *     scheduleID: <INT>,
 *     TITLE: <STRING>
 *     TYPE: "EDIT" || "ADD" (default: "ADD") optional
 *
 */

export const ScheduleEntries = (props) => {


    const [employees, setEmployees] = React.useState([]);
    const [schedule, setSchedule] = React.useState([]);


    React.useEffect(() => {

           return  getEmployees().then((response) => {
                setEmployees(response.data);
                setTimeout( () => null, 1000);
            }).then(getStoreSchedule(props.scheduleID).then((response) => {
                setSchedule(response.data);
            }));

        }, []);




    return (

    <div className='row'>
    {/** create table inorder to modify the schedule for the employees   */}
    <div className="col fit-table">
        <div className="col">
            <h2 className="header-subtitle text-center mt-4 ">
                { props.title }
            </h2>

            <div className='mx-auto'>
                <img src='/img/SVG/personal_data_outline.svg' width={'300px'} height={'300px'} alt='schedule icon' className='mx-auto img-fluid' />
                <small className='text-muted text-center mt-3'> <b> Fill out chart below and submit schedule its that easy! </b> </small>
            </div>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            <b>
                                Employee
                            </b>
                        </th>
                        <th>
                            <b>
                                Monday
                            </b>
                        </th>
                        <th>
                            <b>
                                Tuesday
                            </b>
                        </th>
                        <th>
                            <b>
                                Wednesday
                            </b>
                        </th>
                        <th>
                            <b>
                                Thursday
                            </b>
                        </th>
                        <th>
                            <b>
                                Friday
                            </b>
                        </th>
                        <th>
                            <b>
                                Saturday
                            </b>
                        </th>
                        <th>
                            <b>
                                Sunday
                            </b>
                        </th>
                        <th>
                            <b> Action</b>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        {/** map the employees and display them in the table */}
                        {
                        employees.map((employee) => {
                            return (
                                <tr key={employee.id}>
                                    <td > {/** pannel to hold the users photo / head icon */}
                                        {/** employee tie icon  */}
                                        <div className='row m-1'>
                                            <i className='fa fa-user-tie fa-2x' />
                                        </div>
                                        <p>
                                            {employee.name }
                                        </p>
                                        <p style={{
                                            fontWeight: 'bold'
                                        }}>
                                            {/** department */}
                                            {employee.department}
                                        </p>
                                    </td>
                                    {
                                        /** map the schedule and display them in the table */
                                        <GenerateTableRows schedule={schedule} employeeID={employee.id} />
                                    }
                                    <td>
                                        <div className='form-group d-flex'>
                                            <button className='btn btn-message m-2' value={employee.id} onClick={
                                                (e) => {
                                                    /// get the parent container
                                                    const btnNode = e.target.value;
                                                    const parent = e.target.parentNode.parentNode.parentNode.querySelectorAll('td');


                                                    // closure to convert the 24 time into 12 time

                                                    const ScheduleMap = {
                                                        'Monday': {
                                                            'start': parent[1].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[1].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[1].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Tuesday': {
                                                            'start': parent[2].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[2].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[2].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Wednesday': {
                                                            'start': parent[3].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[3].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[3].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Thursday': {
                                                            'start': parent[4].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[4].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[4].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Friday': {
                                                            'start': parent[5].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[5].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[5].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Saturday': {
                                                            'start': parent[6].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[6].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[6].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        },

                                                        'Sunday': {
                                                            'start': parent[7].querySelectorAll('input[type="time"]')[0].value,
                                                            'end': parent[7].querySelectorAll('input[type="time"]')[1].value,
                                                            'off': parent[7].querySelectorAll('input[type="checkbox"]')[0].checked ? true : false
                                                        }
                                                    }

                                                    // return the schedule map to our function
                                                    // that will validate the rwquest and post the new information
                                                    // to the database

                                                    return PostSchedule(btnNode, ScheduleMap, props.scheduleID).then(response => {

                                                        // create a new div

                                                        const div = document.createElement('div');
                                                        // output the this div as a last element in the current td element
                                                        const container = parent[8].appendChild(div);


                                                        const activateAnimation = (container) => {
                                                            container.classList.add('slideInFade');

                                                            // wait 5 seconds first
                                                            setTimeout( () => {
                                                                container.classList.remove('slideInFade');
                                                                container.classList.add('slideOutFade');

                                                                setTimeout( () => {
                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                }, 2000)
                                                            }, 3500);



                                                        }


                                                        if (response.status === 200) {


                                                            ReactDOM.render(
                                                                <div>
                                                                    {/**  add a check box and message to the user */}
                                                                    <div className='alert alert-success' role='alert'>
                                                                        <i className="fas fa-check-circle"></i>
                                                                        <span>
                                                                            Schedule Updated
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                , container);

                                                                activateAnimation(container);


                                                        } else {
                                                            ReactDOM.render(
                                                                <div>
                                                                    <div className="alert alert-danger" role="alert">
                                                                        <i className="fas fa-exclamation-circle"></i>
                                                                        <span>
                                                                            Error updating schedule
                                                                        </span>
                                                                    </div>
                                                                </div>,  container)

                                                                activateAnimation(container);


                                                        }
                                                    })
                                                }
                                            }>
                                                <i className="fas fa-check"></i>
                                                Update
                                            </button>
                                        </div>
                                        <div id='response_wrapper'></div>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>
        </div>
    </div>
</div>
)
}


// default props for our component.

ScheduleEntries.defaultProps = {
    type: 'ADD'
};
