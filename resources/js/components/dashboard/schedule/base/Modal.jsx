/**
 *
 *  @file: Modal.jsx
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 */


import React from "react";
import ReactDOM from "react-dom";


/**
 *
 *  @component: Modal
 *
 *  @description: This component is responsible for rendering the <MODAL>
 */

export const Modal = (props) => {



    // close the modal container is.
    const closeWindow = () => {
        let container = document.getElementById('modal-container');
        // unmount the component
        return ReactDOM.unmountComponentAtNode(container);
    }

    return (
        <div className="modal apply-modal-animation schedule-modal">
        <div
            className="modal-dialog">
            <div className="modal-content w-75">
                <div className="modal-header">
                    <h5 className="modal-title "> { props.title } </h5>
                    <button
                        type="button"
                        className="btn-transparent modal-close far fa-times-circle"
                        aria-label="Close"
                        onClick={(e) => {
                            e.preventDefault();
                            closeWindow();
                        }}
                    ></button>
                </div>
                <div
                    className="modal-body"
                    style={{
                        padding: "50px",
                    }}>
                        {props.body }
                </div>
            </div>
        </div>
    </div>
    );

}

