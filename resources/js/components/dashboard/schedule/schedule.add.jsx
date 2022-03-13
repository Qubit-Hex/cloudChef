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

        <td>
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
                        <input type='time' className='form-control' />
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
                        <input type='time' className='form-control' />
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
                        <input type='checkbox' className='m-2' />
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
            console.log(response);
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
                                console.log(document.getElementById('select-schedule-date').value);
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

    <div className='row'>
        {/** create table inorder to modify the schedule for the employees   */}
        <div className="col">
            <div className="col card fit-table">
                <h2 className="header-subtitle text-center mt-4 ">
                    {"Modify your current schedule"}
                </h2>

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
                                            generateTableRows()
                                        }
                                    </tr>
                                )
                        })
                    }
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</div>
    )
}
