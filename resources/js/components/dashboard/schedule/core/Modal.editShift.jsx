/**
 *
 *  @file: Modal.editShift.jsx
 *
 *  @purpose: inorder to render the edit shift modal
 *
 */



import React from 'react';
import ReactDOM from 'react-dom';

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
        <div>
            
        </div>
    )


}


