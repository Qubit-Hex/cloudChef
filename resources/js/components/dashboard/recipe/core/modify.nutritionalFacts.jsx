/**
 *
 *  @component ModifyNutritionalFacts
 *
 *
 *  @purpose inorder to modify the nutritional facts of a given recipe
 */


import React from "react";
import ReactDOM from "react-dom";

import FetchServiceProvider from "../../../../lib/fetchServiceProvider";
import { TemplateModal } from "./template.modal";


export const ModifyNutritionalFacts = (props) => {

 // name for the facts that will fetched from our api
    const [facts, setFacts] = React.useState([]);
    const [status, setStatus] = React.useState(null);


    const closeWindow = () => {
        const container = document.getElementById('modal-container');

        return ReactDOM.unmountComponentAtNode(container);
    }



    const getNutritionalFacts = async () => {
        const api = new FetchServiceProvider();

        const route = `/api/store/recipes/find/${props.id}`;

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        };
        // return the promise to the user.
        return await api.get(route, headers);
    }


    // update the nutritional facts of the recipe
    const updateNutritionalFacts = async (data) => {

        const api = new FetchServiceProvider();
        const route = '/api/store/recipes/update/nutritionalFacts';

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'recipeId': props.id

        }

        return await api.patch(route, data, headers);
    }



    // validate the users inputs and if they are valid then render the next page
    const validateInput = () => {
        const container = document.getElementById('modal-container');
        const modalInputs = container.querySelectorAll('input');

        // loop through the inputs and check if they are empty

         // check the inputs and if they are empty then return a error message to user via the d

        let inputValidationState = [];


        for (let i = 0; i < modalInputs.length; i++) {

            // check if the input is empty ?
            if(modalInputs[i].value === "" || modalInputs[i].value === null){
                // check the name of modal input
                let name = modalInputs[i].name;
                const errorContainer = document.getElementById(name+"Error");
                inputValidationState.push(false);
                ReactDOM.render((<div class="alert alert-danger mt-2"> <b> Error: </b> {name} cannot be empty. </div>), errorContainer);
            } else {
                let name = modalInputs[i].name;
                const errorContainer = document.getElementById(name+"Error");

                // preform type checking on the inputs of the modal
                if (typeof Number(modalInputs[i].value) === "number") {
                    // check if the input is a number
                    if (isNaN(modalInputs[i].value)) {
                        // check the name of modal input
                        inputValidationState.push(false);
                        ReactDOM.render((<div class="alert alert-danger mt-2"> <b> Error: </b> {name} must be a number. </div>), errorContainer);
                    } else {
                        // check the name of modal input
                        inputValidationState.push(true);
                        ReactDOM.render((<div class="alert alert-success mt-2"> <b> Success: </b> {name} is valid. </div>), errorContainer);
                    }
                } else {
                    // invalid type error boundary
                    inputValidationState.push(false);
                    ReactDOM.render((<div class="alert alert-danger mt-2"> <b> Error: </b> {name} must be a number. </div>), errorContainer);
                }
            }
        }

        // check if false is in the inputValidationArray
        if(inputValidationState.includes(false)){
            // if false is in the array then return false
            return false;
        }
        // ok our check has now been successful so we are now going to return the next page.
        return handleNext();
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

        const request = updateNutritionalFacts(inputObject);

        // perform the error handling of the request;
       return request.then(response => {
            if (response.status === 200) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        });
    }



    React.useEffect(() => {

        console.log(facts);

        // facts objects not empty ?
        if(facts.length === 0) {
            getNutritionalFacts().then(res => {
                setFacts(JSON.parse(res.data.recipe_nutritional_facts.recipe_nutritional_facts));
            })
        }

        // change all inputs to the values of the state object
        // this will be used to update the inputs
        const container = document.getElementById('modal-container');
        const modalInputs = container.querySelectorAll('input');

        // loop through the inputs and check if they are empty
        for (let i = 0; i < modalInputs.length; i++) {
            // check the name of modal input
            let name = modalInputs[i].name;
            let value = facts[name];
            modalInputs[i].value = value;
        }
    }, [facts]);


    // PERFORM SOME ERROR HANDLING WITH OUR REQUEST HERE
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
                                Your recipe Nutritional Facts have been updated
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
                <div className='row'>

                    <div className='col-md-6'>
                        {/** generate the nutritional label data */}
                        <h1 className='header-subtitle' style={{
                            fontSize: '1.5rem'
                        }}> Nutritional Information</h1>
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
                                    <span id='servingSizeError' className='text-danger mt-2'></span>
                                    <input type="text" className="form-control mt-2" name='servingSize'  placeholder="Serving Size" />
                                </div>
                            </div>

                        {/** calories information */}
                        <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-calories">Calories</label>
                            <span id='caloriesError' className='text-danger mt-2'></span>
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
                            <span id='totalFatError' className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='totalFat' placeholder="Fat" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fat-percentage">Fat Percentage</label>
                            <span id='totalFatPercentageError' className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='totalFatPercentage' placeholder="Fat Percentage" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-saturated-fat">Saturated Fat</label>
                            <span id='saturatedFatError' className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='saturatedFat' placeholder="Saturated Fat" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-saturated-fat-percentage">Saturated Fat Percentage</label>
                            <span id='saturatedFatPercentageError' className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='saturatedFatPercentage' placeholder="Saturated Fat Percentage" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="form-trans-fat"> Trans Fat</label>
                            <span id='transFatError' className='text-danger mt-2'></span>
                            <input type='text' className='form-control mt-2' name='transFat' placeholder='Trans Fat' />
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="transFatPercentage"> Trans Fat Percentage </label>
                            <span id='transFatPercentageError' className='text-danger mt-2'></span>
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
                            <span id="cholesterolError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='cholesterol' placeholder="Cholesterol" />
                        </div>
                    </div>
                    {/** cholesterol percentage  */}
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-cholesterol-percentage">Cholesterol Percentage</label>
                            <span id="cholesterolPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='cholesterolPercentage' placeholder="Cholesterol Percentage" />
                        </div>
                    </div>
                </div>

                {/** sodium section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sodium">Sodium</label>
                            <span id="sodiumError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='sodium' placeholder="Sodium" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sodium-percentage">Sodium Percentage</label>
                            <span id="sodiumPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='sodiumPercentage' placeholder="Sodium Percentage" />
                        </div>
                    </div>
                </div>

                {/** pottasium section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-potassium">Potassium</label>
                            <span id="potassiumError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='potassium' placeholder="Potassium" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-potassium-percentage">Potassium Percentage</label>
                            <span id="potassiumPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='potassiumPercentage' placeholder="Potassium Percentage" />
                        </div>
                    </div>
                </div>

                {/** total carbs  section  */}

                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-carb">Total Carb</label>
                            <span id="totalCarbError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='totalCarb' placeholder="Total Carbs" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-carb-percentage"> Total Carb Percentage</label>
                            <span id="totalCarbPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='totalCarbPercentage' placeholder="Total Carb Percentage" />
                        </div>
                    </div>
                </div>

                {/** fiber section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fiber">Fiber</label>
                            <span id="fiberError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='fiber'  placeholder="Fiber" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-fiber-percentage">Fiber Percentage</label>
                            <span id="fiberPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='fiberPercentage' placeholder="Fiber Percentage" />
                        </div>
                    </div>
                </div>

                {/** sugar section  */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sugar">Sugar</label>
                            <span id="sugarError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='sugar' placeholder="Sugar" />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-sugar-percentage">Sugar Percentage</label>
                            <span id="sugarPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='sugarPercentage' placeholder="Sugar Percentage" />
                        </div>
                    </div>
                </div>

                {/** protien section   */}
                <div className='row mt-2'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor="form-protein">Protein</label>
                            <span id="proteinError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control mt-2" name='protein' placeholder="Protein" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-protein-percentage">Protein Percentage</label>
                            <span id="proteinPercentageError" className='text-danger mt-2'></span>
                            <input type="text" className="form-control" name='proteinPercentage' placeholder="Protein Percentage" />
                        </div>
                    </div>
                </div>

                {/** the back and next buttons section  */}
                <div className='row mt-2'>

                    <div className='col'>
                    <button type='button' className='btn btn-message mx-auto btn-block m-4'
                                onClick={
                                    (e) => {
                                        // validate the input of the form before proceeding to the next form.
                                        validateInput();
                                    }
                                }> Modify</button>
                    </div>
                </div>
           </div>);
}
