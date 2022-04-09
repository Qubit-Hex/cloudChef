/**
 *
 *   @file: schedule.displayScheduleRequest.jsx
 *
 *   @purpose: This component is responsible for displaying the schedule requests
 *
 */

import React from "react";
import ReactDOM from 'react-dom';
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";

import {ShiftRequestInterface } from "./modules/shiftRequestInterface";


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
 * @function: renderError
 *
 * @purpose: this function is responsible for rendering the error message if no data is present
 *
 */

    const RenderError = (props) => {

    return (
        <tr className="alert alert-danger" colSpan={5} role="alert">
            <td>
                <strong>Oh snap!</strong>
                {/** add our error image here inorder to show that no data was returned from the server. */}
                <p>Something went wrong. Please try again later.</p>
            </td>
        </tr>
    )
}

/**
 *
 *  @function: DisplayScheduleRequests
 *
 *
 *  @purpose: this function is responsible for displaying the schedule requests for the given store
 *
 */

 export const DisplayScheduleRequests = (props) => {

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
    // call the interface for interacting with the shift requests data

        const SRI = new ShiftRequestInterface(data);
        let map = SRI.mapShiftRequests();

        // check is our data map empty or not
       if (map === false) {
            return <RenderError />
     }

        // now lets loop though the pickup shifts
        let tableNods = [];
        // push the data inorder our array inorder to prepare it for the front end render.
        for (const shifts in map)
        {
            tableNods.push(map[shifts]);
        }

        // generate the table data for the user.
        let tbody =  tableNods.map((employee, index) => {
            // map through the employee
            return employee.map((shift, index) => {

                console.log(shift);

                return (
                    <tr key={index}>
                        <td> { shift.employeeName } </td>
                        <td>  { shift.pickupEmployeeName }</td>
                        <td>
                            <span>
                                { shift.shiftTime.shiftDate }
                            </span>

                            {/** create a notification box showing the start time and the end time
                             *   of said shift.
                             */}
                            <div className="notification-box m-1">
                                <p className='m-2 role-badge badge badge-success card-text-sub-text  bold'> { shift.shiftTime.shiftTime } </p>
                                <p className='m-2 role-badge badge badge-success card-text-sub-text  bold'> { shift.shiftTime.shiftEndTime } </p>
                            </div>
                        </td>
                        <td>  {  shift.reason }</td>
                        <td>
                            <div className='form-group d-flex'>
                                <button className='btn-danger m-2' onClick={
                                    (e) => {
                                        // send the deny request to the server.
                                        let RequestEndPoint = SRI.denyRequest(shift.shiftID);
                                        RequestEndPoint.denyRequest();
                                    }
                                }> Deny </button>
                                <button className='btn btn-message m-2' onClick={
                                    (e) => {
                                        // send the accept request to the server.
                                       let RequestEndPoint = SRI.acceptRequest(shift.shiftID);
                                        /// send our request and wait for a response from the server
                                       RequestEndPoint.acceptRequest(shift.shiftID);

                                    }
                                }> Accept</button>
                            </div>
                        </td>
                    </tr>
                )
            });
        });

        // return our view.
        return ( tbody );
 }
