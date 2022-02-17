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
import { ModifyRecipeSummary } from "./core/modify.RecipeModal";

import { TemplateModal } from "./core/template.modal";

export const RecipeModifyModal = (props) => {

    return (
        <TemplateModal title='Modify a current recipe' body={
            <div className='_content_'>
                <h1 className='header-subtitle'> Edit a recipe </h1>
                <small className='text-subtitle'> Please choose a section of the recipe that you would like to modify</small>

                {/** create a drop down with all the sections available to modify  */}

                <div className='form-group mt-4'>
                    <label htmlFor='recipe-modify-select'>Select a section to modify</label>
                    <select className='form-control mt-2 ' id='recipe-modify-select'>
                        <option value={0}>Select a section</option>
                        <option  value={1}>Ingredients</option>
                        <option value={2}> Instructions </option>
                        <option value={3}> Nutritional Facts</option>
                        <option value={4}> Recipe Details </option>
                    </select>



                    <button
                        className='btn btn-message mt-2'
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

                            if (selectedOption === recipeDetails) {
                                // open the ingredients section
                                {/** we will be changing the recipe Summary.  */}
                                return ReactDOM.render(<ModifyRecipeSummary />, container );
                            } else if (selectedOption === ingredients) {
                               return ReactDOM.render(<ModifyRecipeIngredients />, container)
                            }

                        }}>
                        <i className='fas fa-arrow-right'></i>
                         Go </button>

                </div>
                <div id='_subContent_' className='mt-4'></div>
                {/** container for pusjing content to the page  */}


            </div>
        }/>

    );

}
