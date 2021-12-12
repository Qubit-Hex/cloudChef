/**
 *
 *  @file: dashboard.schedule.jsx
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 *
 *  @author: Oliver Shwaba -> Qubit-hEx
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ShiftDrop } from "../components/dashboard/shiftDrop";
import { ShiftPickup } from "../components/dashboard/shiftPickup";

export class SchedulePage extends Component {
    constructor(props) {
        super(props);

        console.log(document.cookie);
        const date = new Date();
        this.state = {
            date: date.toLocaleDateString(),
            user: this.props.user,
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

    render() {
        return (      
            <div className="container-fluid dashboard-content mt-md-4">
                {/**  container for sending modals to the user  */}

                <h2 className='ml-4'> <b>Schedule</b> <small className='sub-caption ' > Welcome ( john doe) </small></h2>


                <div id="modal-container" className="modal-container"></div>

                {/**  container for the schedule components   */}

                {/* refactor into an component that i CAN LOOP THOUGH  THE 
                    THE SCHEDULE DATA AND RENDER IT */}

                <div className="row">
                    <div className="col card fit-table">
                        <h2 className="header-subtitle text-center mt-4 ">
                            {" "}
                            View your current Schedule{" "}
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

                            <div className="profile_Navbar">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group ml-lg-4">
                                            <label
                                                htmlFor="text-bold"
                                                className="m-4 h4 font-weight-bolder"
                                            >
                                                Search Employees
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                            />
                                            <button className="btn btn-message mt-4">
                                                {" "}
                                                Search{" "}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group ml-lg-4">
                                            <label className="m-4 h4 font-weight-bolder">
                                                {" "}
                                                Filter by Role{" "}
                                            </label>
                                            <select className="form-control">
                                                <option> Manager </option>
                                                <option> Employee </option>
                                                <option> All </option>
                                            </select>

                                            <button className="btn btn-message mt-4">
                                                {" "}
                                                Filter Employees{" "}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col">
                                        <div className="form-group ml-lg-4">
                                            <label className="m-4 h4 font-weight-bolder">
                                                {" "}
                                                Select Schedule{" "}
                                            </label>

                                            <small className='text-muted text-center'>

                                                <b> Current: {this.state.date}</b>

                                            </small>


                                            <select className="form-control">
                                                <option> 10/10/10 </option>
                                                <option> 10/10/10 </option>
                                                <option> 10/10/10  </option>
                                            </select>

                                            <button className="btn btn-message mt-4">
                                                {" "}
                                                Choose{" "}
                                            </button>
                                        </div>
                                    </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"> Name </th>
                                        <th scope="col"> Sunday </th>
                                        <th scope="col"> Monday </th>
                                        <th scope="col"> Tuesday </th>
                                        <th scope="col"> Wednesday </th>
                                        <th scope="col"> Thursday </th>
                                        <th scope="col"> Friday </th>
                                        <th scope="col"> Saturday </th>
                                        <th scope="col"> Total Hours </th>
                                    </tr>
                                </thead>
                                <tbody id="wrapper_test">
                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/male_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Example User </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    Manager
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/female_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Example User </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    COOK
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/male_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Example User </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    Server
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/female_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Dishwasher </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    FOH Manager
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/male_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Example User </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    Hostess
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="col">
                                                <img
                                                    src="/img/SVG/female_user.svg"
                                                    className="profile-img-sm"
                                                    alt="user photo"
                                                />
                                            </div>

                                            <br/>

                                            <div className="col">
                                                <span> Example User </span>
                                            </div>

                                            <div className="col">
                                                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                    BOH Manager
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-danger card-text-sub-text  bold">
                                                OFF
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="role-badge badge badge-primary card-text-sub-text  bold">
                                                8:00 - 17:00{" "}
                                            </span>{" "}
                                        </td>
                                        <td>
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                                40 Hours
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
