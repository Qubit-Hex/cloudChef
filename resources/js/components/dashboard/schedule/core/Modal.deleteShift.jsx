/**
 *
 *
 *  @file:  Modal.deleteShift.jsx
 *
 *
 *
 *  @purpose: inorder to render the delete shift modal
 *
 */

 import React from 'react';
 import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
 import { Modal } from '../base/Modal';


 /**
  *
  *
  *  @component: ModalDeleteShift
  *
  *
  *  @purpose: This is responsible for rendering the delete shift functionality to the form. and delete the shift passed to the component
  *
  *  @props:  Shift: <SHIFT OBJECT>
  *
  */

 export const ModalDeleteShift = (props) => {


    const request = async () => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/shifts/delete';

        // we have to send the shift details inorder to the request to go through
        const header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'day': props.day + 1,
            'employee': props.employeeID,
            'scheduleID': props.scheduleID
        }

        // send the request to the server
        return await api.delete(route, header);
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
                                    <h3>Shift Deleted Successfully</h3>
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
                                    <h3>Shift Not Delete please check the request and try again. </h3>
                                </div>
                            </div>
                        } />
     )
    }



    return (
        <Modal title='Delete Shift'
                body={
                    <div>
                        <div className='_img_ text-center mx-auto' >
                            <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                            <h1 className='text-danger' style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}> Are you sure you want to delete this shift </h1>
                            <b className='text-danger'> This cannot be reversed. </b>
                        </div>

                        <div className='form-group d-flex'>
                        <button className='btn btn-danger m-2' onClick={
                            (e) => {
                                // close the modal of the application
                                const container = document.getElementById('modal-container');
                                return ReactDOM.unmountComponentAtNode(container);
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
                                        ReactDOM.render(<HandleSuccess />, container);
                                    } else {
                                         ReactDOM.render(<HandleError />, container);
                                    }

                                });
                            }
                        }>
                            <i className="far fa-calendar-alt"></i>
                            Delete Shift
                        </button>
                    </div>



                    </div>
                } />
    )


 }
