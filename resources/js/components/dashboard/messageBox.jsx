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
     *
     *  @method: render
     *  `
     *  @component: Message
     *
     *
     */

    render() {
        return (
                <div class="modal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Send Message</h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 onClick={ (e) => {this.hideModal() }}></button>
                            </div>
                            <div class="modal-body">
                                <form>

                                    <div className='form-group'>
                                        <label htmlFor='message'>Recipients: </label>
                                        <img src={this.state.profile} alt='face' width='50px' height='50px' className='img-fluid ml-4 profile-img' />
                                        <span className='role-badge badge badge-primary card-text-sub-text ml-2 bold'> {this.state.user} </span>
                                    </div>

                                    <div className="form-group">    
            
                                        <label for='message'>Message</label>
                                        <textarea class="form-control" id="message" rows="3"></textarea>
                                    </div>

                                </form>
                                 
                            </div>
                            <div class="modal-footer">
                                 <button className='btn btn-danger' onClick={ (e) => {this.hideModal() }}> Cancel <i className='fa fa-ban'></i></button>
                                 <button className='btn btn-success'> Send <i className='fas fa-paper-plane'></i></button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
