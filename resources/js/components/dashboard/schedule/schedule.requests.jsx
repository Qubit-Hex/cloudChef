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
 *
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
 *  @function: DisplayScheduleRequests
 *
 *
 *  @purpose: this function is responsible for displaying the schedule requests for the given store
 *
 */

 const DisplayScheduleRequests = (props) => {

    const req = storeRequests();
    const [data, setData] = React.useState([]);

    // set the data to the data from the api
    React.useEffect(() => {
        // store requests
        req.then(response => {
            if (response.status === 200) {
                setData(response.data);
            }
        })
    }, [])


    const renderError = () => {

        return (
            <div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong>
                <p>Something went wrong. Please try again later.</p>
            </div>
        )
    }


    // lets pass our data onto our sorter inorder for us to work with the data more cleanly and easily
    // the easier the better no complex code.

    const sorter = (data) => {
        // first lets layout what we need to achieve with this function
        // first let check if drop shifts = 0 or 1 inorder for us to narrow down the map

        // our structure of our element
        const pickupShifts = data.pickup;
        const dropShifts = data.drop;
        const employees = data.employee;

        // function to retrive the employees name when provided with an employee id.
        const getEmployeeName = (id, employees) => {
            for (const employee in employees) {
                if (employees[employee].id === id) {
                    return employees[employee].first_name + ' ' + employees[employee].last_name;
                }
            }
        }


        // function to retrive the shift when provides with 4 parms
        // the shift id, the year, week, and day

        const getShift = (id, shiftData = data.schedule) => {
            for (const shift in shiftData) {
                if (shiftData[shift].shiftID === id) {

                    // now lets convert day, week, and year into a shift date
                    const shiftDate = new Date(shiftData[shift].year, shiftData[shift].week, shiftData[shift].day);
                    // now lets return the shift
                    return {
                        shiftID: shiftData[shift].shiftID,
                        shiftDate: shiftDate,
                    }
                }
            }
        }
        
        // get the shift id

        // loop through the drop shifts
        for (const shifts in dropShifts) {
            if (dropShifts[shifts].length === 0) {
                // if the length is 0 then we need to remove the element from the array
                dropShifts.splice(shifts, 1);
            }

            // check if the drop shifts approved is true or false
            if (dropShifts[shifts].approved === 1) {
                // if the approved is true then we need to remove the element from the array
                dropShifts.splice(shifts, 1);
            }
        }

        // next we need to check if the pickup shifts is 0 or 1 inorder for us to narrow down the map
        for (const shifts in pickupShifts) {
            if (pickupShifts[shifts].length === 0) {
                // if the length is 0 then we need to remove the element from the array
                pickupShifts.splice(shifts, 1);
            }

            // check if the drop shifts approved is true or false
            if (pickupShifts[shifts].approved === 1) {
                // if the approved is true then we need to remove the element from the array
                pickupShifts.splice(shifts, 1);
            }
        }


        // next lets loop though the dropped shifts


        let map = {};

        for (const shifts in dropShifts) {

            let final = {
                reason: dropShifts[shifts].reason,
                dateDropped: new Date(dropShifts[shifts].date_dropped * 1000),
                shiftID: dropShifts[shifts].employee_shift_id,
                employeeID: dropShifts[shifts].employee_id,
                employeeName: getEmployeeName(dropShifts[shifts].employee_id, employees),
                approved: dropShifts[shifts].approved,
                type: 'drop'
            }



            // now lets search pickup shifts for the employee
            for (const employee in pickupShifts) {
                // check for the employee id
                if (final.pickupEmployeeID === undefined) {
                    // set the employee id
                    final.pickupEmployeeID = pickupShifts[employee].employee_id;
                    // set the employee name
                    final.pickupEmployeeName = getEmployeeName(pickupShifts[employee].employee_id, employees);
                    final.pickupDate = new Date(pickupShifts[employee].date_picked_up * 1000);
                }
            }

            // check if the map has the key of the employee id
            if (map[dropShifts[shifts].employee_id] === undefined) {
                // if the map does not have the key of the employee id then we need to create it
                map[dropShifts[shifts].employee_id] = [];
            }

            // now we need to push the drop shift into the map
            map[dropShifts[shifts].employee_id].push(final);
        }



        console.log(data.schedule);


        return (
            <div className="schedule-requests">
                {/** put our logic here */}
            </div>
        )
    }

    // return our sorted data
    return sorter(data);
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

            <span className='text-center text-muted'> Accept and deny shift changes </span>
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
                                        Shift Dropped By
                                    </h5>
                                </th>
                                <th>
                                    <h5>
                                        Shift Picked up By
                                    </h5>
                                </th>
                                <th>
                                    <h5>
                                        Shift Date
                                    </h5>
                                </th>
                                <th>
                                    <h5> Reason </h5>
                                </th>
                                <th>
                                    <h5> Action </h5>
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
