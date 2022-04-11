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
import { DisplayScheduleRequests } from "./core/schedule.displayScheduleRequest";


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
                        <tbody id='schedule-requests-table'>
                            <DisplayScheduleRequests />
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
