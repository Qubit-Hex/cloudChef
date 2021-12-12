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




export class ShiftDrop extends Component {
    constructor(props) {
        super(props);



        this.state = {
            userID: this.props.userID,
            storeToken: this.props.storeToken, // store token in order to verify the request that is being made
            shiftID: this.props.shiftID,
            shiftDate: this.props.shiftDate,
            shiftStart: this.props.shiftStart,
            shiftEnd: this.props.shiftEnd,
            shiftType: this.props.shiftType,
            shiftStatus: this.props.shiftStatus,
        };
    
    }

    /**
     *  @method: hideModal
     * 
     * 
     *  @purpose: This method is responsible for destroying the modal.
     * 
     */

    hideModal = () => {
            let modal = document.getElementById('modal-container');
            return ReactDOM.render('', modal);
    }


    /**
     * 
     *  @method: sendRequest
     * 
     *  @purpose: This method is responsible for sending the request to the server.
     * 
     */

    SendRequest = () => {
            let modal = document.getElementById('modal-container');
            return ReactDOM.render(
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
                                 onClick={ (e) => {this.hideModal() }}></button>
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
                
                , modal);
    

    }


    /**
     *  @method: FailureMessage
     * 
     * 
     * @returns: Modal with a failure message. 
     * 
     */


    FailureMessage = () => {


    }



    render() {
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
                    <button className='btn btn-message' onClick={ (e) => {this.SendRequest()}}> Yes <i className='fas fa-paper-plane'></i></button>
                    </div>

                    <div className='row mt-2 '>
                    <button className='btn btn-danger' onClick={ (e) => {this.hideModal() }}> No <i className='fa fa-ban'></i></button>                        
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
        )
    }

}