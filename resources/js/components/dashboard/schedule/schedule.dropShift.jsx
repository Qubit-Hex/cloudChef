/**
 *
 *  @component schedule.dropShift
 *
 *
 *  @purpose: inorder to handle the drop shift functionality. of the schedule Service.
 *
 */




import React, { Component } from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";

import { ShiftDrop } from "./schedule.shiftdrop";




/**
 *
 * @component ScheduleDrop
 *
 *
 *  @purpose: this is a function that handles the drop shift functionality.
 *            of the schedule Service.
 *
 *
 *  @functionality:
 *                  - shift drop request via the api call.
 *                  - render the modal to let know the user that the shift has been dropped.
 *                  - hide the modal after a few seconds.
 *                  - add a notification entry to the notification table. to let the user know
 *                    that your request is pending or has been accepted / rejected.
 *
 */

export function ScheduleDrop(props)
{


    const [shift, setShift] = React.useState(null);
    const [shiftDropModal, setShiftDropModal] = React.useState(false);

    /**
     *
     *  @method: handleShiftDrop
     *
     *  @description: This method is responsible for displaying a modal to confirm the drop of a shift.
     *                 before calling the API to drop the shift.
     *
     */

     const handleShiftDrop = (e) => {

            e.preventDefault();
            let inputElement = document.getElementById("dropShiftInput");
            let errorMessage = document.getElementById("dropShiftErrorMessage");

            if (inputElement.value === "") {
                inputElement.style.borderColor = "red";
                errorMessage.innerText = "Please enter a date of shift to drop.";
                return;
            } else {
                // remove the error border color.
                // and the error message from our form request
                errorMessage.innerText = "";
                inputElement.style.borderColor = "";
                // proceed to create the modal for the user to confirm the drop of the shift.
                // and post a message to the database
                const modal = document.getElementById("modal-container");
                return ReactDOM.render( <ShiftDrop date={inputElement.value}/>, modal);
            }
        }



    return (
        <div className='schedule-drop-shift'>
                    <h2 className="header-subtitle text-center">
                                DROP SHIFT <br />
                            </h2>

                            <h5 className="text-muted text-center ">
                                    {" "}
                                    Choose any shifts you would like to drop
                                    {/* finish the drop component for drop down system  */}

                                </h5>

                            <small className="text-muted text-center">
                            {/* --something about team work and restaurants */}
                                Help us make a better schedule for you.

                            </small>
                    <img
                                src="/img/SVG/people_connection.svg"
                                className="mx-auto  d-flex img-fluid"
                                width='300px'
                                height='300px'
                            />

                        <div className="card-body">




                            <div className="row">
                                <div className="col">
                                    <div className="form-group">

                                    <form onSubmit={(e) => {
                                        handleShiftDrop(e);
                                    }}>
                                        <label className="text-bold">
                                            <b className='mt-4' >
                                                Select Shift you want to drop{" "}
                                            </b>
                                        </label>

                                             <p id='dropShiftErrorMessage' className='text-danger text-bold mt-2'> </p>
                                        <input
                                            type="date"
                                            className="form-control mt-2"
                                            id='dropShiftInput'
                                        />
                                        <button className="btn btn-message mt-2">
                                            {" "}
                                            Drop Shift{" "}
                                        </button>

                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
    );
}
