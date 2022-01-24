/**
 *
 *  @file: schedule.pickupshift.jsx
 *
 *
 *  @purpose: inorder to pick up shifts ftom the store that the user is assocated with
 *
 */

import react from "react";
import { ReactDOM } from "react";
import { ShiftPickupTable } from "./schedule.shiftPickupTable";


/**
 *
 *  @function: SchedulePickup
 *
 *
 *  @purpose: inorder to delgate any of the actions that are proccessed by the SchedulePickup component
 *
 *
 */

export const SchedulePickup = (props) => {
    return (
        <div className="schedule_pill">
            <h2 className="header-subtitle text-center mt-4">PICK UP SHIFTS</h2>
            <h5 className="text-center text-muted">
                {" "}
                Choose any shifts you would like to pick up!{" "}
            </h5>
            <img
                src="/img/SVG/pick-up-shift.svg"
                alt="pick-up-shift"
                className="mx-auto d-flex img-fluid"
                width="300px"
                height='300PX'
            />

                <h3 className="header-subtitle text-center mt-4"> Current shifts in shift shop. </h3>
                <br />

                <ShiftPickupTable />
            </div>
    );
};
