/**
 *  @file send.endPoint
 *
 *
 *  @author: qubit-hEx
 *
 */


import { data } from "jquery";
import { repeat } from "lodash";
import React from "react";
import ReactDOM from "react-dom";


// sub imports

import FetchServiceProvider from "../../../../lib/fetchServiceProvider";


/**
 *
 * @component SendEndPoint
 *
 * @props
 *
 *  @purpose: to send Our Recipe Data to our end point for processing,,, this is the last component in the process
 *            you can stop chasing the dragon now --->
 *
 *
 *
 */




/**
 *     @component TemplateModal
 *
 *     @purpose: inorder to generate template modal
 *
 *    @props: component that you want to drop in the return statement
 *
 */



const TemplateModal = (props) => {

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
                        padding: "10px",
                    }}>
                        {props.body }

                    <div
                        class="modal-footer d-flex justify-content-center"
                        style={{
                            'marginTop' : '10px',
                            'padding': '10px'
                        }}>

                        <button
                            type="button"
                            class="btn-transparent btn-sm btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                closeWindow();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

}


/**
 *
 *  @component SendEndPoint
 *
 *
 *  @purpose to send Our Recipe Data to our end point for processing,,, this is the last component in the process
 */


export const SendEndPoint = (props) => {

    // we will hold the message from our api
    const [apiMesssage, setApiMessage] = React.useState([]);
    // add an error boundry to our component
    const [error, setError] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [imageToken, setImageToken] = React.useState(null);

    const query = props.query;


    const  sendData = async () => {
        const api =     new FetchServiceProvider();
        const route =  "/api/store/recipes/add";
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'accessToken': api.getCookie('accessToken')
        }


        // might chage this to a paramater later
        // but i have to fix the bug first...

        let data = {
            recipeSummary: query.recipeSummary,
            recipeIngredients: query.recipeIngredients,
            recipeInstructions: query.recipeInstructions,
            recipeCookingTime: query.recipeCookingTime,
            nutritionalFacts: query.nutritionalFacts,
        }

        // set our image url to the data object
        return api.post(route, data, headers);
    }

    // send the data to our api endpoint for proccessing.
    React.useEffect(() => {

        sendData().then(res => {
            if (res.error) {
                setError(true);
                setApiMessage(res.error);
            } else {
                setApiMessage(res.message);
            }
        });
    }, []);

    // create and conditionally error modal if an error occurs

    if (error == true) {

        return (
            <TemplateModal title="Error" body={
                <div className='success-message-wrapper'>
                <img src='/img/errors/cancel.svg' alt='request failed' width={250} height={250} className='img-fluid success-message-icon'/>
                <br/><br/>
                <i class="fas fa-hand-paper text-danger"></i>
                <span className='success-message'> <b className="text-danger"> Request Failed:</b></span>
                <p className='text-muted mt-4'> <b> Reason:</b>  <span className='text-muted text-danger' > { apiMesssage } </span>  </p>


                </div>
            } />

        );
    } else {
        // render the success modal
        return (
            <TemplateModal title="Success" body={
                <div className='success-message-wrapper'>
                 <img src='/img/SVG/network_outline.svg' class='img-fluid success-message-icon' />
                 <br/><br/>
                <i className="fas fa-check-circle text-success"></i>
                <span className='success-message ml-4'> { apiMesssage }</span>

                </div>
            } />
        );
    }
}
