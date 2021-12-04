/**
 * 
 *  file: profile-card.jsx
 * 
 * 
 *  purpose: this component is used to display the user's profile card
 * 
 */



import React, { Component } from 'react';
import { MessageBox } from './messageBox';
import ReactDOM from "react-dom";

export class ProfileCard extends Component {

    constructor(props) {
        super(props);

        // might change the user to a userID refernce number
        // and the name will be the user from the database

        this.state = {
            user: this.props.user,
            image: this.props.image,
            address: this.props.address,
            location: this.props.location,
            phone: this.props.phone,
            email: this.props.email,
            name: this.props.name,
            role: this.props.role,
        }
    }

    /**
     * 
     * @method: handleMessageBox
     * 
     * @purpose: this method is use to generate the message box component for sending 
     *        messages to the user.
     * 
     *  @param: event
     * 
     *  @return: bool sucess or failure if the message reached the database or not. 
     */


    handleMessageBox(event) 
    {
      let container = document.getElementById('message-box-container');

        return ReactDOM.render(<MessageBox user={this.state.user} profile={this.state.image} />, container);
    }



    /**
     * 
     * @method: render 
     *  
     * 
     *  purpose; inorder to render the profile card component
     * 
     * 
     *  @return: returns the profile card component
     * 
     */

    render() {
        return (
            <div className='profile_card'>

                <div class="card">

                    <div className='card-body'>
                        <img src={this.state.image} width='25%' height='25%' alt='face' className='img-fluid mx-auto d-block profile-img' />
                        <h3 className='card-title  text-center'> {this.state.user } </h3>
                        <p className='card-text text-center'>

                            {/** address section  */}
                            <p className='text-muted'>
                                <i class="fas fa-map-marker-alt"></i>
                                <span className='card-text-sub'>
                                    <span className='card-text-sub-title'>
                                        Address:
                                    </span>
                                    <span className=' ml-2 card-text-sub-text'>
                                        {this.state.address}
                                    </span>
                                    <span className='ml-2 card-text-sub-text'>
                                        {this.state.location}
                                    </span>
                                </span>
                            </p>

                            {/** phone number section  */}
                            <p className='text-muted'>
                                <i class="fas fa-phone"></i>
                                <span className='card-text-sub'>
                                    <span className='card-text-sub-title'>
                                        Phone:
                                    </span>
                                    <span className='card-text-sub-text ml-2'>
                                        {this.state.phone}
                                    </span>
                                </span>
                            </p>
                        </p>

                        {/** email section  */}

                        <p className='text-muted text-center'>
                            <i class="fas fa-envelope"></i>
                            <span className='card-text-sub'>
                                <span className='card-text-sub-title'>
                                    Email:
                                </span>
                                <span className='card-text-sub-text'>

                                    <a href='#' className='card-text-sub-text-link ml-2'>
                                        {this.state.email}
                                    </a>
                                </span>
                            </span>
                        </p>


                        {/** add employee role section = */}

                        <p className='text-muted text-center'>
                            <i class="fas fa-user-tie"></i>
                            <span className='card-text-sub'>
                                <span className='card-text-sub-title'>
                                    Role:
                                </span>
                                <span className='card-text-sub-text'>
                                    <span className='role-badge badge badge-primary card-text-sub-text ml-2 bold'>
                                        {this.state.role}
                                    </span>
                                </span>
                            </span>
                        </p>

                        {/* add message button*/}
                        <button className='btn btn-message btn-block' onClick={ (e) => { this.handleMessageBox(e); } }>
                            <span className='btn-text'>
                                Send Message
                            </span>
                        </button>
                    </div>

                    {/* last updated data from the server  */}
                    <div className='card-footer'>
                        {/* last updated section  */}
                        <p className='text-muted text-center'>
                            <i class="fas fa-calendar-alt"></i>
                            <span className='card-text-sub'>
                                <span className='card-text-sub-title'>
                                    Last Updated:
                                </span>
                                <span className='card-text-sub-text'>
                                    <span className='card-text-sub-text-date'>
                                        {/** date */}
                                        
                                    </span>
                                    <span className='card-text-sub-text-time'>
                                        {/** time */}
                                        12:00 PM
                                    </span>
                                </span>
                            </span>
                        </p>
                    </div>

                </div>


            </div>

        );

    }

}