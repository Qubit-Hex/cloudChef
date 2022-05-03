/**
 *
 *
 *  @file: recipeModifyModal.jsx
 *
 *
 *  @purpose: This component is used to display the modal for modifying a recipe.
 *
 */



import react from "react";
import ReactDOM  from "react-dom";

// sub components / libraries
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { ModifyRecipeIngredients } from "./core/modify.recipeIngredients";
import { ModifyRecipeSummary } from "./core/modify.RecipeSummary";
import { ModifyRecipeInstructions } from "./core/modify.recipeInstructions";
import { TemplateModal } from "./core/template.modal";
import { ModifyNutritionalFacts } from "./core/modify.nutritionalFacts";

export const RecipeModifyModal = (props) => {

    return (
        <TemplateModal title='Update a current Recipe' body={
            <div className='_content_'>
                <h1 className='header-subtitle' style={{
                    fontSize: '1.5rem'
                }}> Edit a recipe </h1>
                <small className='text-subtitle'> Please choose a section of the recipe that you would like to modify</small>

                {/** create a drop down with all the sections available to modify  */}

                <div className='form-group mt-4'>
                    <label htmlFor='recipe-modify-select'>Select a section to modify</label>
                    <select className='form-control mt-2' style={{
                        fontWeight: 'bold'
                    }} id='recipe-modify-select'>
                        <option value={0}>Select a section</option>
                        <option  value={1}>Ingredients</option>
                        <option value={2}> Instructions </option>
                        <option value={3}> Nutritional Facts</option>
                        <option value={4}> Recipe Details </option>
                    </select>



                    <button
                        className='btn btn-message mt-2 d-block mx-auto w-auto'
                        onClick={(e) => {
                            let inputElement = document.getElementById('recipe-modify-select');

                            // find the value of the selected option
                            let selectedOption = Number(inputElement.options[inputElement.selectedIndex].value);

                            // constants the map the selected option to the correct section
                            // is  so its easier to read and such
                            const ingredients = 1;
                            const instructions = 2;
                            const nutritionalFacts = 3;
                            const recipeDetails = 4;
                            const container = document.getElementById('_subContent_');


                            // check the value of the selected option
                            // and render the correct section

                            switch (selectedOption) {
                                case ingredients:
                                    ReactDOM.render(<ModifyRecipeIngredients id={props.id} />, container);
                                break;
                                case instructions:
                                    ReactDOM.render(<ModifyRecipeInstructions id={props.id} />, container);
                                break;
                                case nutritionalFacts:
                                    ReactDOM.render(<ModifyNutritionalFacts id={props.id} />, container);
                                break;
                                case recipeDetails:
                                    ReactDOM.render(<ModifyRecipeSummary id={props.id} />, container);
                                break;
                                default:
                                    ReactDOM.render(<ModifyRecipeSummary id={props.id} />, container);
                                break;
                            }

                        }}>
                        <i className='fas fa-arrow-right'></i>
                         Go </button>

                </div>
                <div id='_subContent_' className='mt-4 p-2'></div>
                {/** container for pusjing content to the page  */}


            </div>
        }/>

    );

}
