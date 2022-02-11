/**
 *
 *  @component:  CreateNutritionalFacts
 *
 *
 *  @purpose: inorder to generate the recipes nutritional facts for the recipe that the user is creating
 *
 */


import React from "react";
import ReactDOM from "react-dom";

// child imports
/**
 *
 *  @component: CreateNutritionalFacts
 *
 *  @purpose: inorder to generate the nutritional facts modal for the user
 *
 */

import { CreateRecipeTime } from "./create.recipeTime";
import { AddRecipeIngredients } from "./create.addRecipeIngredients";

export const CreateNutritionalFacts = (props) => {


    console.log(props);
    // close the modal

    const closeWindow = () => {
        const container = document.getElementById('modal-container');

        return ReactDOM.unmountComponentAtNode(container);
    }

    // handle Next button event function
    const handleNext = () => {

        let container = document.getElementById('modal-container');

        let inputElement = container.querySelectorAll('input');

        // next lets map the names to the values of the input Elements
        let inputValues = Array.from(inputElement).map(input => {
            // return a object with the name and the value
            // the name will be the key
            return {
                [input.name]: input.value
            }
        });

        // next reduce inputs values to a single object
        // the name will be the key
        let inputObject = inputValues.reduce((acc, curr) => {
            return {
                ...acc,
                ...curr
            }
        }, {});

        // next we will
        ReactDOM.render(<CreateRecipeTime   recipeIngredients={props.recipeIngredients}
                                            recipeSummary={props.recipeSummary}
                                            nutritionalFacts={inputObject}
                                            nutritionalFacts={inputObject}/>, container);
    }

    return (
        <div className="modal apply-modal-animation recipe-modal">
            <div className="modal-dialog"
                style={{
                    maxWidth: "80%",
                }}>
                <div class="modal-content w-75">
                    <div class="modal-header">
                        <h5 class="modal-title "> Add Nutritional Data.  </h5>
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
                    class="modal-body d-flex"
                    style={{
                        padding: "50px",
                    }}
                >

                    {
                    /**
                     *
                     *  Note: might refactor these into a reusable component to generate a form
                     *              such as label name, input name, input type, input placeholder, id, and label id will = id + -label
                     *   we will see ameego how this will work dont know yet though :/
                     *      but will will reduct the html code by half at least if i do though.
                     */
                     }
        <div className='container'>
                <div className='row'>

                    <div className='col-md-6'>
                        {/** generate the nutritional label data */}
                        <h1 className='header-subtitle'> Nutritional Information</h1>
                        <small className="text-muted">
                            <i className="fas fa-info-circle"></i>
                             Please enter the nutritional information </small>
                    </div>
                </div>

                <div className='row mt-2'>

                    {/** serving size information  */}
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor="form-serving-size">Serving Size</label>
                                    <input type="text" className="form-control mt-2" name='servingSize'  placeholder="Serving Size" />
                                </div>
                            </div>

                        {/** calories information */}
                        <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-calories">Calories</label>
                            <input type="text" className="form-control mt-2" name='calories'  placeholder="Calories" />
                        </div>
                    </div>
                </div>

                {/** calories information based on the serving size */}
                <div className='row mt-2'>

                    <h4 className='header-subtitle'> Fat Information</h4>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fat">Fat</label>
                            <input type="text" className="form-control mt-2" name='totalFat' placeholder="Fat" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fat-percentage">Fat Percentage</label>
                            <input type="text" className="form-control mt-2" name='totalFatPercentage' placeholder="Fat Percentage" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-saturated-fat">Saturated Fat</label>
                            <input type="text" className="form-control mt-2" name='saturatedFat' placeholder="Saturated Fat" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-saturated-fat-percentage">Saturated Fat Percentage</label>
                            <input type="text" className="form-control mt-2" name='saturatedFatPercentage' placeholder="Saturated Fat Percentage" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-trans-fat"> Trans Fat</label>
                            <input type='text' className='form-control mt-2' name='transFat' placeholder='Trans Fat' />
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-transfat-percentage"> Trans Fat Percentage </label>
                            <input type='text' className='form-control mt-2' name='transFatPercentage' placeholder='Trans Fat Percentage' />
                        </div>
                    </div>

                </div>

                <div className='row mt-2'>
                    <h4 className='header-subtitle'> Other Nutritional Data</h4>
                    <small className='text-muted'> Add all related information to let your guests make healthier choices. </small>
                    {/** cholesterol information  */}
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-cholesterol">Cholesterol</label>
                            <input type="text" className="form-control mt-2" name='cholesterol' placeholder="Cholesterol" />
                        </div>
                    </div>
                    {/** cholesterol percentage  */}
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-cholesterol-percentage">Cholesterol Percentage</label>
                            <input type="text" className="form-control mt-2" name='cholesterolPercentage' placeholder="Cholesterol Percentage" />
                        </div>
                    </div>
                </div>

                {/** sodium section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sodium">Sodium</label>
                            <input type="text" className="form-control mt-2" name='sodium' placeholder="Sodium" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sodium-percentage">Sodium Percentage</label>
                            <input type="text" className="form-control mt-2" name='sodiumPercentage' placeholder="Sodium Percentage" />
                        </div>
                    </div>
                </div>

                {/** pottasium section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-potassium">Potassium</label>
                            <input type="text" className="form-control mt-2" name='potassium' placeholder="Potassium" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-potassium-percentage">Potassium Percentage</label>
                            <input type="text" className="form-control mt-2" name='potassiumPercentage' placeholder="Potassium Percentage" />
                        </div>
                    </div>
                </div>

                {/** total carbs  section  */}

                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-carb">Total Carb</label>
                            <input type="text" className="form-control mt-2" name='carb' placeholder="Total Carbs" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-carb-percentage"> Total Carb Percentage</label>
                            <input type="text" className="form-control mt-2" name='carbPercentage' placeholder="Total Carb Percentage" />
                        </div>
                    </div>
                </div>

                {/** fiber section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fiber">Fiber</label>
                            <input type="text" className="form-control mt-2" name='fiber'  placeholder="Fiber" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fiber-percentage">Fiber Percentage</label>
                            <input type="text" className="form-control mt-2" name='fiberPercentage' placeholder="Fiber Percentage" />
                        </div>
                    </div>
                </div>

                {/** sugar section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sugar">Sugar</label>
                            <input type="text" className="form-control mt-2" name='sugar' placeholder="Sugar" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sugar-percentage">Sugar Percentage</label>
                            <input type="text" className="form-control mt-2" name='sugarPercentage' placeholder="Sugar Percentage" />
                        </div>
                    </div>
                </div>

                {/** protien section   */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-protein">Protein</label>
                            <input type="text" className="form-control mt-2" name='protien' placeholder="Protein" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-protein-percentage">Protein Percentage</label>
                            <input type="text" className="form-control" name='protienPercentage' placeholder="Protein Percentage" />
                        </div>
                    </div>
                </div>

                {/** the back and next buttons section  */}
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
                                // init the form and pass the props data into the form.
                                const container = document.getElementById('modal-container');

                                ReactDOM.render(<AddRecipeIngredients  recipeIngredients={props.recipeIngredients}
                                    recipeSummary={props.recipeSummary}
                              />, container);
                            }

                        }>Back</button>
                        <button type='button' className='btn btn-message w-25 btn-block m-4'
                                onClick={
                                    (e) => {
                                        // init the cooking time component and pass the props through
                                        handleNext();
                                    }
                                }>Next</button>
                    </div>
                </div>
           </div>
         </div>
      </div>
   </div>
</div>)

}

