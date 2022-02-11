
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
            <div className="modal-dialog"
                style={{
                    maxWidth: "80%",
                }}>
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
                        <div className='col-md-6 mx-auto d-block'>
                            <div className='form-group'>
                                <label htmlFor="prepTime"> Prep Time </label>
                                <input type="text" className="form-control mt-2 mb-2" id="prepTime" placeholder="Enter Prep Time" />
                            </div>
                        </div>
                    </div>

                    {/** add the next buttons and such  */}
                    <div className='row'>
                        <div className='col-md-6 mx-auto d-block'>
                            <div className='form-group'>
                                <label htmlFor="cookTime"> Cook Time </label>
                                <input type="text" className="form-control mt-2 mb-2" id="cookTime" placeholder="Enter Cook Time" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-2'>
                    <div className='col-md-6 mx-auto d-block'>
                        {/**
                         *
                         *  @event
                         *         backButton triggers the ingredient form
                         *         nextButton triggers the cooking time form
                         *
                         */}

                        <button type='button' className='btn btn-danger w-25 btn-block m-4' onClick={
                            (e) => {
                                // go back to the last form
                                let container = document.getElementById("modal-container");
                                return ReactDOM.render(<CreateNutritionalFacts recipeIngredients={props.recipeIngredients}
                                    recipeSummary={props.recipeSummary}
                                    nutritionalFacts={props.nutritionalFacts}
                                    />, container);
                            }
                        }>Back</button>
                        <button type='button' className='btn btn-message w-25 btn-block m-4'
                        onClick={
                            (e) => {

                                let container = document.getElementById("modal-container");
                                const cookingTime = document.getElementById('cookTime').value;
                                const prepTime = document.getElementById('prepTime').value;

                                const TimeObject = {
                                    cookTime: cookingTime,
                                    prepTime: prepTime,
                                };

                                return ReactDOM.render(<CreateInstructions recipeIngredients={props.recipeIngredients}
                                    recipeSummary={props.recipeSummary}
                                    nutritionalFacts={props.nutritionalFacts}
                                    recipeCookingTime={TimeObject}
                                     />, container);
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
