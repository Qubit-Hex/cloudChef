/**
 *
 *
 *  @component: TemplateModal
 *
 *
 *
 *  @purpose: This is template for generating modals for the recipe section.
 *
 *
 */

import React from "react";
import ReactDOM  from "react-dom";

 export const TemplateModal = (props) => {

    // close the modal container is.
    const closeWindow = () => {
        let container = document.getElementById('modal-container');
        // unmount the component
        return ReactDOM.unmountComponentAtNode(container);
    }

    return (
        <div className="modal apply-modal-animation recipe-modal">
        <div
            className="modal-dialog">
            <div class="modal-content w-75">
                <div class="modal-header">
                    <h5 class="modal-title "> { props.title } </h5>
                    <button
                        type="button"
                        class="btn-transparent modal-close far fa-times-circle"
                        aria-label="Close"
                        onClick={(e) => {
                            e.preventDefault();
                            closeWindow();
                        }}
                    ></button>
                </div>
                <div
                    class="modal-body"
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
