/**
 *
 *  @file: shiftDrop.jsx
 *
 *
 *
 *  @purpose: This component is responsible for proccessing shift drop requests.
 */



import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FetchServiceProvider from '../../../lib/fetchServiceProvider';








/**
 *
 *  @function: dropShiftRequest
 *
 *  @purpose: This function is responsible for sending the request to the server.
 *            inorder to handle our shift drop  request.
 *
 *
 *  @parms: take a date as a header to send to the server.
 */

 const dropShiftRequest = (props, reason) => {
    const api = new FetchServiceProvider();

    const headers = {
        "Content-Type": "application/json",
        "accessToken": api.getCookie("accessToken"),
        "shift": props.date,
        'reason': reason,
    };

    // send our data to the server
    const route = '/api/store/schedule/dropshift';

    let response = api.get(route, headers);

    // change this later to just return the callback rather than having our code execute here
    return response;
}

/**
 *
 *   @function: SuccessNotification
 *
 *  @purpose: inorder to render the success notification component.
 *
 */


const SuccessNotification = (props) => {


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
                        <div class="modal-header">
                            <h5 class="modal-title"> <i class="fas fa-info-circle mr-4"></i> Information </h5>
                            <button
                                    type="button"
                                    class="modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {

                                    closeModal()

                                 }}></button>
                        </div>
                        <div class="modal-body">

                        <div className='success-message-wrapper'>
                        <img src='/img/SVG/shift_request.svg' alt='Request sent' className='img-fluid success-message-icon'/>
                        <i className="fas fa-check-circle text-success"></i>
                        <span className='success-message'> Your request has been sent! </span>

                        <br/> <br/>
                        <small className='text-muted mt-4'> You are still
                          <b className='text-danger'> REQUIRED </b> to cover the shift, if your request is denied </small>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
    );
}



/**
 * @function: FailedNotification
 *
 * @purpose: inorder to render the failed notification component when the request is denied.
 *
 */


const FailedNotification = (props) => {

    // close the modal container

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
                    <h5 class="modal-title"> <i className="fas fa-hand-paper"></i> Error </h5>
                    <button
                            type="button"
                            class="btn-transparent modal-close far fa-times-circle"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                         onClick={ (e) => {

                                closeModal();

                         }}></button>
                </div>
                <div class="modal-body">

                <div className='success-message-wrapper'>
                <img src='/img/errors/cancel.svg' alt='request failed' width={250} height={250} className='img-fluid success-message-icon'/>
                <br/><br/>
                <i class="fas fa-hand-paper text-danger"></i>
                <span className='success-message'> <b className="text-danger"> Request Failed:</b></span>
                <p className='text-muted mt-4'> <b> Reason:</b>  <span className='text-muted text-danger' > {props.reason } </span>  </p>


                </div>

                </div>

            </div>
        </div>
    </div>

    );
}


const ReasonNotification = (props) => {

       // close the modal container



       const closeModal = () => {
        let modalContainer = document.getElementById('modal-container');

        // un mount the modal container
        ReactDOM.unmountComponentAtNode(modalContainer);
    }


    /**
     *
     *  @function: validateInput
     *
     *  @purpose: inorder to validate the input before forwarding the request futher down the chain
     */

    const validateInput = (input) => {
        // set a minium length of 10 characters for the a reason for dropping the shift
        let errorWrapper = document.getElementById('_shift-drop-error');
            if (input.value.length > 10  && input.value.length < 50) {
                errorWrapper.innerText = '';
                // send our request to the handler

                dropShiftRequest(props, input.value).then(response => {
                    // error execute the following
                    let container = document.getElementById('modal-container');
                    if (response.status === 'error') {
                        return ReactDOM.render(<FailedNotification reason={response.message}/>, container);
                    } else if (response.status === 'success') {
                        return ReactDOM.render(<SuccessNotification />, container);
                    }
                })
            } else {
                errorWrapper.innerText = 'Message must be at least 10 characters long,  and less than 50 characters';
            }
    }


    return (
        <div class="modal">
        <div class="modal-dialog fade-enter-active">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> <i class="fas fa-question-circle"></i> Reason </h5>
                    <button
                                type="button"
                                class="btn-transparent modal-close far fa-times-circle"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                             onClick={ (e) => { closeModal() }}></button>
                </div>
                <div class="modal-body">

                <div className='row mt-2'>
                        <div className='form-group'>
                            <label htmlFor='shift-drop-reason'> <b className='ml-4'> What is the reason for dropping this shift?  </b> </label>
                            <p className='text-danger' id='_shift-drop-error'
                            style={{
                                marginTop: '5px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                fontStyle: 'italic'
                            }}></p>
                            <input type='text' className='form-control mt-2 mb-2' name='shift-drop-reason' id='shift-drop-reason' />
                            <button className='btn btn-message' onClick={
                                // validate the input before sending the said input to the server
                                (e) => {
                                    let shiftDropReason = document.getElementById('shift-drop-reason');
                                    return validateInput(shiftDropReason);
                                }

                            }> Send Request <i className='fa fas-paper'></i></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    )
}



/**
 *
 *  @function: NotificationConfirmation
 *
 *
 *  @purpose: This component is responsible for rendering the notification confirmation modal.
 *
 */


const NotificationConfirmation = (props) => {

    /**
     *
     * @function: sendRequest
     *
     *
     * @purpose: inorder to render the modal
     *
     */

    const sendRequest = (props) => {


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

                             onClick={ (e) => {this.hideModal() }}></button>
                </div>
                <div class="modal-body">

                <b className='ml-4'> Are you sure you want to drop this shift </b>
                <div className='row mt-2'>
                <button className='btn btn-message' onClick={ (e) => {

                    sendRequest();

                }}> Yes <i className='fas fa-paper-plane'></i></button>
                </div>

                <div className='row mt-2 '>
                <button className='btn btn-danger' onClick={ (e) => {
                    this.hideModal()
                    }
                }> No <i className='fa fa-ban'></i></button>
                </div>

                </div>
            </div>
        </div>
    </div>
    );

}


/**
  *
  *  @function: ShiftDrop Component
  *
  *  @purpose: This component is responsible for rendering the drop shift modal. and delgating the drop shift request to the server.
  *
  *  @props: Data -> the date of the shift drop request. (YYYY-MM-DD)
 */


export const ShiftDrop = (props) => {


        return (
                <ReasonNotification date={props.date} />
            );
}
