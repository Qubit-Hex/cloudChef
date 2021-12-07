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

export class SchedulePage extends Component {
    constructor(props) {
        super(props);

        // get employee data from the API

        const date = new Date();



        //  TODO ADD SCHEDULE DATA TO STATE
        // AND ADD API CALL TO GET SCHEDULE DATA
        // FROM THE SCHEDULE ROUTR FROM THE API
        
        this.state = {
            date: date.toLocaleDateString(),
        };
    }


    /**
     *  @method: pickupRequest
     * 
     *  @description: This method is responsible for sending a pickup request to the API.
     * 
     */

    pickupRequest() {
            alert("Pickup request sent!");
    }

    render() {
        return (


          
            <div className="dashboard-content container-fluid mt-md-4">  
            
            {/**  container for sending modals to the user  */}

            <div id='modal-container' className='modal-container'></div>


            {/**  container for the schedule components   */}
                <div className="profile_Navbar">
                    <div className="row">
                        <div className="col">
                            <div className="form-group ml-lg-4">
                                <label htmlFor="text-bold" className="mr-2">
                                    Search Employees
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                />
                                <button className="btn btn-primary mt-4">
                                    {" "}
                                    Search{" "}
                                </button>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group ml-lg-4">
                                <label className="text-bold">
                                    {" "}
                                    Filter by position:{" "}
                                </label>
                                <select className="form-control">
                                    <option> Manager </option>
                                    <option> Employee </option>
                                    <option> All </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 card">
                        <h1> Current Scheudle {this.state.date} </h1>
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th scope="col"> Employee</th>
                                    <th scope="col">Monday</th>
                                    <th scope="col">Tuesday</th>
                                    <th scope="col">Wednesday</th>
                                    <th scope="col">Thursday</th>
                                    <th scope="col">Friday</th>
                                    <th scope="col">Saturday</th>
                                    <th scope="col">Sunday</th>
                                    <th scope="col">Total Hours:</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/** RUN LOOP HERE TO EMNUMERATE ALL THE EMPLOYEE JSON DATA */}
                                <tr>
                                    <td>
                                        <b>Oliver Shwaba</b> <br />
                                        <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                            (LINE COOK)
                                        </span>
                                    </td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Oliver Shwaba</b> <br />
                                        <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                            (LINE COOK)
                                        </span>
                                    </td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Oliver Shwaba</b> <br />
                                        <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                            (LINE COOK)
                                        </span>
                                    </td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Oliver Shwaba</b> <br />
                                        <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                            (LINE COOK)
                                        </span>
                                    </td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Oliver Shwaba</b> <br />
                                        <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                            (LINE COOK)
                                        </span>
                                    </td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>8:00 - 17:00</td>
                                    <td>40</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/** ADD 2 CARDS ONE FOR DROPING SHIFTS AND ONE FOR PICKING UP SHIFTS    */}
                <div className="row">
                    <div className="row card">
                        <div className="card-body">
                            <h5 className="card-title">
                                DROP OFF SHIFTS{" "}
                                <i className="fas fa-user-circle drop-shift-icon"></i>{" "}
                                <br />
                                <small className="text-muted">
                                    {" "}
                                    Choose any shifts you would like to dro *
                                </small>
                            </h5>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label className="text-bold">
                                            Oliver Shwaba <br />
                                            <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                                (LINE COOK)
                                            </span>
                                        </label>
                                        <select className="form-control">
                                            <option> Monday </option>
                                            <option> Tuesday </option>
                                            <option> Wednesday </option>
                                            <option> Thursday </option>
                                            <option> Friday </option>
                                            <option> Saturday </option>
                                            <option> Sunday </option>
                                        </select>

                                        <button className="btn btn-primary mt-2">
                                            {" "}
                                            Drop Shift{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row card card-border p-2">

                        <div className="card-body">
                            <h5 className="card-title">PICK UP SHIFTS</h5>
                            <img src='/img/SVG/pick-up-shift.svg' alt="pick-up-shift" className="img-fluid" width='150px' height='150px' />

                            <small className="text-muted">
                                {/*here we have the drop off shifts that you have dropped off for\
                                the react component we will refactor later
                                we want this the same layout as as shift dr    . */}


         
                                Choose any shifts you would like1 to pick up!
                            </small>
                                <br/><br/>
                            <small className='text-muted'>
                                Help your fellow workers by picking up shifts.
                            </small>
                        </div>

                        <div className='shift-shop'>
                           <div className="row employee-card">
                                <div className="col">
                                    <span class="employee-icon">

                                    <img src='/img/SVG/male_user.svg' alt="employee-icon" className='profile-img-sm' />
                                    </span>
                                    <b> Oliver Shwaba </b> <br /><br/>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "} 
                                        <i className='fas fa-user-tie'></i>
                                         Position: 
                                         Line Cook{" "}
                                    </span>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "}
                                        <i class="fas fa-calendar-week"></i>{" "} Date:
                                        Monday{" "}
                                    </span>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "} 
                                        <i class="fas fa-user-clock"></i>
                                        Time: 
                                    8:00 -  17:00{" "}
                                    </span>


                                    <p className="card-text">
                                        <b> Message:</b> <br/>
                                        <span  className='ml-4'>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Hic, saepe sint
                                        asperiores alias cum fuga unde, nostrum
                                        ipsa ad fugit quos quam itaque rem
                                        obcaecati temporibus earum rerum. Illo,
                                        recusandae.
                                        </span>
                                    </p>
                                </div> 

                                <div className="row">


                                <button className="btn btn-primary btn-sm mt-2" onClick={ (e) => { this.pickupRequest() }}>
                                    {" "}
                                    Pick Up Shift{" "}
                                </button>

                                </div>
                            </div>


                           <div className="row employee-card">
                                <div className="col">
                                    <span class="employee-icon">

                                    <img src='/img/SVG/female_user.svg' alt="employee-icon"  className='profile-img-sm'/>
                                    </span>
                                    <b> Heather Smith </b> <br /><br/>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "}
                                        Line Cook{" "}
                                    </span>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "}
                                        <i class="fas fa-calendar-week"></i>{" "}
                                        Monday{" "}
                                    </span>
                                    <span className="role-badge badge badge-primary card-text-sub-text ml-2 bold">
                                        {" "}
                                        <i class="fas fa-user-clock"></i> 8:00 -
                                        17:00{" "}
                                    </span>

                                    {/**  finsihed prototype of shift shop i cant spell fml*/}

                                    <p className="card-text">
                                        <b> Message:</b> <br/>
                                        <span  className='ml-4'>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Hic, saepe sint
                                        asperiores alias cum fuga unde, nostrum
                                        ipsa ad fugit quos quam itaque rem
                                        obcaecati temporibus earum rerum. Illo,
                                        recusandae.
                                        </span>
                                    </p>
                                </div> 
                                <div className='row'>
                                    <button className="btn btn-primary btn-sm"  onClick={ (e) => { this.pickupRequest() }}>
                                    {" "}
                                    Pick Up Shift{" "}
                                </button> 
                                </div>
                               


                            </div>
                         </div>
                        </div>
                    </div>
                </div>
        );
    }
}
