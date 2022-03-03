/**
 *
 *  @component ModifyRecipeSummary
 *
 *
 *  @purpose: This component is used to display and modify the recipe Summary.
 *
 *
 */


import react from "react";
import ReactDOM  from "react-dom";
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";
import { TemplateModal } from "./template.modal";


export const ModifyRecipeSummary = (props) => {

    // our states that will hold the recipe information.
    const [ recipeSummary, setRecipeSummary ] = react.useState(null);
    const [ recipeAllergies, setRecipeAllergies ] = react.useState(null);
    const [ recipeFlavourProfile, setRecipeFlavourProfile ] = react.useState(null);
    const [ updatedRecipe, setUpdatedRecipe ] = react.useState(null);
    const [ status, setStatus ] = react.useState(null);

    /**
     * @function: fetchRecipe
     *
     * @param {string} recipeId
     *
     * @returns {Promise}
     *
     * @purpose: This function is used to fetch the recipe information from our api.
     *
     */

    const fetchRecipe = async (id) => {
        const api = new FetchServiceProvider();
        const route = '/api/store/recipes/find/' + props.id;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
    };

    const response = await api.get(route, headers);
    return response;
}

/**
 *  @blueprint validation
 *
 *  @purpose: inorder to validate the form and, auto fill the forms with the data from the database.
 *
 */

    const validationCheck = () => {

      fetchRecipe(props.id).then(response => {
            // set our states to hold all of the recipe data from the database.
            // please note that these states we set are not the same as the states that we use in the form.
            setRecipeSummary(response.data.recipe);
            setRecipeAllergies(response.data.allergy_info.recipe_allergens);
            setRecipeFlavourProfile(response.data.flavour_profile.recipe_flavor_profile);
        });

        // check did fetchRecipe finish?
        if (recipeSummary !== null && recipeAllergies !== null && recipeFlavourProfile !== null) {
            // if yes, then we can now render the form.
            return true;
        } else {
            return false;
        }
    }



    // check if we can render the form.
    // but first we will pre enter all of the form fields inside of the forms.
    const autoFillForm = () => {
        const container = document.getElementById('recipeSummaryContainer');
        const formInputs = container.querySelectorAll('input');

        formInputs.forEach(input => {

            const allergy = JSON.parse(recipeAllergies);
            const flavourProfile = JSON.parse(recipeFlavourProfile);
        // select the input field and set the value to the value of the state.
            switch(input.name) {

                case 'recipeName':
                    input.value = recipeSummary.recipe_name;
                break;
                case 'recipeCatagory':
                    input.value = recipeSummary.catagory;
                break;
                // now lets update all the allergen fields.
                case 'glutenFree':
                // check what the value of the state is.
                    if (allergy.gluten === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                      }
                break;
                case 'dairyFree':
                    if (allergy.dairy === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;
                case 'eggFree':
                    if (allergy.egg === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;
                case 'nutFree':
                    if (allergy.nut === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;
                case 'fishFree':
                    if (allergy.fish === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;

                case 'sweet':
                    if (flavourProfile.sweet === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;

                //  now lets update all the flavour profile fields.

                case 'spicy':
                    if (flavourProfile.spicy === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'false') {
                            input.checked = true;
                        }
                    }
                break;
                case 'savory':
                    if (flavourProfile.savory === true) {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    } else {
                        if (input.value === 'true') {
                            input.checked = true;
                        }
                    }
                break;
            }
        });
    }

    // validate Request first we are going to validate the request before sending it to the database. use a patch request.
    const validateForm  = () => {
        const container = document.getElementById('recipeSummaryContainer');
        const formInputs = container.querySelectorAll('input');


        const triggerError = (input) => {
            let error = document.getElementById(input.name + '-error');
            if (input.value === '') {
                ReactDOM.render(<div class="alert alert-danger">Please fill out all the fields</div>, error);
                return false;
            } else {
                ReactDOM.render(<div class="alert alert-success">Form is valid</div>, error);
                return true;
            }
        }

        // verify a value is entered in the input field.
        const verifyValue = (input) => {
            if (input.value === 'true') {
                return true;
            } else {
                return false;
            }
        }

        const RequestObject = {
            recipeSummary: new Object(),
            recipeAllergies: new Object(),
            recipeFlavourProfile: new Object(),
        }


        const stateCheck = [];

        // here we are going to validate the forms inputs and make sure that they are all filled out.
        formInputs.forEach(input => {
            // select the input field and set the value to the value of the state.
            switch(input.name) {
                case 'recipeName':
                    triggerError(input) === true ? stateCheck.push(true ) : stateCheck.push(false);
                    RequestObject.recipeSummary.recipe_name = input.value;
                break;
                case 'recipeCatagory':
                    triggerError(input) === true ? stateCheck.push(true ) : stateCheck.push(false);
                    RequestObject.recipeSummary.catagory = input.value;
                break;
                // now lets update all the allergen fields.
                case 'glutenFree':
                    RequestObject.recipeAllergies.gluten = verifyValue(input);
                break;
                case 'dairyFree':
                    RequestObject.recipeAllergies.dairy = verifyValue(input);
                break;
                case 'eggFree':
                    RequestObject.recipeAllergies.egg = verifyValue(input);
                break;
                case 'nutFree':
                    RequestObject.recipeAllergies.nut = verifyValue(input);
                break;
                case 'fishFree':
                    RequestObject.recipeAllergies.fish = verifyValue(input);
                break;

                case 'sweet':
                    RequestObject.recipeFlavourProfile.sweet = verifyValue(input);
                break;

                //  now lets update all the flavour profile fields.
                case 'sour':
                    RequestObject.recipeFlavourProfile.sour = verifyValue(input);
                break;
                case 'spicy':
                    RequestObject.recipeFlavourProfile.spicy = verifyValue(input);
                break;
            }
        });


        // handle our network request.
        const performRequest = async (data) => {
            const api = new FetchServiceProvider();
            const route = '/api/store/recipes/update/recipeSummary';

            const headers = {
                'Content-Type': 'application/json',
                'accessToken': api.getCookie('accessToken'),
                'recipeId': props.id
            }

            const response = await api.patch(route, data, headers);

            return response;
        }

         // check if the state contains false value
         if (stateCheck.includes(false)) {
            return false;
         }

         // if everything is valid then we are going to send the request to the database.
        performRequest(RequestObject).then(response => {
            if (response.status === 200) {
                // re render the modal with the new data.
                setStatus(true);
            } else {
                setStatus(false);
            }
        })
    }

        // trigger our conditional rendering messages
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
                                    Your recipe has been updated!
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
        <div className="container" id='recipeSummaryContainer'>
        <h4 className="header-subtitle"> Recipe Details  </h4>

            <div className='row'>
                {/** recipe name  */}
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="createrecipe-name">Recipe Name</label>
                        <span id='recipeName-error' className="text-danger"></span>
                        <input type="text" name='recipeName' className="form-control mt-2 mb-2" id="createrecipe-name" placeholder="Enter recipe name" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                    <label for="exampleFormControlSelect1">
                        Category Name
                    </label>
                    <span id='recipeCatagory-error' className="text-danger"></span>
                    <input type='text' name='recipeCatagory' className='form-control mt-2 mb-2' placeholder='Please enter a category Name' />
                </div>
            </div>

            <div className="row">
                {/** section for allergys  */}
                <h4 className="header-subtitle"> Allergies </h4>
                <small className="text-muted">
                    {" "}
                    Please select any allergies that occurs in
                    this recipe.
                </small>
            </div>
            {/** Radio inputs for all most common allergies customers have */}
            <div className="row">
                <div className="col">
                    <label className="mt-2 mb-2">
                        {" "}
                        Gluten Free
                    </label>
                    <span id='glutenFree-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="glutenFree"
                                value="true"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio1"
                            >
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="glutenFree"
                                value="false"
                            />
                            <label
                                class="form-check-label"
                            >
                                No{" "}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <label className="mt-2 mb-2">
                        {" "}
                        Dairy Free
                    </label>

                    <span id='dairyFree-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="dairyFree"
                                value="true"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                Yes
                            </label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="dairyFree"
                                value="false"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label className="mt-2 mb-2">
                        {" "}
                        Nut Free
                    </label>
                    <span id='nutFree-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="nutFree"
                                value="true"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                Yes
                            </label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="nutFree"
                                value="false"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <label className="mt-2 mb-2">
                        {" "}
                        Egg Free
                    </label>
                    <span id='eggFree-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="eggFree"
                                value="true"
                            />
                            <label
                                class="form-check-label"
                                for="eggFree"
                            >
                                Yes
                            </label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="eggFree"
                                value="false"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="mt-2 mb-2">
                        {" "}
                        Fish Free
                    </label>
                    <span id='fishFree-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="fishFree"
                                value="true"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                Yes
                            </label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="fishFree"
                                value="false"
                            />
                            <label
                                class="form-check-label"
                                for="inlineRadio3"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                {/** please select /  */}
            </div>

            <h4 className="header-subtitle">
                {" "}
                Flavour Profile{" "}
            </h4>
            <small className="text-muted text-center">
                {" "}
                Please select the flavour profile of this
                recipe.
            </small>
            <div className="row">
                <div className="col">
                    <label className="mt-2 mb-2"> Sweet</label>
                    <span id='sweet-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="sweet"
                                value="true"
                            />
                            <label
                                className="for-check-label"
                                for="inlineRadio1"
                            >
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="sweet"
                                value="false"
                            />
                            <label
                                className="form-check-label"
                                for="inputPassword"
                            >
                                No{" "}
                            </label>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <label className="mt-2 mb-2">
                        {"Savory"}
                    </label>
                    <span id='savory-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="savory"
                                value="true"
                            />
                            <label
                                className="for-check-label"
                                for="inlineRadio1"
                            >
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="savory"
                                value="false"
                            />
                            <label
                                className="form-check-label"
                                for="inputPassword"
                            >
                                No{" "}
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label className="mt-2 mb-2"> Spicy</label>
                    <span id='spicy-error' className="text-danger"></span>
                    <div className="form-group">
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="spicy"
                                value="true"
                            />
                            <label
                                className="for-check-label"
                                for="inlineRadio1"
                            >
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="spicy"
                                value="false"
                            />
                            <label
                                className="form-check-label"
                                for="inputPassword"
                            >
                                No{" "}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 mx-auto d-block">
                {/** next and back buttons for the dialog  */}

                <div className="col-md-6 mx-auto d-block">


                    <button onClick={
                        (e) => {
                            if (validationCheck() === true) {
                                validateForm();
                            }
                        }
                    }
                        className="btn btn-message w-50 btn-block m-3"
                    >
                        Modify
                    </button>
                </div>


                </div>
        </div>
    );

}
