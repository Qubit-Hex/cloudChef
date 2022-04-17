/**
 *
 *  @file: settings
 *
 *
 *  @purpose: to render the settings page
 */



import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../lib/fetchServiceProvider';
import { TemplateModal } from '../recipe/core/template.modal';


/**
 *
 *  @component: ChangePasswordModal
 *
 *  @purpose: to render the change password modal
 *
 */

const ChangePasswordModal = (props) => {
    // create a modal for to let the user chanfg their password
    return (
        <TemplateModal title={"Change your password "}
            body={
                <div className="row">

                    {/** describe the modal and what it does in the header before displaying the images */}

                    <h1 className='header-subtitle'>
                        Change your password
                    </h1>

                    <img src='/img/SVG/password_icon.svg' width={200} height={200} />
                    <div className="col-md-12">
                        {/** we are going to require the following fields
                         *   1. current password
                         *   2. new password
                         *   3. confirm password
                         *   4. submit button
                         */}

                         <form onSubmit={
                             (e) => {
                                e.preventDefault();
                             }
                         }>
                             <div className='form-group'>
                                    <label htmlFor='currentPassword'>Current Password</label>
                                    <input type='password' className='form-control mb-1 mt-1' id='currentPassword' placeholder='Current Password' />
                             </div>

                             <div className='form-group'>
                                    <label htmlFor='newPassword'>New Password</label>
                                    <input type='password' className='form-control mb-1 mt-1' id='newPassword' placeholder='New Password' />
                            </div>

                            <div className='form-group'>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input type='password' className='form-control mb-1 mt-1' id='confirmPassword' placeholder='Confirm Password' />
                            </div>

                            <button type='submit' className='btn btn-message'>
                                Change Password
                                <i className='fas fa-arrow-right'></i>
                                </button>
                         </form>
                    </div>
                </div>
            } />
    )
}



/**
 *
 *  @component: ChangeUserSettings
 *
 *
 *  @purpose: to render the change user settings modal
 *
 */

const ChangeUserSettings = (props) => {

    return (
        <TemplateModal title={"Change your settings "}
            body={
                <div className='userSettings'>
                    <h1 className='header-subtitle'>
                        Change your settings
                    </h1>
                    <img src='/img/SVG/account_settings.svg' className='d-block mx-auto' width={300} height={300} />
                    <div className="col-md-12">
                        <b> What would you like to modify</b>
                </div>
            } />
    );
}

export const DashboardSettings = (props) => {
    return (
    <div className='container-fluid rm-pm dashboard-content'>
        <div id='modal-container'></div>
        <div className='row'>
            <h1 className='header-subtitle' style={{
                fontWeight:  'bold',
            }}> Settings</h1>
            <small className='text-muted'>
                Change your account settings.
            </small>
            <img src='/img/SVG/data_settings.svg' width={300} height={300} className='center-block'/>

        </div>

        <div className='row'>
            {/** tiles for changing password, changing user setttings */}
            <div className='col-md-6'>
            <div className='card button-tiles'>

                    <div className='card-header bg-transparent'>
                        <h3 style={{
                            fontWeight: 'bold',
                        }}>Change Password</h3>
                    </div>

                    <div className='card-body'>
                        <img src='/img/SVG/password.svg' width={300} height={300} className='mx-auto d-block '/>
                        <p className='text-center'>Change your password</p>
                        <button className='btn btn-message' onClick={
                            (e) => {
                                // add a trigger inorder to render the pop up modal that the user will see inorder to change their password
                                const container = document.getElementById('modal-container');

                                return ReactDOM.render(<ChangePasswordModal />, container);
                            }
                        }>
                            Change Password <i className='fa fa-arrow-right'></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className='col-md-6'>
                <div className='card button-tiles'>
                    <div className='card-header bg-transparent'>
                        <h3 style={{
                            fontWeight: 'bold',
                        }}>Change User Settings</h3>
                    </div>

                <div className='card-body'>
                    <img src='/img/SVG/user_settings.svg' width={300} height={300} className='mx-auto d-block'/>
                    <p className='text-center'>Change your user settings</p>
                    <button className='btn btn-message' onClick={
                        (e) => {
                            // add a trigger inorder to render the pop up modal that the user will see inorder to change their password
                            const container = document.getElementById('modal-container');

                            return ReactDOM.render(<ChangeUserSettings />, container);
                        }
                    }>
                        Change Settings <i className='fa fa-arrow-right'></i>
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>)
}
