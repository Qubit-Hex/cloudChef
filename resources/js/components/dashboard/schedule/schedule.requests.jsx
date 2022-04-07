/**
 *
 *   @file: schedule.requests.jsx
 *
 *  @purpose : this file is responsible for making the schedule requests for the given store
 *
 */




import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { ScheduleDrop } from "./schedule.dropShift";
import { SchedulePickup } from "./schedule.pickupshift";


/**
 *
 *  @function: ScheduleRequests
 *
 *  @purpose: this function is responsible for making the schedule requests for the given store
 */

const storeRequests = () => {
    const api = new FetchServiceProvider();
    const route = '/api/store/schedule/requests/';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accessToken': api.getCookie('accessToken')
    };

    return api.get(route, headers);
}



/**
 *
 *  @function: getEmployeeInfo
 *
 *
 *  @purpose: this function is responsible for getting the employee information
 *
 */

  const getEmployeeInfo = (id) => {
      const api = new FetchServiceProvider();
      const route = '/api/store/employees/';


      const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'employeeID': id
      }

      return api.get(route, headers);
  }

/**
 *
 *  @function: DisplayScheduleRequests
 *
 *
 *  @purpose: this function is responsible for displaying the schedule requests for the given store
 *
 */

 const DisplayScheduleRequests = (props) => {

    const req = storeRequests();
    const [data, setData] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [employeeID, setEmployeeID] = React.useState('');


    // set the data to the data from the api
    React.useEffect(() => {
        // store requests
        req.then(response => {
            if (response.status === 200) {
                setData(response.data);
            }
        })
        // get the employees for the store
        getEmployeeInfo().then(response => {
            if (response.status === 'success') {
                setEmployees(response.data);
            }
        });
    }, [])

    // this function is resposible for getting the employee id and grabbing the employee information and setting it to the table we are
    // displaying to the user.

    const getEmployee = (id) => {
        // get the employee information based on the id number
        const employee = employees.find(employee => employee.id === id);

        return new Object(employee);
    }

    // this function is responsible for displaying the table with the schedule information
    const DisplayEmployeeData = (data) => {
        // if the data is empty then display a message to the user
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan="5">
                        <h3 style={{ fontWeight: 700}}>No Schedule Requests</h3>
                    </td>
                </tr>
            )
        } else {
         // here we are going to render the table with the schedule information
           return data.map((item, index) => {

                let fetchEmployee = getEmployee(item.employee_id);

                let convertTime = (time) => {
                    return new Date(time * 1000).toLocaleDateString('en-US')
                }

                return (
                    <tr key={index}>
                        <td>{fetchEmployee.name}</td>
                        <td> { convertTime(item.date_picked_up) } </td>
                        <td></td>
                        <td>
                            <div className='form-control d-flex'>
                                <button className='btn btn-danger m-1'> Deny</button>
                                <button className='btn btn-message m-1'> Accept</button>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    }

        return ( DisplayEmployeeData(data))
 }


/**
 *
 *  @function: ScheduleRequests
 *
 *  @purpose: this function is responsible for making the schedule requests for the given store
 *
 */

export const ScheduleRequests = (props) => {
    return (

        <div className="col">
        <div className="col card fit-table">
            <h2 className="header-subtitle text-center mt-4 ">
                {"Weekly Schedule Requests"}
            </h2>

            <img
                src="/img/SVG/schedule_event.svg"
                alt="schedule icon"
                width="300px"
                height="300px"
                className="mx-auto img-fluid"
            />

            <div className='row schedule_pill'>
                {/** schedule request table for accepting or denying the requests on the page  */}
                <div className="col">
                    <h3 className="header-subtitle text-center mt-4">
                        {"Current Schedule Requests"}
                    </h3>
                    <br />

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <h5>
                                        {"Requested By"}
                                    </h5>
                                </th>
                                <th>
                                    <h5>
                                        {"Requested Date"}
                                    </h5>
                                </th>
                                <th>
                                    <h5>
                                        {"Requested Shift"}
                                    </h5>
                                </th>
                                <th>
                                    <h5>
                                        {"Action"}
                                    </h5>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                <DisplayScheduleRequests />
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row schedule_pill">
                <ScheduleDrop />
            </div>

            <div className='row schedule_pill'>
                <SchedulePickup />
            </div>
        </div>
        </div>
    )
}
