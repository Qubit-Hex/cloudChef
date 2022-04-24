/**
 *
 *  @file: Modal.deleteScheduke.jsx
 *
 *
 *
 *  @purpose: inorder to delete the schedules in the system
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import FetchServiceProvider from '../../../../lib/fetchServiceProvider';
import { Modal } from '../base/Modal';




export const ModalDeleteSchedule = (props) => {

    // debug
    console.log(props);

    const request = async (scheduleID, employeeID) => {
      // implement the api call inorder to delete the schedule and the details of the schedule form the database
      const api = new FetchServiceProvider();
      const route = '/api/store/schedule/delete';

      const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'accessToken': api.getCookie('accessToken'),
        'scheduleID': scheduleID,
        'employeeID': employeeID
      }

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
            <Modal title="Delete Schedule"
                body={
                    <div>
                            <div className='_img_ text-center mx-auto' >
                            <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                            <h1 className='text-center text-danger'>
                                <i className='fa fa-circle-xmark fa-beat'></i>
                            </h1>
                            <h1 className='text-danger' style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}>
                            {/** add a danger iocn with fa-beat  */}

                                 Are you sure you want to delete this schedule. </h1>
                            <b className='text-danger'> This cannot be reversed. </b>
                        </div>


                        <div className='form-group d-flex'>
                        <button className='btn btn-danger m-2' onClick={
                            (e) => {
                                const container = document.getElementById('modal-container');
                                return ReactDOM.unmountComponentAtNode(container);
                            }
                        }>
                            <i className='fas fa-trash-alt'></i>
                            Cancel
                        </button>
                        <button className='btn btn-message m-2' onClick={
                            (e) => {
                                // send the request to the server
                                return request(props.scheduleId, props.employeeID).then((response) => {
                                    console.log(response);
                                });
                            }
                        }>
                            <i className='fas fa-trash-alt'></i>
                            Delete Schedule
                        </button>
                    </div>
                    </div>
                } />
        )
}
