/**
 *
 *  @file: ScheduleTable.jsx
 *
 *
 *  @purpose: inorder to render the schedule table for the required component
 *
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { ModalAddShift } from './Modal.addShift';
import { ModalEditShift } from './Modal.editShift';
import { ModalDeleteShift } from './Modal.deleteShift';
import * as Alerts from '../../../../base/notification';

/***
 *
 *
 *  @component: GenerateTableData
 *
 *  @purpose: This is responsible for rendering the schedule table for the required component
 *
 */

const GenerateTableData = (props) => {
    return (
        <div>

        </div>
    );
}


/**
 *
 *  @component: ScheduleTable
 *
 *  @purpose: inorder to render active schedules of the organization inorder to edit or modify
 *            the schedule based on the date sent to the component
 *
 */


export const ScheduleTable = (props) => {

    // get our dates from the props
    const date = props.date;
    const weekNumber = props.week;
    const yearNumber = props.year;



    return (
        <table className="schedule-table">
        <thead>
            <tr>
                <th>Employee</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div>
                        <span>
                            <i className='fa fa-user-tie fa-3x'></i> <br/><br/>
                            <b> John Doe </b>
                        </span>
                    </div>

                </td>
                <td className='text-center'>

                        <div className="row">
                            <div className="text-center">
                               <b className='p-2'> 8:00 AM - 5:00 PM </b>
                               <hr/>
                            </div>
                        </div>

                        <div className='row p-0 m-0'>
                         {/** calender icon */}
                         <span className='text-center mt-0'> Action </span>
                            <button  className='text-center btn btn-outline-dark m-2 w-auto mx-auto' title='hide the controls for this shift'
                             onClick={
                                 (e) => {
                                     const controlsDiv = document.getElementById('controls-pannel');
                                    // toggle controlsDiv
                                    if (controlsDiv.classList.contains('d-none')) {
                                        e.currentTarget.innerText = 'Show';
                                        controlsDiv.classList.remove('d-none');
                                    } else {
                                        e.currentTarget.innerText = 'Hide';
                                        controlsDiv.classList.add('d-none');
                                    }
                                 }
                             }> Hide </button>
                            <div className="text-center d-flex" id='controls-pannel'>
                                <button className='btn btn-message m-2' onClick={
                                    (e) => {
                                        const container = document.getElementById('modal-container');
                                        ReactDOM.render(<ModalAddShift />, container);
                                    }
                                }>Add</button>
                                <button className="btn btn-warning m-2" onClick={
                                    (e) => {
                                        const container = document.getElementById('modal-container');

                                        ReactDOM.render(<ModalAddShift />, notifyContainer);
                                    }
                                }> Edit </button>
                                <button className="btn btn-danger m-2"  onClick={
                                    (e) => {
                                        // show a messsage on wether or not the shift for the user was deleted successfully
                                        const container = document.getElementById('modal-container');
                                        // add the delete modal to the system
                                        ReactDOM.render('Shift Deleted', container);
                                    }
                                }> Delete  </button>
                            </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    )
}
