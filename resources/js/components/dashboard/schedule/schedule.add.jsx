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
 *  @function : generateTableRows
 *
 *  @purpose: to generate the table rows
 *
 */

const generateTableRows = () => {

    const employeeRows = [];

    for (let i = 0; i < 7; i++) {
        employeeRows.push(

        <td key={i}>
            <div className='container'>

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
                        <input type='time' className='form-control mt-1' />
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
                        <input type='time' className='form-control mt-1' />
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
    </td>
       );
    }

    return employeeRows;
}




/**
 *
 * @component: Post Schedule
 *
 * @purpose: This component is used to add a new schedule to the database.
 *
 */

const PostSchedule = async (employeeID, ScheduleMap) => {

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
        const body = {
            employeeID: employeeID,
            schedule: MAP
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
        alert('Invalid Request');
        return false;
    }
}



/**
 *
 * @component: ScheduleTableAdd
 *
 *
 *  @purpose: This component is used to add a new schedule to the database.
 */

 const ScheduleTableAdd = (props) => {

    return (

    <div className='row'>
    {/** create table inorder to modify the schedule for the employees   */}
    <div className="col">
        <div className="col card fit-table">
            <h2 className="header-subtitle text-center mt-4 ">
                {"Create a new schedule"}
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
                                    <td> {/** pannel to hold the users photo / head icon */}
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
                                        // this will be used to generate the tables for creating the schedules
                                        generateTableRows()
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

                                                    return PostSchedule(btnNode, ScheduleMap).then(response => {
                                                        if (response.status === 200) {
                                                            alert('Schedule Updated');
                                                            let container = document.getElementById('response_wrapper');

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
                                                        } else {
                                                            alert('Error updating schedule');
                                                            let container = document.getElementById('response_wrapper');
                                                            ReactDOM.render(
                                                                <div>
                                                                    <div className="alert alert-danger" role="alert">
                                                                        <i className="fas fa-exclamation-circle"></i>
                                                                        <span>
                                                                            Error updating schedule
                                                                        </span>
                                                                    </div>
                                                                </div>,  container);
                                                        }
                                                    })
                                                }
                                            }>
                                                <i className="fas fa-check"></i>
                                                Add
                                            </button>
                                        </div>
                                        <div id='response_wrapper'></div>
                                    </td>
                                </tr>
                            )
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
</div>
)
}


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


    const [employees, setEmployees] = React.useState([]);


    React.useEffect(() => {
        getEmployees().then((response) => {
            setEmployees(response.data);
        });
    }, []);


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

                                console.log(datePicker);

                                // next lets call our dataPicker function
                                // inorder to validate the request and post the new schedule to the database

                                // first check the type is a promise ? or not
                                if (typeof CreateStoreSchedule(datePicker.value) === 'object') {
                                    return CreateStoreSchedule(datePicker.value).then(response => {
                                        console.log(response);
                                    });
                                }
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

</div>
    )
}
