/**
 *
 *  @class: MessageBox
 *
 *
 *  @purpose: This component is used to display a message box.
 */

import React from "react";
import ReactDOM from "react-dom";


export class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            profile: this.props.profile,
            message: null,
        };
    }

    /**
     *  @method: hideModal
     * 
     *  @purpose: This method is used to hide the modal.
     * 
     */


    hideModal() {
        let modal = document.getElementById('message-box-container');
        return ReactDOM.render('', modal);
    }

    /**
     * 
     *   @method: successMessage
     * 
     *   @purpose : This method is used to display a success message.
     */



    successMessage() {
        let modal = document.getElementById('message-box-container');
        return ReactDOM.render(
            <div class="modal">
            <div class="modal-dialog fade-enter-active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="header-subtitle"> <i class="fas fa-info-circle mr-4"></i>  Infomation</h5>

                        <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {this.hideModal() }}></button>
                       
                    </div>
                    <div class="modal-body">

                    <div className='success-message-wrapper'>
                    <i className="fas fa-check-circle"></i>
                    <span className='success-message ml-4'>Message was sent successfully!</span>
                    </div>


                    <img src='/img/SVG/network_outline.svg' class='img-fluid' />


                    </div>
                    
                </div>
            </div>
        </div>
            
            , modal);

    }

    /**
     * 
     *  @method: failureMessage
     * 
     *  @purpose: This method is used to display a failure message.
     * 
     */



    failureMessage() {
        let modal = document.getElementById('message-box-container');

        return ReactDOM.render(
            <div class="modal">
            <div class="modal-dialog apply-scale-entrance">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Message Sent!</h5>
                        <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {this.hideModal() }}></button>
                    </div>
                    <div class="modal-body">

                    <div className='failure-message-wrapper'>
                    <i class="fas fa-comment-slash failure-message"></i>
                    <p className='failure-message ml-4'> Message failed to send! </p>
                    </div>

                    </div>
                </div>
            </div>
        </div>
           ,
            modal);

    }



    /**
     *  @method: validation
     *
     */


    validation(e) {
        if (e.target.value.length > 0) {
            this.setState({
                message: e.target.value
            });

            return true;
        } else {
            return false;
        }
    }

    /**
     *
     *
     *  @method: render
     *  `
     *  @purpose: This method is used to render the  MessageBox component.
     *
     *
     */

    render() {
        return (
                <div class="modal apply-scale-entrance">
                    <div class="modal-dialog fade-enter-active">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Send Message</h5>
                                <button
                                    type="button"
                                    class="btn-transparent modal-close far fa-times-circle"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {this.hideModal() }}></button>
                            </div>
                            <div class="modal-body">
                                <form>

                                    <div className='form-group'>
                                        <label htmlFor='message'>Recipients: </label>
                                        <img src={this.state.profile} className='img-fluid ml-4 profile-img-sm' alt='face' />
                                        <span className='role-badge badge badge-primary card-text-sub-text ml-2 bold'> {this.state.user} </span>
                                    </div>

                                    <div className="form-group">    
            
                                        <label for='message'>Message</label>
                                        <textarea onChange={ (e) => { this.validation(e); } }class="form-control" id="message" rows="3"></textarea>
                                    </div>

                                </form>
                                 
                            <button className='btn btn-message mt-2' onClick={ (e) => {this.successMessage()}}> Send <i className='fas fa-paper-plane'></i></button>
                            <button className='btn btn-danger mt-2' onClick={ (e) => {this.hideModal() }}> Cancel <i className='fa fa-ban'></i></button>
                            </div>

                        </div>
                    </div>
                </div>
        );
    }
}
