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


/*  ____
 ____|    \
(____|     `._____      00000000000
 ____|       _|___     ------               Send It, Send It, Send It
(____|     .'           11111111111
     |____/
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
            className="modal-dialog"
            style={{
                maxWidth: "80%",
            }}
        >
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
                    class="modal-body d-flex"
                    style={{
                        padding: "10px",
                    }}>
                        {props.body }  </div>
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
            "Accept": "application/json"
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
            console.log(res);
        });
    }, []);

    // return a success message to the user or a faliure message to the user
    return (
       <TemplateModal title="Recipe Submitted" body={
              <div>
                  <button className='btn btn-success' onClick={
                      (e) => {
                          return sendData();
                      }
                  }>Send Data </button>
            </div>
       } />
    );

}
