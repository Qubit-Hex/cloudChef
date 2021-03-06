/**
 *
 *  @component
 *
 *
 *  @purpose: inorder to create instructions for the recipe
 *
 */



import React from "react";
import ReactDOM from "react-dom";


import { CreateRecipeTime } from "./create.recipeTime";
import { SendEndPoint } from "./send.endPoint";



export const CreateInstructions = (props) => {



    // the state where we will hold the instructions
    const [instructions, setInstructions] = React.useState([]);
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
    const handleFinalize = () => {
        let modalContainer = document.getElementById('modal-container');
        // the last component inorder to set the data to our api endpoint.

        let messageQuery = {
            recipeSummary: props.recipeSummary,
            recipeIngredients: props.recipeIngredients,
            recipeInstructions: instructions,
            recipeCookingTime: props.recipeCookingTime,
            nutritionalFacts: props.nutritionalFacts
        }

        messageQuery.recipeSummary.recipeImage = image;


        return ReactDOM.render(<SendEndPoint query={messageQuery} />, modalContainer);
    }


    // fetch the data promise the promis and send it to the main send point.
    React.useEffect(() => {

        props.recipeSummary.recipeImage.then(res => {
            setImage(res.path);
        });
    }, []);



    return (

        <div className="modal apply-modal-animation recipe-modal">
        <div
            className="modal-dialog">

            <div class="modal-content w-75">
                <div class="modal-header">
                    <h5 class="modal-title "> Add Instructions </h5>
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
                        padding: "50px",
                    }}
                >

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

                <button className='btn btn-message mt-2 mx-auto d-block w-50' onClick={(e) => {
                // append the the ingredents to the ingredents array
                let ingredents = document.getElementById("recipe-ingredents").value;
                // append the ingredents to the ingredents array

                if (ingredents !== "") {
                    // check the input fields is not empty then set the state to render the ingredents list
                    setInstructions([...instructions, ingredents]);
                    document.getElementById("recipe-ingredents").value = "";
                } else {
                    // we will trigger a bootstrap alert to notify the user that the ingredents were added
                    // we will also clear the input field

                    let createAlert = document.getElementById("modal-alert-container");

                    // render our alert to the screen to let the user know that the ingredents were added


                    ReactDOM.render( <div className="alert-container" role="alert">
                        {/* make a modern looking alert message */}

                        <div className="alert alert-warning alert-dismissible fade-in">
                            <button href="#" className="btn btn-transparent close ml-4 mr-4 w-50 mx-auto" data-dismiss="alert"
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
            {/** here we will render a table with the new ingrednets that we are going to add to the recipe */}
            {/** refactor this into a componet that we will pass out state into,  */}

            {
                // check our length of our render then render the table
                checkLength(instructions) ?  (
                    <div className='table-responsive mt-4 mb-4'>
                    <table className='table mt-lg-3'>
                <thead>
                    <tr>
                        <th> Step </th>
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
                            <td> <button className='btn btn-danger mx-auto d-block w-50' data-key={index} onClick={
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
            </div>
                ) : false

            }
        </div>
                            <div className="row m-4 mx-auto d-flex">
                                    {/** next and back buttons for the dialog  */}

                                    <div className='col-md-6'>

                                    <button
                                            className="btn header-action w-75"
                                            onClick={(e) => {
                                             let modalContainer = document.getElementById('modal-container');

                                             // return the previous modal and pass out state to share the information
                                                return ReactDOM.render(<CreateRecipeTime
                                                    recipeIngredients={props.recipeIngredients}
                                                    recipeSummary={props.recipeSummary}
                                                    nutritionalFacts={props.nutritionalFacts}/>, modalContainer);
                                            }}>
                                            Back
                                        </button>

                                    </div>


                                    <div className='col-md-6'>
                                        <button  className="btn header-action w-75"
                                        onClick={
                                                (e) => {

                                                    // some validation check before we move on
                                                    const instructionData = instructions;

                                                    if (instructionData.length > 0) {
                                                        // reset the errorContainer
                                                        let errorContainer = document.getElementById('recipeInstructionsError');
                                                        ReactDOM.unmountComponentAtNode(errorContainer);
                                                        handleFinalize();
                                                    } else {
                                                        const errorContainer = document.getElementById('recipeInstructionsError');
                                                        // trigger a bootstrap alert in order to notify the user that the ingredients
                                                        // we must have at least one ingredents
                                                        ReactDOM.render((<div class="alert alert-danger mt-2"> <b> Error: </b> Please add at least one instruction. </div>), errorContainer);
                                                    }

                                                }
                                            }
                                                >
                                                Next
                                            </button>

                                    </div>




                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>);


}
