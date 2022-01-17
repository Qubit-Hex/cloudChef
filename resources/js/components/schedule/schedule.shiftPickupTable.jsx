/**
 *
 *  @class: shiftPickup
 *
 *
 *  @purpose: This component is used to display the shift pickup details.
 */


import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FetchServiceProvider from '../../lib/fetchServiceProvider';


/**
 *
 * @function: getDroppedShifts
 *
 * @purpose: This function is used to get the dropped shifts from the store.
 */


const getDroppedShifts = (storeId) => {

    const api = new FetchServiceProvider();
    const headers = {
        'Content-Type': 'application/json',
        'accessToken':  api.getCookie('accessToken')
    }

    const route = '/api/v1/stores/' + storeId + '/droppedShifts';

    let request = api.get(route, headers);

    return request;
}


/**
 *
 *  @function: shiftPickupRequest
 *
 *  @purpose: This function is usedfor the employee to request to pick up a shift.
 */

const shiftPickupRequest = (storeId, shiftId, employeeId) => {
    const headers = {
        'Content-type': 'application/json',
        'accessToken':  api.getCookie('accessToken'),
        'storeId': storeId,
        'shiftId': shiftId,
        'employeeId': employeeId,
    }

    const api = new FetchServiceProvider();
    const route = '';

    const request = api.get(route, headers);

    return request;
}



/**
 *
 *  @function: dialogConfirm
 *
 *  @purpose: inorder to render the shift pick up dialog
 *
 */


const DialogConfirm = (props) => {



    const closeModal = () => {
        const modal = document.getElementById('modal-container');
        ReactDOM.unmountComponentAtNode(modal);
    }

    return (
                <div class="modal">
                <div class="modal-dialog fade-enter-active">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"> <i class="fas fa-info-circle mr-4"></i> Information </h5>
                            <button
                                        type="button"
                                        class="btn-transparent modal-close far fa-times-circle"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                     onClick={
                                         (e) => {
                                            closeModal();

                                      }}></button>
                        </div>
                        <div class="modal-body">

                        <div className='success-message-wrapper'>
                        <img src='/img/SVG/send-message-icon.svg' alt='Request sent' className='img-fluid success-message-icon'/>
                        <i className="fas fa-check-circle text-success"></i>
                        <span className='success-message'> Your request has been sent! </span>

                        <br/><br/>
                        <small className='text-muted mt-4'> No shift changes will be made until a manager <b className='text-danger'> APPROVES </b> your request. </small>
                        </div>

                        </div>

                    </div>
                </div>
            </div>

    )
}


/**
 *
 * @function: ShiftPickupContent
 *
 *  @purpose: inorder to get the content of the table upon a request to pick up a shift.
 */


const ShiftPickupContent = (props) => {


    return (
        <tr>
            <td> <b> John Doe </b></td>
            <td> 2021-01-22 </td>
            <td> Manager </td>
            <td> 4:00pm </td>
            <td> 11:00pm </td>
            <td><b> I am sick, please cover my shift thanks!!!</b></td>
            <td>
                <button className='btn btn-message  btn-sm' onClick={ (e) => {
                    <DialogConfirm />
                }}>  Pick up Shift </button>

            </td>
        </tr>
    )


}



export const ShiftPickupTable = (props) => {


    return (
        <table class="table mt-4">
        <thead>
            <tr>
                <th scope="col"> Employee  </th>
                <th scope='col'> Shift Drop Date  </th>
                <th scrope='col'> Role </th>
                <th scope='col'> Start Time </th>
                <th scope='col'> End Time </th>
                <th scope='col'> Reason </th>
                <th scope='col'> Action </th>
            </tr>
        </thead>
        <tbody>
            <ShiftPickupContent />

        </tbody>
        </table>
 );
}
