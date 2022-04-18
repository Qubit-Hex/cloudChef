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



// export action creators
import { ChangeAddress } from './modules/changeAddress';
import { ChangeLocation } from './modules/changeLocation';
import { ChangePhone } from './modules/changePhone';

/**
 *
 *  @component: ChangePasswordModal
 *
 *  @purpose: to render the change password modal
 *
 */

const ChangePasswordModal = (props) => {

/**
 *
 *  @function: request
 *
 *
 *  @purpose: inorder to preform the request that will change the password.
 *
 */
    const request = () => {
        // the request to change the password of the user
        const api = new FetchServiceProvider();
        const route = '/api/store/settings/changePassword';

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        // data that we will be sending the request to the server
        const data = {
            'oldPassword': document.getElementById('currentPassword').value,
            'newPassword': document.getElementById('newPassword').value,
            'confirmPassword': document.getElementById('confirmPassword').value
        }

       return api.patch(route, data, headers);
    }


/**
 *
 *  @function: success
 *
 *  @purpose: inorder to render the success message after the request is successful
 *
 */

 const Success = (props) => {
     return (
         <TemplateModal title={"Password changed successfully"}
                body={
                    <div className='_success_'>
                        <h1 className='text-success h4'>
                            Password was changed successfully
                            {/** success icon font awesome */}
                             <i class="fas fa-check-circle m-2"></i>
                        </h1>
                        <div className='row'>
                            <p className='text-success'> <b> Status: </b> { props.message } </p>
                            <img src='/img/SVG/password_icon.svg' className='d-block mx-auto' width={300} height={300} />
                        </div>
                    </div>
                } />)
 }


 /**
  *
  *  @function: Error
  *
  * @purpose: inorder to render the error message after the request is unsuccessful
  *
  */

 const Error = (props) => {

    return (
        <TemplateModal title={"Password change failed"}
            body={
                <div className='_error_'>
                    <h1 className='text-danger h4'>
                        Password change failed
                        {/** error icon font awesome */}
                        <i class="fas fa-times-circle m-2"></i>
                    </h1>
                    <div className='row'>
                        <p className='text-danger'> <b> Reason: </b> { props.message }</p>
                        <img src='/img/SVG/password_icon.svg' className='d-block mx-auto' width={300} height={300} />
                    </div>
                </div>
            } />)
 }


 /**
  *
  *  @function: validate
  *
  *
  * @purpose: inorder to validate the form that we have submitted
  *
  */

 const validate = (e) => {
    // get the form elemeents of the fomr
    const oldPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    // function inorder to check if the form is valid or not
    const triggerError = (element) => {
        // check if the element is empty
        if (element.value.length === 0) {
            // if the element is empty then add the error class
            element.classList.add('is-invalid');
            // create the error message to the parentElement

            // first check does an error message already exist
            if (!element.parentElement.querySelector('.invalid-feedback')) {
                element.parentElement.insertAdjacentHTML('beforeend', `<div class="invalid-feedback"> This Field is required </div>`);
            }
            return false;
        }
        // lets just check if the element empty we will leave more flexibility to the programmer
        element.classList.remove('is-invalid');
        // add the success class
        element.classList.add('is-valid');
        // remove the error message if one exists
        if (element.parentElement.querySelector('.invalid-feedback')) {
            element.parentElement.querySelector('.invalid-feedback').remove();
        }

        return true;
    }

    // test object...
    const tests = {
        'oldPassword': triggerError(oldPassword),
        'newPassword': triggerError(newPassword),
        'confirmPassword': triggerError(confirmPassword)
    };

    // check if all the tests are true
    if (Object.keys(tests).every(key => tests[key])) {
        // submit the request to change the password if the form is valid
        return request();
    }
    // return false if the form is not valid.
    return new Promise((resolve, reject) => {
        resolve(false);
    });
 }


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

                         <form onSubmit={
                             (e) => {
                                e.preventDefault();
                                const container = document.getElementById('modal-container');
                                // validate the request before sending it to the server
                                return validate(e).then(response => {
                                    // check the status of the request
                                    if (response.status === 200) {
                                        // if the request was successful then render the success message
                                        ReactDOM.render(<Success  message={response.message}/>, container);
                                    }
                                    else {
                                         ReactDOM.render(<Error message={response.message} />, container);
                                    }
                                })
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

                            <button type='submit' className='btn btn-message' >
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

    /**
     *
     * @function LoadSettings
     *
     *
     *  @purpose: inorder to load the user settings
     *
     */

    const LoadSettings = () => {
        const container = document.getElementById('modal-container');
        const selected = document.getElementById('settings');

        // route the appropriate component to the modal container
        // inorder for us to proccess our request
        switch(selected.value) {
            case 'address':
                ReactDOM.render(<ChangeAddress />, container);
            break;
            case 'phone':
                ReactDOM.render(<ChangePhone />, container);
            break;
            case 'location':
                ReactDOM.render(<ChangeLocation />, container);
            break;
        }

        console.log(selected.value);
    }


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
                        <div className='row'>
                                <select className='form-select mt-1 mb-1' id='settings'>
                                    <option value=''> Please Select an option.</option>
                                    <option value='address'> Change Address</option>
                                    <option value='phone'> Change Phone Number</option>
                                    <option value='location'> Change Location  </option>
                                </select>
                        </div>

                        <div className='row'>
                            <button className='btn btn-message mt-1' onClick={
                                (e) => {
                                    return LoadSettings();
                                }
                            }>
                                Change Settings
                            </button>
                        </div>
                    </div>
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
                        <b className='text-center'>Change your password</b>
                        <button className='btn btn-message mt-2' onClick={
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
                    <b className='text-center'>Change your user settings</b>
                    <button className='btn btn-message mt-2' onClick={
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
