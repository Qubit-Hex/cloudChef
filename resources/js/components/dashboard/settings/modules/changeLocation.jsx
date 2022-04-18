/**
 *
 *  @file: changeLocation.jsx
 *
 *  @description: This component is used to change the location of the user.
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { TemplateModal } from '../../recipe/core/template.modal';


/**
 *
 *
 *  @file: changeLocation.jsx
 *
 *
 *  @description: This component is used to change the location of employee in that db.
 *
 *
 */


export const ChangeLocation = (props) => {


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
                           Location was changed successfully
                           {/** success icon font awesome */}
                            <i class="fas fa-check-circle m-2"></i>
                       </h1>
                       <div className='row'>
                           <p className='text-success'> <b> Status: </b> { props.message } </p>
                           <img src='/img/SVG/building.svg' className='d-block mx-auto' width={300} height={300} />
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
                       Location change failed
                       {/** error icon font awesome */}
                       <i class="fas fa-times-circle m-2"></i>
                   </h1>
                   <div className='row'>
                       <p className='text-danger'> <b> Reason: </b> { props.message }</p>
                       <img src='/img/SVG/building.svg' className='d-block mx-auto' width={300} height={300} />
                   </div>
               </div>
           } />)
}

/**
 *
 *  @function: validate
 *
 *  @purpose: inorder to validate the form
 *
 */
    const validate = (city, state) => {
        if (city.value === '' || state.value === '' || city.value.length  === null || state.value.length === null) {
            // add the error base cases
            if (!city.classList.contains('is-invalid')) {
                city.classList.add('is-invalid');
                // add the error message
                city.parentElement.appendChild(document.createElement('div')).classList.add('invalid-feedback');
                city.parentElement.lastChild.innerHTML = 'Invalid field must contain at least 2 characters';

                return new Promise((resolve, reject) => {
                    reject({
                        status: false,
                        message: 'Invalid field must contain at least 2 characters'
                    });
                });
            }

            if (!state.classList.contains('is-invalid')) {
                state.classList.add('is-invalid');
                state.parentElement.appendChild(document.createElement('div')).classList.add('invalid-feedback');
                state.parentElement.lastChild.innerHTML = 'Invalid field must contain at least 2 characters';

                return new Promise((resolve, reject) => {
                    reject({
                        status: false,
                        message: 'Invalid field must contain at least 2 characters'
                    });
                });
            }
        }

        // REMOVE THE ERROR ELEMENTS
        if (city.classList.contains('is-invalid')) {
            city.classList.remove('is-invalid');
            city.parentElement.lastChild.remove();
        }

        if (state.classList.contains('is-invalid')) {
            state.classList.remove('is-invalid');
            state.parentElement.lastChild.remove();
        }

        return request(city.value, state.value);
    }


    /**
     *
     *  @function: request
     *
     *  @purpose: inorder to send the request to the server
     *
     */

    const request = (city, state) => {
        const api = new FetchServiceProvider();
        const route = '/api/store/settings/changeLocation';

        const data = {
            city: city,
            state: state
        }

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return api.patch(route, data, header);
    }


    return (
        <TemplateModal title="Change Location"
            body={
                <div className='_address_'>

                    <h1 className='header-subtitle'>
                        Change Location
                    </h1>

                    <div className='row'>
                        <img src='/img/SVG/building.svg' width={300} height={300} className='d-block mx-auto' />
                    </div>

                    {/** location of the employee (state, and city ) */}
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <label htmlFor='state'>State / Province </label>
                                <input type='text' className='form-control mt-2 mb-2' id='state' placeholder='State' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='city'>City</label>
                                <input type='text' className='form-control mt-2 mb-2' id='city' placeholder='City' />
                            </div>

                            <div className='form-group'>
                                <button className='btn btn-message mt-2 mb-2' onClick={
                                    (e) => {
                                        const container = document.getElementById('modal-container');
                                        const city = document.getElementById('city');
                                        const state = document.getElementById('state');

                                        return validate(city, state).then((response) => {
                                            if (response.status === 'success')  {
                                                ReactDOM.render(<Success message={response.message} />, container);
                                            } else {
                                                ReactDOM.render(<Error message={response.message} />, container);
                                            }
                                        });
                                    }
                                }>
                                    Change Location
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            } />
    )
}
