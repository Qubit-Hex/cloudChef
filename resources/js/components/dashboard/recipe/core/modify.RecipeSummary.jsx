/**
 *
 *  @component ModifyRecipeSummary
 *
 *
 *  @purpose: This component is used to display and modify the recipe Summary.
 *
 */



import react from "react";
import { ReactDOM } from "react";
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";


export const ModifyRecipeSummary = (props) => {

    // our states that will hold the recipe information.
    const [ recipeSummary, setRecipeSummary ] = react.useState(null);
    const [ recipeAllergies, setRecipeAllergies ] = react.useState(null);
    const [ recipeFlavourProfile, setRecipeFlavourProfile ] = react.useState(null);
    const [ updatedRecipe, setUpdatedRecipe ] = react.useState(null);

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

            console.log(recipeSummary);
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

                case 'sour':
                    if (flavourProfile.sour === true) {
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

    // perorm all of our pre checks before we render the form.
    React.useEffect( () => {
        // after we finishing test we will place our function inside of here.
    }, [])


    return (
        <div className="container" id='recipeSummaryContainer'>
        <h4 className="header-subtitle"> Recipe Details  </h4>
            <div className="row">
                <div class="form-group">
                    <label for="exampleFormControlFile1">
                        Recipe Image
                    </label>
                    <span id='recipeImage-error'></span>
                    <input
                        type="file"
                        class="form-control mt-2 mb-2"
                        name='recipeImage'
                        id="createrecipe-uploadimage"
                    />
                </div>
            </div>


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

                            // we need to preform validation checks here before we can proceed
                            if (validationCheck(e) === true) {
                                // execute our function that will handle the auto filling of the forms fields in the page
                                autoFillForm(e);
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
