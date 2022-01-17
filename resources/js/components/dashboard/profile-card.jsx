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
import { relative } from 'path-browserify';

export class ProfileCard extends Component {

    constructor(props) {
        super(props);

        // might change the user to a userID refernce number
        // and the name will be the user from the database
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

        return ReactDOM.render(<MessageBox user={this.props.user} profile={this.props.image} />, container);
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
                        <img src={this.props.image} width='25%' height='25%' alt='face' className='img-fluid mx-auto d-block profile-img' />
                        <h3 className='card-title  text-center'> {this.props.user } </h3>


{ /**  refactor this section of page inorder to clean up the code a little bit  */ }
                            {/** address section  */}


                            <ul className='list-group list-group-flush profile-info-list  text-muted text-center'>
                                <li className='list-group-item'>
                                    <i className='fas fa-map-marker-alt text-muted' alt=''>  </i>
                                    <span className='card-text-sub'> Address:
                                        <span className='card-text-sub-title'> { this.props.address}  { this.props.location }</span>
                                    </span>
                                </li>

                                <li className='list-group-item'>
                                    <i className='fas fa-envelope'> </i>
                                    <span className='card-text-sub'>
                                        <span className='card-text-sub-title'>
                                            Phone: <span className='card-text-sub-text'>  {this.props.phone} </span>
                                        </span>
                                    </span>
                                </li>

                                <li className='list-group-item'>
                                    <i className='fas fa-envelope'> </i>
                                    <span className='card-text-sub'>
                                    <span className='card-text-sub-title'>
                                        Email:
                                    </span>
                                    <span className='card-text-sub-text'>

                                        <a href='#' className='card-text-sub-text-link ml-2'>
                                            {this.props.email}
                                        </a>
                                    </span>
                            </span>

                                </li>

                                <li className='list-group-item'>
                                <i class="fas fa-user-tie"></i>
                            <span className='card-text-sub'>
                                <span className='card-text-sub-title'>
                                    Role:
                                </span>
                                <span className='card-text-sub-text'>
                                    <span className='role-badge badge badge-primary card-text-sub-text' style={ { position: relative, left: '20px' } }>
                                        {this.props.role}
                                    </span>
                                </span>
                            </span>

                                </li>

                            </ul>


                        {/** add employee role section = */}

                        {/* add message button*/}
                        <button className='btn btn-message btn-block' onClick={ (e) => { this.handleMessageBox(e); } }>
                            <span className='btn-text'>
                                Send Message
                            </span>
                        </button>
                    </div>

                </div>


            </div>

        );

    }

}
