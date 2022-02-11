/**
 *  @file send.endPoint
 *
 *
 *  @author: qubit-hEx
 *
 */


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



export const SendEndPoint = (props) => {



    // we will hold the message from our api
    const [apiMesssage, setApiMessage] = React.useState([]);
    // add an error boundry to our component
    const [error, setError] = React.useState(false);
    const [image, setImage] = React.useState(null);

    const query = props.query;


    const sendData = () => {
        const api =     new FetchServiceProvider();
        const route =  "/api/store/recipes/add";
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        const data = {
            recipeSummary: query.recipeSummary,
            recipeIngredients: query.recipeIngredients,
            recipeInstructions: query.recipeInstructions,
            recipeCookingTime: query.recipeCookingTime,
            nutritionalFacts: query.nutritionalFacts
        }


    // set a time out to wait for the image to be uploaded
        return api.post(route, data, headers);
    }


    // set the state to the data that we have recieved from our api
    React.useEffect( () => {


        sendData().then( (response) => {
            if (response.status === 200) {
                // remove the error
                React.
                // remove api response later its for debugging purposes only.
                setApiMessage(response.data);
                setError(false);
            } else {
                setError(true);
            }
        });
    }, []);

    console.log('error', error);
    console.log('apiMesssage', apiMesssage);
    return (
        <h1> hello sir welcome to the endpoint... </h1>
    );

}
