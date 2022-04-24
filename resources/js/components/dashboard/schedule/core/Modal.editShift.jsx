/**
 *
 *  @file: Modal.editShift.jsx
 *
 *  @purpose: inorder to render the edit shift modal
 *
 */



import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { Modal } from '../base/Modal';



/**
 *
 *  @component: ModalEditShift
 *
 *
 *  @purpose: This is responsible for rendering the edit shift functionality to the form. and edit the shift passed to the component
 *
 *
 *  @props:  Shift: <SHIFT OBJECT>
 */

export const ModalEditShift = (props) => {



    /**
     *
     *  @function: request
     *
     *  @purpose: request to our api inorder to send the shifts to the database
     *
     */

    const request = async () => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/shifts/edit';


        const start_time  = document.getElementById('shift_start_time').value;
        const end_time = document.getElementById('shift_end_time').value;
        const is_off = document.getElementById('shift-off').checked;

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
        return await api.put(route, data, header);
    }

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
        <Modal title='Edit Shift'
                body={
                    <div>
                        <div className='_img_ text-center mx-auto' >
                            <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                            <h1 className='header-subtitle'> Edit a shift </h1>
                        </div>

                        <div className='text-center'>
                            {/** display the current shift  */}
                            <b> Current Shift </b>
                            <b> { props.current }</b>
                            <hr />
                        </div>

                        {/** display the forms inorder to edit the shift */}
                        <div className='form-group'>
                            <label htmlFor="shift_start_time">Start Time</label>
                            <input type="time" className="form-control" id="shift_start_time" placeholder="Enter Start Time" />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="shift_end_time">End Time</label>
                            <input type="time" className="form-control" id="shift_end_time" placeholder="Enter End Time" />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='shift-off'> OFF </label>
                            <input type='checkbox' id='shift-off' className='form-check-input' style={{
                                position: 'relative',
                                left: '10px'
                            }}  />
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
                               return request().then((response) => {
                                   if (response.status === 'success') {
                                       ReactDOM.unmountComponentAtNode(container);
                                       return ReactDOM.render(<HandleSuccess />, container);
                                   } else {
                                        ReactDOM.unmountComponentAtNode(container);
                                        return ReactDOM.render(<HandleError />, container);
                                   }
                               })
                            }
                        }>
                            {/** cog icon */}
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            Edit Shift
                        </button>
                    </div>
                    </div>
                } />
    )


}


