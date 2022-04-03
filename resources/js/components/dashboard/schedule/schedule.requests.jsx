/**
 *
 *   @file: schedule.requests.jsx
 *
 *  @purpose : this file is responsible for making the schedule requests for the given store
 *
 */




import react from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { ScheduleDrop } from "./schedule.dropShift";
import { SchedulePickup } from "./schedule.pickupshift";

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
                {/** schedule requerst table for accepting or denying the requests on the page  */}
                <div className="col">
                    <h3 className="header-subtitle text-center mt-4">
                        {"Current Schedule Requests"}
                    </h3>
                    <br />

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Requested By"}
                                    </h5>
                                </th>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Requested Date"}
                                    </h5>
                                </th>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Requested Time"}
                                    </h5>
                                </th>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Requested Shift"}
                                    </h5>
                                </th>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Requested Type"}
                                    </h5>
                                </th>
                                <th>
                                    <h5 className="text-center text-muted">
                                        {"Accept/Deny"}
                                    </h5>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"John Doe"}
                                </h5>
                            </td>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"12/12/12"}
                                </h5>
                            </td>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"12:00 PM"}
                                </h5>
                            </td>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"Monday"}
                                </h5>
                            </td>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"Pick Up"}
                                </h5>
                            </td>
                            <td>
                                <h5 className="text-center text-muted">
                                    {"Accept"}
                                </h5>
                            </td>
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
