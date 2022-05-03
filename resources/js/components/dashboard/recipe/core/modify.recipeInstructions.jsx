/**
 *
 *  @component modfiyRecipeInstructions
 *
 *  @purpose inorder to modify the recipe instructions of a given recipe
 *
 *
 */



import React from "react";
import ReactDOM from "react-dom";

import FetchServiceProvider from "../../../../lib/fetchServiceProvider";
import { TemplateModal } from "./template.modal";

export const ModifyRecipeInstructions = (props) => {



    // the state where we will hold the instructions
    const [instructions, setInstructions] = React.useState([]);

    // this is the state where we will control the error boundry
    const [status, setStatus] = React.useState(null);
    const [image, setImage] = React.useState(null);

    // close the modal window
    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    };

    // check the length of the instructionss array
    // weather or not to render the table

    const checkLength = (state) => {
        if (instructions.length > 0) {
            return true;
        } else {
            return false;
        }
    }


    // handle the nutritional facts for the instructionss
    const handleFinalize =  async (data) => {

        const api = new FetchServiceProvider();
        const route = '/api/store/recipes/update/recipeInstructions/';

        //  set the headers of the recioe
        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'recipeId': props.id
        }
        // return the promise

        return await api.patch(route, data, headers);
    }

    // this is just tood some error checking
    const updateData = (data) => {
        // check if the state is not empty
        const container = document.getElementById('modal-container');

        if (instructions.length === 0) {
            // return an error message
            // since the state is empty
            return false;
        }
            // our promise function is placed here
            const patchRequest = handleFinalize(instructions);


            patchRequest.then(res => {
                if (res.status === 200) {
                    setStatus(true);
                } else {
                    setStatus(false);
                }
            })


    }

    const getCurrentInstructions = async () => {
        // covert to async call
        let api = new FetchServiceProvider();
        let route = '/api/store/recipes/find/' + props.id;

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        // make the call
        const response = await api.get(route, headers);

        return response;

    }
    // the the previous ingredients for the recipe

    React.useEffect(() => {
            console.log(getCurrentInstructions());
            let currentInstructions = getCurrentInstructions();

            currentInstructions.then(response => {
                console.log(response);
                setInstructions(JSON.parse(response.data.recipe_steps.recipe_steps));
            });
    }, []);

    //  check the state of our application.
    //  if the state is true then we will render the success message
    //  if the state is false then we will render the error message

    if (status === true) {
        return (
            <div>
                <TemplateModal title="Success" body={
                    <div>
                    <img src='/img/SVG/Call waiting.svg'
                         className='img-fluid' style={{
                             animation: 'grow 3s both',
                         }}
                         width={350}
                         height={350}
                         alt='success' />
                        {/** font awesome check circle */}
                         <i className="fas fa-check-circle fa-5x text-success"></i>
                         <span className='text-success  text-center'>
                            <b> Success </b>
                            <br />
                            <span className='text-muted'>
                                Your recipe instructions have been updated
                            </span>
                         </span>
                    </div>
                } />
            </div>
        )

    } else if (status === false) {
        return (
            <div>
                <TemplateModal
                    title="Error"
                    body={
                        <div>
                            <img src='/img/SVG/Call waiting.svg'
                         className='img-fluid' style={{
                             animation: 'grow 3s both',
                         }}
                         width={350}
                         height={350}
                         alt='success' />
                        {/** font awesome error circle */}
                        <i className="fas fa-exclamation-circle fa-5x text-danger"></i>
                         <span className='text-danger  text-center'>
                            <b style={{fontSize: '2rem'}}> Error </b>
                            <br />

                            <span className='text-muted'>
                                Your recipe has failed to update. Please try again
                            </span>
                         </span>
                        </div>
                    } />
            </div>
        );

    }
    return (
        <div className='container'>
        <div className="row">
        <div className="col">
            <h4 className='header-subtitle'> Steps </h4>
            <div className='col'>
            <div className="form-group ">

                <label htmlFor="recipe-ingredents">Add Step  </label>
                <small className='text-muted'> Example: whisk 3 eggs together. </small>
                <span id='recipeInstructionsError' className='text-danger'></span>
                <input type='text' className="form-control mt-2 mb-2" id="recipe-ingredents" placeholder="
                Please Enter: instructions." />

                <button className='btn btn-message mt-2 mx-auto d-block w-auto' onClick={(e) => {
                // append the the ingredents to the ingredents array
                let ingredents = document.getElementById("recipe-ingredents").value;
                // append the ingredents to the ingredents array

                if (ingredents !== "") {
                    // check the input fields is not empty then set the state to render the ingredents list
                    setInstructions([...instructions, ingredents]);
                    // run the handle function inorder to handle our request
                } else {
                    // we will trigger a bootstrap alert to notify the user that the ingredents were added
                    // we will also clear the input field

                    let createAlert = document.getElementById("modal-alert-container");

                    // render our alert to the screen to let the user know that the ingredents were added


                    ReactDOM.render( <div className="alert-container" role="alert">
                        {/* make a modern looking alert message */}

                        <div className="alert alert-warning alert-dismissible fade-in">
                            <button href="#" className="btn btn-transparent close ml-4 mr-4" data-dismiss="alert"
                            onClick={
                                (e) => {
                                    // remove the alert from the screen
                                    ReactDOM.unmountComponentAtNode(createAlert);
                                }
                            }
                            aria-label="close">&times;</button>
                            <span>
                                <strong>Warning!</strong> Please enter an instructions field cannot be empty.
                            </span>
                        </div>


                </div>, createAlert);
                }
            }}> Add </button>
            </div>

            </div>
        </div>
        </div>

        <div className='row'>
            {/** here we will render a table with the new Ingredents that we are going to add to the recipe */}
            {/** refactor this into a component that we will pass out state into,  */}

            {
                // check our length of our render then render the table
                checkLength(instructions) ?  (
                    <table className='table mt-lg-3'>
                <thead>
                    <tr>
                        <th> Instructions </th>
                        <th> Action </th>
                    </tr>
                </thead>

                <tbody id='recipe-ingredents-list-container'>
                    {/** our put will be generated here  */}
                    {

                    instructions.map((item, index) => {

                    return (
                        <tr key={index}>
                            <td> {item} </td>
                            <td> <button className='btn btn-danger mx-auto d-block w-auto' data-key={index} onClick={
                                // remove an item from the ingredents array
                                (e) => {
                                    // this is our clean up operation in the ingredents array
                                    let newState = instructions;

                                    // map all the ingredents in the array that does not equal our data key
                                    let newArray = newState.map((item, key) => {
                                        if (index !== key) {
                                            return item;
                                        }
                                        // remove empty values
                                    });
                                    // remove all the empty values from the array
                                    let cleanArray = newArray.filter(item => item);
                                    setInstructions(cleanArray);
                                }

                            }> Remove </button></td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
                ) : false

            }
        </div>

        <div className='row'>
            <button className='btn m-4 header-action mx-auto d-block' onClick={
                (e) => {
                    // update the data and preform some validation checks
                    updateData(instructions);
                }
            }> Modify  </button>
        </div>
                            </div>);
}
