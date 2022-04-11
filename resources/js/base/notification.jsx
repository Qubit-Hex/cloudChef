/**
 *
 *  @file: notification
 *
 *
 *  @purpose: this component is responsible for displaying the notifications
 */



import React from "react";
import ReactDOM from 'react-dom';



/**
 *
 *
 *  @function: ErrorNotification
 *
 *  @purpose: this function is responsible for rendering the error message if no data is present
 *
 */


export const ErrorNotification = (props) => {

    {/** make a bootstrap alert to display a error notification  */}
    return (
        <div className="alert alert-danger alert-container" role="alert" id='notification-child'>
            {/** display a x */}

            <i className='fa fa-close fa-3x close' onClick={
                (e) => {
                    ReactDOM.unmountComponentAtNode(document.getElementById('notification-container'));
                }
            }></i>

           <div className='text-center'>
                <strong>Oh snap!</strong>
                {/** add our error image here inorder to show that no data was returned from the server. */}
                <p>{ props.message }.</p>

           </div>
        </div>
    )
}


/**
 *
 *  @function: SuccessNotification
 *
 *  @purpose: this function is responsible for rendering the success message if no data is present
 *
 */


export const SuccessNotification = (props) => {

    {/** make a bootstrap alert to display a success notification  */}
    return (
        <div className="alert alert-success alert-container" role="alert" id='notification-child'>
            {/** display a x */}

            <i className='fa fa-close fa-3x close' onClick={
                (e) => {
                    ReactDOM.unmountComponentAtNode(document.getElementById('notification-container'));
                }
            }></i>

            <div className='text-center'>
                <strong>Success!</strong>
                {/** add our error image here inorder to show that no data was returned from the server. */}
                <p>{ props.message }.</p>

            </div>
        </div>
    )
}


/**
 *
 *  @function: WarningNotification
 *
 *  @purpose: this function is responsible for rendering the warning message if no data is present
 *
 */

export const WarningNotification = (props) => {

        {/** make a bootstrap alert to display a warning notification  */}
        return (
            <div className="alert alert-warning alert-container" role="alert" id='notification-child'>
                {/** display a x */}

                <i className='fa fa-close fa-3x close' onClick={
                    (e) => {
                        ReactDOM.unmountComponentAtNode(document.getElementById('notification-container'));
                    }
                }></i>

                <div className='text-center'>
                    <strong>Warning!</strong>
                    {/** add our error image here inorder to show that no data was returned from the server. */}
                    <p>{ props.message }.</p>

                </div>
            </div>
        )
}
