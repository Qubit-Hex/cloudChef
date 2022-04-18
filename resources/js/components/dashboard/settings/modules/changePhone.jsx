/**
 *
 *  @file: changePhone.jsx
 *
 *  @purpose: This component is used to change the phone number of the user.
 */



import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { TemplateModal } from '../../recipe/core/template.modal';



/**
 *
 *  @component: ChangePhone
 *
 *  @description: This component is used to change the phone number of the user.
 *
 */

export const ChangePhone = (props) => {


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
                                Phone number was changed successfully
                                {/** success icon font awesome */}
                                    <i class="fas fa-check-circle m-2"></i>
                            </h1>
                            <div className='row'>
                                <p className='text-success'> <b> Status: </b> { props.message } </p>
                                <img src='/img/SVG/mobile_phone.svg' className='d-block mx-auto' width={300} height={300} />
                            </div>
                        </div>
                    } />)
        }


        /**
         *
         *  @function: Error
         *
         *  @purpose: inorder to render the error message after the request is unsuccessful
         *
         */
        const Error = (props) => {

                return (
                    <TemplateModal title={"Password change failed"}
                        body={
                            <div className='_error_'>
                                <h1 className='text-danger h4'>
                                    Phone number change failed
                                    {/** error icon font awesome */}
                                        <i class="fas fa-check-circle m-2"></i>
                                </h1>
                                <div className='row'>
                                    <p className='text-danger'> <b> Status: </b> { props.message } </p>
                                    <img src='/img/SVG/mobile_phone.svg' className='d-block mx-auto' width={300} height={300} />
                                </div>
                            </div>
                        } />)
        }




        /**
         *
         *
         *  @async: changePhone
         *
         *
         *  @purpose: This function is used to change the phone number of the user.
         *
         */

        const request = async (phone) => {

            const api = new FetchServiceProvider();
            const route = '/api/store/settings/changePhoneNumber';

            const data = {
                phone: phone,
            }

            const headers = {
                'Content-Type': 'application/json',
                'accessToken': api.getCookie('accessToken')
            }

            return await api.patch(route, data, headers);
        }


        /**
         *
         *  @async: validate
         *
         *
         *  @purpose: This function is used to validate the phone number.
         *
         */

        const validate = async () => {
            const phone = document.getElementById('phone');

            // validate phone make sure it is not empty only numberic characters
            // and not longer than 11 characters and not less than 10


            if (phone.value.length < 10 || phone.value.length > 11 || !phone.value.match(/^[0-9]+$/)) {
                // add error to input
                if (!phone.classList.contains('is-invalid')) {
                    phone.classList.remove('is-valid');
                    phone.classList.add('is-invalid');
                    // next let display a error message to the user

                    if (!phone.parentElement.querySelector('.invalid-feedback')) {
                        phone.parentElement.appendChild(document.createElement('div')).classList.add('invalid-feedback');
                        phone.parentElement.lastChild.innerHTML = 'Invalid phone number format example (1234567890)';
                        return new Promise((resolve, reject) => {
                            // return status and message
                            resolve({
                                status: false,
                                message: 'Invalid phone number format example (1234567890)'
                            });
                        });
                    }
                    return new Promise  ((resolve, reject) => {
                           resolve({ status: false,
                            message: 'Invalid phone number format example (1234567890)'
                        });
                    });
                }
                return new Promise((resolve, reject) => {
                    resolve({
                        status: false,
                        message: 'Invalid phone number format example (1234567890)'
                    });
                });
            }
            // else if the phone number is vali
            if (phone.parentElement.querySelector('.invalid-feedback')) {
                phone.parentElement.querySelector('.invalid-feedback').remove();
                phone.classList.remove('is-invalid');
                phone.classList.add('is-valid');
            }


            phone.classList.add('is-valid');
            return await request(phone.value);
        }


    // render the modal for changing the phone number.
        return (
            <TemplateModal title={"Change Phone Number"}
                body={
                    <div className='_phone_'>

                    <h1 className='header-subtitle'>
                        Change Phone Number
                    </h1>
                    <img src='/img/SVG/mobile_phone.svg' width={300} height={300} className='d-block mx-auto' />


                    <div className='_form_'>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input type='text' className='form-control mt-1 mb-1' id='phone' placeholder='Enter Phone Number' />

                        </div>
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-message mt-2 mb-2' onClick={
                            (e) => {
                                let container = document.getElementById('modal-container');

                                return validate().then((response) => {
                                    if (response.status === 'success') {
                                        ReactDOM.render(<Success message={response.message} />, container);
                                    } else {
                                        ReactDOM.render(<Error message={response.message} />, container);
                                    }
                                });
                            }}>
                            <i class="fas fa-times-circle mr-2"></i>
                            Change Phone Number
                            </button>
                    </div>
                </div>
                } />)
}
