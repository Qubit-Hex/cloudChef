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

import { ShiftRequestInterface } from "./modules/shiftRequestInterface";



// sub imports libs, components, and interfaces
import * as Notes from "../../../../base/notification";


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
        <tr className="alert alert-danger" role="alert">
            <td colSpan={5}>
                <img src='/img/SVG/empty_inbox.svg' alt='empty inbox' width='100px' height='100px' />
                <h5 className="text-center">
                    No Schedule Requests
                </h5>
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
                    <tr key={index} id={ "_tr_" + shift.shiftID }>
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

                                        SRI.denyRequest(shift.shiftID).then(response => {

                                            if (response.status === 'error') {
                                                // let re render the tr element with a fade
                                                let tr = document.getElementById("_tr_" + shift.shiftID);
                                                let notification = document.getElementById("notification-container");
                                                // remove the tr element
                                                tr.parentNode.removeChild(tr);
                                                // post the notification
                                                // show the notificATION
                                                notification.style.display = 'block';
                                                ReactDOM.render(<Notes.SuccessNotification   message="Something Went Wrong we were unable to drop the shift." />, notification);

                                            }
                                            // do the render if the success
                                            if (response.status === 'success') {
                                                // let re render the tr element with a fade
                                                let tr = document.getElementById("_tr_" + shift.shiftID);
                                                let notification = document.getElementById("notification-container");
                                                // remove the tr element
                                                tr.parentNode.removeChild(tr);
                                                // post the notification
                                                // show the notificATION
                                                notification.style.display = 'block';
                                                ReactDOM.render(<Notes.SuccessNotification   message="Thank you the shift has been successfully dropped." />, notification);
                                            }

                                            // check the tbody if it is empty ? if it is empty then render the error message
                                            if (document.getElementsByTagName('tbody')[0].childNodes.length === 0) {
                                                // render our error message
                                                ReactDOM.render(<RenderError />, document.getElementById('schedule-requests-table'));
                                            }
                                        })
                                    }
                                }> Deny </button>
                                <button className='btn btn-message m-2' onClick={
                                    (e) => {

                                        SRI.acceptRequest(shift.shiftID).then(response => {
                                            if (response.status === 'success') {
                                                // let re render the tr element with a fade
                                                let tr = document.getElementById("_tr_" + shift.shiftID);
                                                let notification = document.getElementById("notification-container");
                                                // remove the tr element
                                                tr.parentNode.removeChild(tr);
                                                // post the notification
                                                // show the notificATION
                                                notification.style.display = 'block';
                                                ReactDOM.render(<Notes.SuccessNotification   message="Thank you the shift has been successfully accepted." />, notification);
                                            }
                                            // if the response returns and error. 
                                             if (response.status === 'error') {

                                             }

                                            if (document.getElementsByTagName('tbody')[0].childNodes.length === 0) {
                                                // render our error message
                                                ReactDOM.render(<RenderError />, document.getElementById('schedule-requests-table'));
                                            }
                                        });
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
