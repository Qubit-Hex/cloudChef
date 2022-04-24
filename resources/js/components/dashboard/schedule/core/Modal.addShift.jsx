/**
 *
 *  @file: Modal.addShift.jsx
 *
 *  @purpose: inorder to render the add shift modal
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { Modal } from '../base/Modal';

/***
 *
 *  @component: ModalAddShift
 *
 *  @purpose: This is responsible for rendering the add shift functionality to the form.
 *
 *
 *
 */

 export const ModalAddShift = (props) => {

    // request  to our api inorder to send the shifts to the database
    // inorder to edit / add new shifts.

    const request = async () => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/shifts/add';


        const start_time  = document.getElementById('In').value;
        const end_time = document.getElementById('Out').value;
        const is_off = document.getElementById('offDay').checked;

        const data = {
            start_time: start_time,
            end_time: end_time,
            is_off: is_off,
            day: props.day + 1,
            employee: props.employeeID,
            scheduleID: props.scheduleID
        }

        const header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        }

        // send the request to the server
        return await api.post(route, data, header);
    }

    /**
     *
     * @function: handleSuccess
     *
     * @purpose: This is responsible for handling the success response from the server
     *
     */

    const HandleSuccess = () => {
        return (
            <Modal title='Success'
                        body={
                            <div>
                                <div className='_img_ text-center mx-auto' >
                                    <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                                </div>

                                <div className='text-center'>
                                    {/** add a font awesome icon */}
                                    <i className='fa fa-check-circle fa-4x text-success'></i>
                                    <h3>Shift Added Successfully</h3>
                                </div>
                            </div>
                        } />
        );
    }

    /**
     *
     * @component: HandleError
     *
     *  @purpose: This is responsible for rendering the error modal
     *
     */
    const HandleError = () => {

        return (
            <Modal title='Error'
                        body={
                            <div>
                                <div className='_img_ text-center mx-auto' >
                                    <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />

                                </div>

                                <div className='text-center'>
                                    {/** add a font awesome icon */}
                                    <i className='fa fa-times-circle fa-4x text-danger'></i>
                                    <h3>Shift Not Added</h3>
                                </div>
                            </div>
                        } />)
    }


    return (
        <Modal title="Add Shift"
            body={
                <div>

                    <div className='_img_ mx-auto text-center'>
                        <img src='/img/SVG/schedule_icon_alt.svg' width={250} height={250} />
                        <h1 className='header-subtitle'> Add a shift. </h1>
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="In"> Start Time </label>
                        <input type="time" className="form-control mt-1" id="In" placeholder="In" />
                    </div>

                    <div className='form-group mt-1'>
                        <label htmlFor="Out">End Time </label>
                        <input type="time" className="form-control mt-1" id="Out" placeholder="Out" />
                    </div>

                    <div className='form-group mt-1'>

                    <label htmlFor='OffDay'>Off</label>
                        <input type="checkbox"  onClick={
                            (e) => {

                                // if the check box is check disable the start time and end time
                                if (document.getElementById('offDay').checked) {
                                    document.getElementById('In').disabled = true;
                                    document.getElementById('Out').disabled = true;
                                } else {
                                    document.getElementById('In').disabled = false;
                                    document.getElementById('Out').disabled = false;
                                }
                            }
                        } className="form-check-input" id="offDay" placeholder="Off Day"  style={{
                            position: 'relative',
                            left: '10px',
                         }}/>
                    </div>

                    <div className='form-group d-flex'>
                        <button className='btn btn-danger m-2' onClick={
                            (e) => {
                                // close the modal of the application
                                const container = document.getElementById('modal-container');
                                ReactDOM.unmountComponentAtNode(container);

                            }
                        }>
                            <i className='fas fa-trash-alt'></i>
                            Cancel
                        </button>
                        <button className='btn btn-message m-2' onClick={
                            (e) => {
                                const container = document.getElementById('modal-container');
                                const timeIn = document.getElementById('In').value;
                                const timeOut = document.getElementById('Out').value;
                                const offDay = document.getElementById('OffDay');


                               return request().then((response) => {
                                    if (response.status === 'success') {
                                        ReactDOM.unmountComponentAtNode(container);
                                        ReactDOM.render(<HandleSuccess />, container);
                                    } else {
                                        ReactDOM.unmountComponentAtNode(container);
                                        ReactDOM.render(<HandleError />, container);
                                    }
                               });
                            }
                        }>
                            <i className="far fa-calendar-alt"></i>
                            Create Shift
                        </button>
                    </div>
                </div>
            }/>
    );
}
