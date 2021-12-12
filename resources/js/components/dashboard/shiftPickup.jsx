/**
 * 
 *  @class: shiftPickup
 * 
 * 
 *  @purpose: This component is used to display the shift pickup details.
 */


import React, { Component } from 'react';
import ReactDOM from "react-dom";

export class ShiftPickup extends Component {
    constructor(props) {

        super(props);

        this.state = {
            shiftPickup: this.props.shiftPickup,
            show: false,

            // data for the component
            message: this.props.message,
            gender: this.props.gender,
            name: this.props.name,
            position: this.props.position, 
            cardCount: this.props.cardCount,

            shift: {
                // shift settings
                day: this.props.day,
                start: this.props.start,
                end: this.props.end,
            }

        }
    }

    /**
     * @method: setGenderIcon
     * 
     * 
     * @purpose: This method is used to set the gender icon
     * 
     * @returns <String> 
     * 
     */


    setGenderIcon() {
        const male = '/img/SVG/male_user.svg';
        const female = '/img/SVG/female_user.svg';
        
        if (this.state.gender === 'male') {
            return male;
        } else if (this.state.gender === 'female') {
            return female;
        }
        // invalid input
        return false;
    }

    /**
     * @method: pickupRequestPopup
     * 
     * 
     * @returns a modal popup
     * 
     */

    pickupRequestPopup() {
       // render the popup here

       let container = document.getElementsByClassName('modal-content-container')[this.state.cardCount];

         return ReactDOM.render(
            <div class="modal">
            <div class="modal-dialog fade-enter-active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-question-circle"></i> Confirm </h5>
                        <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {this.hideModal() }}></button>
                    </div>
                    <div class="modal-body">

                    <b className=''> Do you want to pick up this shift? </b>
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
          
            , container);
    }


    /**
     * 
     * @method: hideModal 
     * 
     * @returns 
     * 
     * 
     */
    
    hideModal() {
        let container = document.getElementsByClassName('modal-content-container')[this.state.cardCount];
        ReactDOM.unmountComponentAtNode(container);

    }

    /**
     * 
     *  @method: SendRequest
     * 
     *  @purpose: This method is used to send the request to the server
     */


    SendRequest = () => {
        let container = document.getElementsByClassName('modal-content-container')[this.state.cardCount];
        ReactDOM.render(
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
                                 onClick={ (e) => {this.hideModal() }}></button>
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
            , container)
    }


    render() {
        return (
            <div className="row employee-card">
            <div className="col">
                <div className='modal-content-container'>

                </div>

                <span class="employee-icon">
                    <img
                        src={this.setGenderIcon()}
                        alt="employee-icon"
                        className="profile-img-sm"
                    />
                </span> 
                <br/><br/>
                <b> {this.state.name } </b> <br />
                <br />
                <span className="role-badge badge badge-primary card-text-sub-text ml-1  bold">
                    {" "}
                   {this.state.position } {" "}
                </span>
                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                    {" "}
                    <i class="fas fa-calendar-week"></i>{" "}
                    { this.state.shift.day} 
                </span>
                <span className="role-badge badge badge-primary card-text-sub-text ml-1  bold">
                    {" "}
                    <i class="fas fa-user-clock"></i> {this.state.shift.start + ' - ' + this.state.shift.end}

                </span>
                {/**  finsihed prototype of shift shop i cant spell fml*/}
                <p className="card-text">
                    <b> Message</b> <br />
                    <span className="ml-4 text-muted">
                        {this.state.message}
                    </span>
                </p>
            </div>
            <div className="row">
                <button
                    className="btn btn-message btn-sm m-2"
                    onClick={(e) => {
                        this.pickupRequestPopup();
                    }}
                >
                    {" "}
                    Pick Up Shift{" "}
                </button>
            </div>
        </div>
        )

    }
}