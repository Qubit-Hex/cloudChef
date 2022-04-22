/**
 *
 *  @file: Modal.addShift.jsx
 *
 *  @purpose: inorder to render the add shift modal
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from '../base/Modal';

/***
 *
 *  @component: ModalAddShift
 *
 *  @purpose: This is responsible for rendering the add shift functionality to the form.
 *
 *
 *  @props:  Shift: <SHIFT OBJECT>
 *
 */

 export const ModalAddShift = (props) => {

    // request  to our api inorder to send the shifts to the database
    // inorder to edit / add new shifts.
    const request = {
        // send the request for sending the information to the server

    }

    /**
     *
     * @function: handleSuccess
     *
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
                        } />
     )
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
                        <input type="checkbox" className="form-check-input" id="OffDay" placeholder="Off Day"  style={{
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
                                ReactDOM.render(<HandleSuccess />, container);
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
