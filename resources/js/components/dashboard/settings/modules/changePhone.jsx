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
                            }}>
                            <i class="fas fa-times-circle mr-2"></i>
                            Change Phone Number
                            </button>
                    </div>
                </div>
                } />)
}
