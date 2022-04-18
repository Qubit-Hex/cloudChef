/**
 *
 *  @file: changeAddress.jsx
 *
 *  @description: This component is used to change the address of the user.
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { TemplateModal } from '../../recipe/core/template.modal';




export const ChangeAddress = (props) => {

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
                           Address was changed successfully
                           {/** success icon font awesome */}
                            <i class="fas fa-check-circle m-2"></i>
                       </h1>
                       <div className='row'>
                           <p className='text-success'> <b> Status: </b> { props.message } </p>
                           <img src='/img/SVG/map.svg' className='d-block mx-auto' width={300} height={300} />
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
                       Address  change failed
                       {/** error icon font awesome */}
                       <i class="fas fa-times-circle m-2"></i>
                   </h1>
                   <div className='row'>
                       <p className='text-danger'> <b> Reason: </b> { props.message }</p>
                       <img src='/img/SVG/map.svg' className='d-block mx-auto' width={300} height={300} />
                   </div>
               </div>
           } />)
}


/**
 *
 *  @function: request
 *
 *  @purpose: inorder to preform the request to the server.
 *
 */

const request = (address) => {
    const api = new FetchServiceProvider();
    const route = '/api/store/settings/changeAddress';

    const data = {
        address: address
    }

    const headers = {
        'Content-Type': 'application/json',
        'accessToken': api.getCookie('accessToken')
    }

    return api.patch(route, data, headers);
}


/**
 *
 *  @function: validate
 *
 *  @purpose: inorder to validate the form
 */

    function validate() {
        const address = document.getElementById('address');

        if (address.value.length < 1) {
            // post a error messsage to the field
            address.classList.add('is-invalid');
            // add a message to the parent
            if (!address.parentElement.querySelector('.invalid-feedback')) {
                const parentEl = address.parentElement;

                parentEl.appendChild(document.createElement('div')).classList.add('invalid-feedback');
                parentEl.querySelector('.invalid-feedback').innerHTML = 'Address is required';
            }

            return new Promise((resolve, reject) => {
                resolve('Address is required');
            });
        }

        // remove the errors since the form is valid
        else {
            if (address.parentElement.querySelector('.invalid-feedback')) {
                address.classList.remove('is-invalid');
                address.parentElement.lastChild.remove();
            }

            return request(address.value);
        }
    }


    return (
        <TemplateModal title="Change Address"
            body={
                <div className='_address_'>

                    <h1 className='header-subtitle'>
                        Change Address
                    </h1>
                    <img src='/img/SVG/map.svg' width={300} height={300} className='d-block mx-auto' />


                    <div className='form-group'>
                        <label htmlFor='address'>New Address <span className='text-muted'> example "123 smith st" </span></label>
                        <input type='text' className='form-control mt-2 mb-2' id='address' placeholder='Address' />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-message mt-2 mb-2' onClick={
                            async (e) => {
                                let container = document.getElementById('modal-container');
                                const response = await validate();

                                // handle the response that is returned from the server.
                                if (response.status === 200 || response.status === 'success') {
                                    ReactDOM.render(<Success message={response.message} />, container);
                                } else {
                                    // render the error
                                    ReactDOM.render(<Error message={response.message} />, container);
                                }


                            }}>Change Address</button>
                    </div>
                </div>
            } />
    )
}
