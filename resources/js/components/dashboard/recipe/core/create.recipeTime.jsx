
/**
 *
 *  @component: CreateRecipeTime
 *
 *
 *  @purpose: inorder to generate the recipes estimated cooking length / prep time for the recipe
 *
 */



import React from "react";
import ReactDOM from "react-dom";

import { CreateNutritionalFacts } from "./create.NutritionalFacts";
import { CreateInstructions } from "./create.instructions";


export const CreateRecipeTime = (props) => {

    // close the modal container window. This will be used to close the modal window
    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    }

    return (
        <div className="modal apply-modal-animation recipe-modal">
            <div className="modal-dialog">
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title "> Cooking Time.  </h5>
                    <button
                        type="button"
                        class="btn-transparent modal-close far fa-times-circle"
                        aria-label="Close"
                        onClick={(e) => {
                            closeWindow();
                        }}
                    ></button>
                </div>
                <div
                    class="modal-body"
                    style={{
                        padding: "50px",
                    }}
                >
                    <h1 className='header-subtitle text-center'> How long does your recipe take?  </h1>
                    <div className='row'>
                        <div className='col  mx-auto d-block'>
                            <div className='form-group'>
                                <label htmlFor="prepTime"> Prep Time </label>
                                <span className='text-muted'> (in minutes) </span>
                                <span id='prepTimeError' className='text-danger'> </span>
                                <input type="text" className="form-control mt-2 mb-2" id="prepTime" placeholder="Enter Prep Time" />
                            </div>
                        </div>
                    </div>

                    {/** add the next buttons and such  */}
                    <div className='row'>
                        <div className='col mx-auto d-block'>
                            <div className='form-group'>
                                <label htmlFor="cookTime"> Cook Time </label>
                                <span className='text-muted'> (in minutes) </span>
                                <span id='cookTimeError'></span>
                                <input type="text" className="form-control mt-2 mb-2" id="cookTime" placeholder="Enter Cook Time" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2'>
                    <div className='col mx-auto d-block'>
                        {/**
                         *
                         *  @event
                         *         backButton triggers the ingredient form
                         *         nextButton triggers the cooking time form
                         *
                         */}

                        <button type='button' className='btn btn-danger btn-block m-4 w-25 mx-auto' onClick={
                            (e) => {
                                // go back to the last form
                                let container = document.getElementById("modal-container");
                                return ReactDOM.render(<CreateNutritionalFacts recipeIngredients={props.recipeIngredients}
                                    recipeSummary={props.recipeSummary}
                                    nutritionalFacts={props.nutritionalFacts}
                                    />, container);
                            }
                        }>Back</button>
                        </div>


                        <div className='col mx-auto d-block'>
                        <button type='button' className='btn btn-message btn-block m-4 w-25 mx-auto'
                        onClick={
                            (e) => {

                                // our elements to be validated
                                let container = document.getElementById("modal-container");
                                const cookingTime = document.getElementById('cookTime').value;
                                const prepTime = document.getElementById('prepTime').value;

                                // input errror containers
                                const cookingTimeError = document.getElementById('cookTimeError');
                                const prepTimeError = document.getElementById('prepTimeError');


                                const inputValidationState = [];
                                // check if the input is empty
                                if (cookingTime === '' || cookingTime === null) {
                                       inputValidationState.push(false);
                                       ReactDOM.render(<div class="alert alert-danger mt-2"> <b> Error: </b>  Please enter a cooking time </div>, cookingTimeError);
                                } else {
                                    // check the input is a number
                                    if (typeof Number(cookingTime) !== 'number' || isNaN(cookingTime)) {
                                        inputValidationState.push(false);
                                        // return error message to the user
                                         ReactDOM.render(<div class="alert alert-danger mt-2"> <b> Error: </b> Please enter a number invalid format.  </div>, cookingTimeError);
                                     } else {
                                         inputValidationState.push(true);
                                         // return the success message to the user.
                                         ReactDOM.render(<div class="alert alert-success mt-2"> <b> Success: </b>  Input Looks good! </div>, cookingTimeError);
                                     }
                                }

                                if (prepTime === '' || prepTime === null) {
                                    inputValidationState.push(false);
                                    ReactDOM.render(<div class="alert alert-danger mt-2"> <b> Error: </b>  Please enter a prep time </div>, prepTimeError)
                                } else {
                                    // check the input is a number
                                    if (typeof Number(prepTime) !== 'number' || isNaN(prepTime)) {
                                        inputValidationState.push(false);
                                        // return error message to the user
                                        ReactDOM.render(<div class="alert alert-danger mt-2"> <b> Error: </b>  Please enter a number invalid format. </div>, prepTimeError);
                                    } else {
                                        inputValidationState.push(true);
                                        // return a success messsage to the user
                                        ReactDOM.render(<div class="alert alert-success mt-2"> <b> Success: </b> Input Looks good! </div>, prepTimeError);
                                    }
                                }

                                 // check our validationState
                                 if (inputValidationState.includes(false)) {
                                    return false;
                                 } else {
                                    // HOW TIME OBJECT IS CREATED
                                    const TimeObject = {
                                        cookTime: cookingTime,
                                        prepTime: prepTime,
                                    };

                                    // return the next form
                                    return ReactDOM.render(<CreateInstructions
                                        recipeIngredients={props.recipeIngredients}
                                        recipeSummary={props.recipeSummary}
                                        nutritionalFacts={props.nutritionalFacts}
                                        recipeCookingTime={TimeObject}
                                         />, container);
                                    // return the user to the next page/
                                 }
                            }
                        }>Next</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}
