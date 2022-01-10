/*
*
 *
 *  @file: dashboard.schedule.jsx
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 *
 *  @author: Oliver Shwaba -> Qubit-hEx
 * 
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ShiftDrop } from "../components/dashboard/shiftDrop";
import { ShiftPickup } from "../components/dashboard/shiftPickup";
import { SchedulePannel } from "../components/schedule/schedule.schedule";

import FetchServiceProvider from "../lib/fetchServiceProvider";

export class SchedulePage extends Component {
    constructor(props) {
        super(props);

        console.log(document.cookie);
        const date = new Date();
        this.state = {
            date: date.toLocaleDateString(),
            user: '',
        };
    }

    /**
     *  @method: pickupRequest
     *
     *  @description: This method is responsible for sending a pickup request to the API.
     *
     */

    pickupRequest() {
        // temp
        alert("Pickup request sent!");
    }

    /**
     *
     *  @method: handleShiftDrop
     *
     *  @description: This method is responsible for displaying a modal to confirm the drop of a shift.
     *                 before calling the API to drop the shift.
     *
     */

    handleShiftDrop(event) {
        let modalContainer = document.getElementById("modal-container");

        return ReactDOM.render(<ShiftDrop />, modalContainer);
    }


    /**
     *
     * @method: getUsername - gets the username of the user
     *
     * @purpose: to get the username of the user
     *
     */

    getUsername() {

        const fetchService = new FetchServiceProvider();

        let headers = {
            "Content-Type": "application/json",
            "accessToken": fetchService.getCookie('accessToken'),
        }

        fetchService.$get("/api/members/find", headers, (response) => {
            console.log(response);

            this.setState({user: response.username});

        });
    }


    /**
     *  @method: componentDidMount
     *
     *  @description: This method is responsible for updating the state of the component.
     *
     *
    */

    componentDidMount(prevProps, prevState) {

        // we need to add this inorder to prevent a infinite loop when the component is mounted
        if (this.state.user === '') {
            this.getUsername();
        }

        return;
    }


    render() {
        return (
            <div className="container-fluid dashboard-content mt-md-4">
                {/**  container for sending modals to the user  */}

                <h2 className='ml-4'> <b>Schedule</b> <small className='sub-caption ' > Welcome (
               { this.state.user } ) </small></h2>


                <div id="modal-container" className="modal-container"></div>

                {/**  container for the schedule components   */}

                {/* refactor into an component that i CAN LOOP THOUGH  THE
                    THE SCHEDULE DATA AND RENDER IT */}

                <div className="row">
                    <div className="col card fit-table">
                        <h2 className="header-subtitle text-center mt-4 ">
                          {" View your current schedule"}
                        </h2>

                        <img
                            src="/img/SVG/schedule_icon.svg"
                            alt="schedule icon"
                            width="300px"
                            height="300px"
                            className="mx-auto img-fluid"
                        />

                        <div className="row  schedule_pill">
                            {/* ADD SEARCH AND FILTER PARTS  */}




                            <div className="col">
                                        <div className="form-group ml-4">
                                            <label className="m-4 h4 font-weight-bolder">
                                                <b> Select Schedule</b>
                                            </label>

                                            <small className='text-muted text-center'>

                                                <b> Current: {this.state.date}</b>

                                            </small>

                                                <select className="form-control">

                                            </select>

                                            <button className="btn btn-sm btn-message mt-4">
                                                {" "}
                                                Choose{" "}
                                            </button>

                                    </div>
                                {/* RENDER THE SCHEDULE COMPONENT  */}
                                 { <SchedulePannel /> }
                            </div>
                        </div>
                    </div>
                </div>

                {/** ADD 2 CARDS ONE FOR DROPING SHIFTS AND ONE FOR PICKING UP SHIFTS    */}
                    <div className="row card">
                            <h2 className="header-subtitle text-center">
                                DROP SHIFT <br />
                            </h2>

                            <h5 className="text-muted text-center ">
                                    {" "}
                                    Choose any shifts you would like to drop
                                    {/* finish the drop component for drop down system  */}
                                </h5>
                    <img
                                src="/img/SVG/people_connection.svg"
                                className="mx-auto"
                                width="300px"
                                height="300px"
                            />

                        <div className="card-body">



                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="text-bold">
                                            <b>
                                                Select Shift you want to drop{" "}
                                            </b>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                        />
                                        <button
                                            onClick={(e) => {
                                                this.handleShiftDrop();
                                            }}
                                            className="btn btn-message mt-2"
                                        >
                                            {" "}
                                            Drop Shift{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row card card-border p-2">
                            <h2 className="header-subtitle text-center mt-4">PICK UP SHIFTS</h2>
                            <h5 className="text-center text-muted">
                                Choose any shifts you would like to pick up!
                            </h5>
                            <img
                                src="/img/SVG/pick-up-shift.svg"
                                alt="pick-up-shift"
                                className="mx-auto"
                                width="300px"
                                height="300px"
                            />
                        <div className="card-body">

                            <br />
                        </div>

                        <div className="shift-shop">
                            <ShiftPickup
                                message="I need the day off, to buy a new car"
                                gender="male"
                                name="Chad Brown"
                                position="Manager"
                                day="monday"
                                start="9:00AM"
                                end="5:00PM"
                                cardCount="0"
                            />

                            <ShiftPickup
                                message="I need the day off, for a family get together"
                                gender="male"
                                name="Micheal Smith"
                                position="Dishwasher"
                                day="monday"
                                start="9:00AM"
                                end="5:00PM"
                                cardCount="0"
                            />

                            <ShiftPickup
                                message="I need the day off, for my brother's birthday"
                                gender="female"
                                name="Amanda smith"
                                position="Manager"
                                day="tuesday"
                                start="9:00AM"
                                end="5:00PM"
                                cardCount={0}
                            />
                        </div>
                    </div>
                </div>
        );
    }
}
