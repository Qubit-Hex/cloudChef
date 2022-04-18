/**
 *
 *  @file: employee.add.jsx
 *
 *
 *  @purpose : this component is used to render the add modal for adding an employee
 *
 */


import { ajaxPrefilter } from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { TemplateModal } from "../recipe/core/template.modal";


// perform fetch request inorder to add the employeee to the system
/**
 *
 *  @function : createEmployee
 *
 *  @purpose: this function is used to preform the request to add an employee to the database.
 *
 *
 */

const createEmployee =  async (request) => {

    const api = new FetchServiceProvider();
    const url = '/api/store/employees/add';

    // PLEASE NOTE THAT A PARMAETER CONTAINS THE DATA THAT IS BEING SENT TO THE SERVER
    // JUST IN CASE YOU WANT TO SEE WHAT IS BEING SENT TO THE SERVER, YOU CAN SEE IT IN THE CONSOLE
    // console.log(request);

    const headers ={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accessToken': api.getCookie('accessToken')
    }

    return await api.post(url, request, headers);
}

/**
 *
 *  @function: validateForm
 *
 * @purpose: this function is used to validate the form
 *
 */

const validateForm = (e) => {

    // gather all of the form elements that we will be working with
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const position = document.getElementById('department');
    const salary = document.getElementById('salary');
    const dob = document.getElementById('dob');

        // closure to auth generate a password

    const generatePassword = () => {
        // generate a random password
        // but just this function isnt a "TRUE" random password generator
        // it is subject to probability attacks
        // we set a expiration date for the password
        // to prevent the password from being used again
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return password;
    }

    // validate any textual elements that are required
    const validateTextInput = (el) => {
        if (el.value === '' || el.value < 5) {
            el.classList.add('is-invalid');
            let spawnElement = el.parentElement.appendChild(document.createElement('div'));
            // check do we already have a error message if we dont one then we will span a new element
            if (!el.parentElement.querySelector('.invalid-feedback')) {
            spawnElement.classList.add('invalid-feedback');
            spawnElement.innerHTML = 'This field is required';
            }
            return false;
        } else {
            // remove the error class
            el.classList.remove('is-invalid');
            // remove spawn element
            if (el.parentElement.querySelector('.invalid-feedback')) {
                el.parentElement.querySelector('.invalid-feedback').remove();
            }
            return true;
        }
    }

    // validate the email
    const validateEmail = (el) => {

        let email = el.value;
        // use regex to validate the email that we recived from the form
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            el.classList.remove('is-invalid');
            if (el.parentElement.querySelector('.invalid-feedback')) {
                el.parentElement.querySelector('.invalid-feedback').remove();
            }
            return true;
        } else {
            el.classList.add('is-invalid');
            let spawnElement = el.parentElement.appendChild(document.createElement('div'));
            // check do we already have a error message if we dont one then we will span a new element
            if (!el.parentElement.querySelector('.invalid-feedback')) {
            spawnElement.classList.add('invalid-feedback');
            spawnElement.innerHTML = 'Please enter a valid email';

            }
            return false;
        }
    }

    // validate a phone number
    const validatePhone = (el) => {
        let phone = el.value;
        // strip all non numeric characters from the phone number
        phone = phone.replace(/\D/g,'');

        // check if the phone number is valid
        if (phone.length === 10 || phone.length === 11) {
            el.classList.remove('is-invalid');
            if (el.parentElement.querySelector('.invalid-feedback')) {
                el.parentElement.querySelector('.invalid-feedback').remove();
            }
            return true;
        } else {
            el.classList.add('is-invalid');
            let spawnElement = el.parentElement.appendChild(document.createElement('div'));
            // check do we already have a error message if we dont one then we will span a new element
            if (!el.parentElement.querySelector('.invalid-feedback')) {
            spawnElement.classList.add('invalid-feedback');
            spawnElement.innerHTML = 'Please enter a valid phone number';
            }
            return false;
        }
    }

    // validate all the inputs and return true or false
    const validate = () => {
        let valid = true;
        if (!validateTextInput(name)) {
            valid = false;
        }
        if (!validateTextInput(address)) {
            valid = false;
        }
        if (!validateTextInput(position)) {
            valid = false;
        }
        if (!validateTextInput(salary)) {
            valid = false;
        }
        if (!validateEmail(email)) {
            valid = false;
        }
        if (!validatePhone(phone)) {
            valid = false;
        }
        return valid;
    }

    if (validate()) {
        // form our request that we will be sending to the server inorder to create a new employee
        const request = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            position: position.value,
            salary: salary.value,
            dob: dob.value,
            password: generatePassword()
        }

        // send the request to the server
        createEmployee(request).then((response) => {

            let container = document.getElementById('modal-container');
            // the resonse from the server
            if (response.status === 'success' || response.status === 200) {
                // return the success message to the client
                return ReactDOM.render(<TemplateModal title={"Success"}
                body={
                    <div>

                        <img src='/img/SVG/employee_card.svg' width={300} height={300} alt='employee card' className='mx-auto'/>
                        <p>
                            <strong>
                                {response.message}
                            </strong>
                        </p>
                    </div>
                } />, container);

            } else {
                // display the error message to the client
                return ReactDOM.render(<TemplateModal title={"Error"}
                body={
                    <div>
                        <p>
                            <strong>
                                {response.message}
                            </strong>
                        </p>
                    </div>
                } />, container);

            }
        });
    }
    e.preventDefault();

}

export const EmployeeAddModal = (props) => {

    return (
        <TemplateModal title={
            <div>
                <h3>
                    <span style={{
                        fontWeight: 'bold',
                    }}> Add Employee  </span>
                    {/** font awesome user tie */}
                    <i className="fas fa-user-tie"></i>

                    <span style={{
                        fontSize: '0.7em',
                    }}>
                       <small> Build your team the way you want </small>
                    </span>
                </h3>
                {/** font awesome employee suit icon large  */}
            </div>
        } body={
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='header-subtitle text-center'>
                            Add Employee
                        </h1>
                        <form className='form-check' onSubmit={
                            (e) => {
                                // prevent default form submission
                                e.preventDefault();
                                // send our form throught the validation function.
                               return validateForm(e);
                            }
                        }>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' className='form-control mt-2 mb-2' id='name' placeholder='Enter name' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='dob'> Date of Birth</label>
                            <input type='date' className='form-control mt-2 mb-2' id='dob' placeholder='Enter date of birth' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' className='form-control mt-2 mb-2' id='email' placeholder='Enter email' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone</label>
                            <input type='text' className='form-control mt-2 mb-2' id='phone' placeholder='Enter phone' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input type='text' className='form-control mt-2 mb-2' id='address' placeholder='Enter address' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department"> Department </label>
                            <select className="form-control mt-2 mb-2" id="department">
                                <option> Select Department </option>
                                <option> IT </option>
                                <option> HR </option>
                                <option> Finance </option>
                                <option> Marketing </option>
                                <option> Sales </option>
                            </select>

                        </div>
                        <div className='form-group'>
                            <label htmlFor='salary'>Yearly Salary</label>
                            <input type='text' className='form-control  mt-2 mb-2' id='salary' placeholder='Enter salary' />
                        </div>
                        {/** password fields will be auto generated */}

                        <button type='submit' className='btn btn-message mx-auto mt-4'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        } />
    );
}
