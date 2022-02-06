/**
 *
 *  @class: shiftPickup
 *
 *
 *  @purpose: This component is used to display the shift pickup details.
 */


import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FetchServiceProvider from '../../../lib/fetchServiceProvider';


/**
 *
 * @function: getDroppedShifts
 *
 * @purpose: This function is used to get the dropped shifts from the store.
 */


const getDroppedShifts = (props) => {

    const api = new FetchServiceProvider();
    const headers = {
        'Content-Type': 'application/json',
        'accessToken':  api.getCookie('accessToken')
    }

    const route = '/api/store/schedule/dropshift/get';

    let request = api.get(route, headers);

    return request;
}


/**
 *
 * @function: pickupShiftRequest
 *
 *  @purpose: This function is used to send the request to the server to pickup the shift.
 *
 */

const pickupShiftRequest = (props) => {

    const api = new FetchServiceProvider();
    const headers = {
        'Content-Type': 'application/json',
        'accessToken':  api.getCookie('accessToken'),
        'shift': props.shiftId
    }

    const route = '/api/store/schedule/pickup';

    const $request = api.get(route, headers);


   return  $request.then(response => {

        const modal = document.getElementById('modal-container');

        // check the response and display the appropriate message


        if (response.status === 'success') {
            return ReactDOM.render(<ShiftRequestSuccess />, modal)
        } else {
            return ReactDOM.render(<ShiftRequestFailed message={response.message} />, modal)
        }
    });
}


/**
 *
 *  @function: ShiftRequestFailed
 *
 *
 *  @purpose: This function is used to display the error message when the request to pickup the shift fails.
 */

const ShiftRequestFailed = (props) => {

    const closeModal = () => {
        let modal = document.getElementById('modal-container');
        ReactDOM.unmountComponentAtNode(modal);
    }

    return (
        <div class="modal">
            <div class="modal-dialog fade-enter-active">
                <div class="modal-content">
                    <div class="modal-header bg-red">
                        <h5 class="modal-title"> <i class="fas fa-info-circle mr-4"></i> Error </h5>
                        <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {

                                    closeModal()

                                 }}></button>
                    </div>
                    {/** make a error dialog  */}
                    <div class="modal-body">


                        <div className='success-message-wrapper'>
                        <img src='/img/SVG/request_sent.svg' alt='Request sent' className='img-fluid success-message-icon'/>
                        <br/>
                        {/** make a error icon */}
                        <i className="fas fa-times-circle text-danger"></i>
                        <span className='success-message'> Error:  <span className='text-danger'
                        style={{ fontSize: '0.8rem'}}> {props.message} </span> </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-message"
                            data-dismiss="modal"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}


/**
 *
 * @function: ShiftRequestSuccess
 *
 * @purpose: to display the success message after the shift request has been sent to the server.
 *
 */

const ShiftRequestSuccess = (props) => {

      // close the modal

      const closeModal = () => {
        let modalContainer = document.getElementById('modal-container');

        // un mount the modal container
        ReactDOM.unmountComponentAtNode(modalContainer);
    }

    return (
            <div class="modal">
                <div class="modal-dialog fade-enter-active">
                    <div class="modal-content">
                        <div class="modal-header bg-blue">
                            <h5 class="modal-title"> <i class="fas fa-info-circle mr-4"></i> Information </h5>
                            <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {

                                    closeModal()

                                 }}></button>
                        </div>
                        <div class="modal-body">

                        <div className='success-message-wrapper'>
                        <img src='/img/SVG/request_sent.svg' alt='Request sent' className='img-fluid success-message-icon'/>
                        <i className="fas fa-check-circle text-success"></i>
                        <span className='success-message'> Your request has been sent! </span>

                        <br/> <br/>
                        <small className='text-muted mt-4'> You will be notified if you request is approved by <b> Management </b> </small>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
    );
}


/**
 *
 * @function: ConfirmShiftPickup
 *
 * @purpose: This function is used to confirm the shift pickup.
 *
 * @param: shiftId
 */

const ConfirmShiftPickup = (props) => {


    // closr the modal window

    const closeModal = (e) => {
        const modal = document.getElementById('modal-container');
        ReactDOM.unmountComponentAtNode(modal);
    }

    return (
        <div class="modal">
        <div class="modal-dialog fade-enter-active">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> <i class="fas fa-question-circle"></i> Please confirm </h5>
                    <button
                                type="button"
                                class="btn-transparent modal-close far fa-times-circle"
                                data-bs-dismiss="modal"
                                aria-label="Close"

                             onClick={ (e) => {closeModal() }}></button>
                </div>
                <div class="modal-body">

                <b className='ml-4'> Are you sure you want to drop this shift </b>
                <div className='row mt-2'>
                <button className='btn btn-message' onClick={ (e) => {

                    // send the request to the server to pickup the shift
                    pickupShiftRequest(props);

                }}> Yes <i className='fas fa-paper-plane'></i></button>
                </div>

                <div className='row mt-2 '>
                <button className='btn btn-danger' onClick={ (e) => {
                        closeModal()
                    }
                }> No <i className='fa fa-ban'></i></button>
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

    // state for the dropped shifts of the store

    const [droppedShifts, setDroppedShifts] = React.useState([]);


    let api = getDroppedShifts(props);

    React.useState(() => {
        const droppedShiftData = api.then(response => {
            setDroppedShifts(response.data);
        });
    });

    // map through the dropped shifts and display them in the table

    const droppedShiftsList = droppedShifts.map((shift, index) => {


        {/** check and see if the shift has been approved by management */}
        if (shift.is_approved === 1) {

            return (
                <tr key={index}>
                <td> {shift.employee} </td>
                <td> {shift.dropShiftDate } </td>
                <td> { shift.role }</td>
                <td> { shift.start_time }</td>
                <td> { shift.end_time }</td>
                <td>{shift.reason} </td>
                <td>
                    <button className="btn btn-message"
                            onClick={
                                (e) => {
                                    let modalContainer = document.getElementById('modal-container');
                                    ReactDOM.render(<ConfirmShiftPickup shiftId={shift.shift_id}/>, modalContainer);
                                }
                             }>Pick Up</button>
                </td>
            </tr>

            );

        }
    });

    return (droppedShiftsList);
}



export const ShiftPickupTable = (props) => {


    return (
        <table class="table mt-4">
        <thead>
            <tr>
                <th scope="col"> Employee  </th>
                <th scope='col'> Shift Drop Date  </th>
                <th scope='col'> Department </th>
                <th scope='col'> Start Time </th>
                <th scope='col'> End Time </th>
                <th scope='col'> Reason </th>
                <th scope='col'> Action </th>
            </tr>
        </thead>
        <tbody style={{
            fontWeight: '500',
        }}>
            <ShiftPickupContent />

        </tbody>
        </table>
 );
}
