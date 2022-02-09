/**
 *
 *  @file: recipeModal.jsx
 *
 *  @purpose: to render the recipe modal component if a user clicks on a recipe
 *
 *
 *  @functionality:
 *                  - to render the recipe modal component if a user clicks on a recipe
 *                  - the modal will display the recipe details
 *                  - the modal will show nutrition information
 *                  - the modal will show the ingredients
 *                  - the modal will show the steps
 *
 */


// main core modules
import React from "react"
import ReactDOM from "react-dom"






// import sub components

import { NutritionalLabel } from "./nutritionalLabel";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { RecipeDetails} from './core/RecipeDetails';
import { RecipeIngredients} from './core/RecipeIngredients'


/**
 *
 * @component: RecipeCookingTime
 *
 * @purpose: inorder to render the cooking time of the recipe.
 *          this will be used to display the cooking time of the recipe
 */

const RecipeCookingTime = (props) => {

    return (
        <div className='recipe-cookingTime'>
        <h5 className='text-center'>
            {/** cooking time for the recipe selected  */}
            <i className="fas fa-clock"></i>
            Cooking Time: <span className='text-success'> {props.time} minutes </span>
        </h5>
    </div>
    );
}


// recipe directions

const RecipeDirections = (props) => {

    return (
        <section className='content-container'>
            <header>
                <h1 className='text-center' style={{
                    fontWeight: '600',
                    fontSize: '1.25em'
                }}> Directions  </h1>
            </header>

            <main>
                {/** main a section inorder to guide the user
                 * to the steps of the recipe
                 *
                 */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <ol className='list-group '>
                                {
                                    Object.keys(props.directions).map((item, index) => {
                                        return (
                                            <li className='list-group-item'  style={{
                                                marginTop: '20px',
                                                marginBottom: '10px',
                                                padding: '20px'

                                            }}key={index}>
                                                <p> <b> { Math.max( index + 1 )  + ".  " }</b>  { "  " + props.directions[item] } </p>
                                            </li>
                                        );
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}


/**
  * @component: RecipeModal
  *
  *
  *  @purpose: inorder to render the modal for the recipe selected
  *            !important: this is the main wrapper component to gluing all of our functionality together
  *
 */

export const RecipeModal = (props) => {

    const [recipe, setRecipe] = React.useState({});

    // recipe sub categories.
    const [recipeAllergies, setRecipeAllergies] = React.useState({});
    const [recipeFlavorProfile, setRecipeFlavorProfile] = React.useState({});
    const [recipeIngredients, setRecipeIngredients] = React.useState({});
    const [recipeSteps, setRecipeSteps] = React.useState({});
    const [nutritionalFacts, setNutritionalFacts] = React.useState({});

    // close the window when the user clicks on the close button
    const closeWindow = () => {
        let container = document.getElementById('modal-container');
        return ReactDOM.unmountComponentAtNode(container);
    }

    // do all of our api calls that we require to get the recipe data for the given id
    const getRecipeData = () => {
        const api = new FetchServiceProvider();

        // get the current id of the recipe
        // and return the recipe data
        const route = `/api/store/recipes/find/${props.id}/`;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'accessToken': api.getCookie('accessToken')
        };

        // make the api call
        return api.get(route, headers);
    }


    React.useEffect(() => {
        // load our tunnel for the api  call
        const data = getRecipeData();

        data.then(response => {

            let allergyInfo = response.data.allergy_info;
            let allergyJSON = JSON.parse(allergyInfo.recipe_allergens);
            let flavourProfile = JSON.parse(response.data.flavour_profile.recipe_flavor_profile);
            let ingredients = JSON.parse(response.data.recipe_ingredients.recipe_ingredients);
            let recipeSteps = JSON.parse(response.data.recipe_steps.recipe_steps);
            let nutritionalData = JSON.parse(response.data.recipe_nutritional_facts.recipe_nutritional_facts);
            // set all the infomation that we need inorder to the display the recipe information.

            // tood make sure that we are setting the data correctly
            // and add a error boundary to handle the error

            // set our data to the state that we need inorder to render our functional components
            setRecipeAllergies(allergyJSON);
            setRecipeFlavorProfile(flavourProfile);
            setRecipeIngredients(ingredients);
            setRecipe(response.data.recipe);
            setRecipeSteps(recipeSteps);
            setNutritionalFacts(nutritionalData);

        });


    }, []);


// check did the informtion load to the state of the component

    return (
        <div className="modal apply-modal-animation recipe-modal">
            <div className="modal-dialog" style={{
                width: '100%',
            }}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title " >Recipe Details </h5>
                        <button
                            type="button"
                            class="btn-transparent modal-close far fa-times-circle"
                            data-bs-dismiss="modal"
                            aria-label="Close" onClick={
                                (e) => {
                                    e.preventDefault();
                                    closeWindow();
                                }
                            }></button>
                    </div>
                    <div class="modal-body d-flex">

                        {/* recipe modal to show the user the recipe details */}
                         <div className='d-flex flex-column justify-content-center align-items-center'>
                                <h2 className='text-center mt-4 text-center'> <strong>Sliced Steak</strong>  </h2>

                                <img src={recipe.recipe_image} width="400px" height="400px" alt="recipe" className='img-fluid modal-recipe-img rounded-2 desktop-view' />
                            </div>
                            {/* render  the menu item description / allergen information  */}

                            <RecipeDetails
                                catagory={recipe.catagory}
                                glutenFree={recipeAllergies.gluten}
                                eggFree={recipeAllergies.egg}
                                fishFree={recipeAllergies.fish}
                                nutFree={recipeAllergies.nut}
                                dairyFree={recipeAllergies.dairy}
                                spicy={recipeFlavorProfile.spicy}
                                sweet={recipeFlavorProfile.sweet}
                                savory={recipeFlavorProfile.savory}
                            />

                        </div>

                            {/** create nav bootstrap with icons for recipe details  */}

                            <div className='col'>

                                    <nav className='navbar navbar-expand-lg recipe-nav'>
                                        <div className='col'>
                                            <ul className='navbar-nav'>
                                                <li className='nav-item'>
                                                    <a className='nav-link' onClick={
                                                        (e) => {
                                                            let contentContainer = document.getElementById('recipe-details')
                                                            {/** we will use the spread operator to hold our json data and pass the
                                                                 said data to the component to render our information to the client
                                                             */}
                                                            return ReactDOM.render( <RecipeIngredients data={recipeIngredients}/>, contentContainer );
                                                        }
                                                    } href='#'>
                                                        <i className='fas fa-utensils'></i>
                                                        <span className='nav-link-text'>Ingredients</span>
                                                    </a>
                                                </li>
                                                <li className='nav-item' onClick={
                                                    (e) => {
                                                        let contentContainer = document.getElementById('recipe-details')


                                                        return ReactDOM.render(
                                                         <RecipeCookingTime time={30} /> , contentContainer);
                                                    }
                                                }>
                                                    <a className='nav-link' href='#'>
                                                        <i className='fas fa-clock'></i>
                                                        <span className='nav-link-text'>Cooking Time</span>
                                                    </a>
                                                </li>
                                                {/** nutritional information link  */}
                                                <li className='nav-item' onClick={
                                                    (e) => {
                                                        let contentContainer = document.getElementById('recipe-details')

                                                        {/** we will set our nutrional Facts here */}
                                                        return ReactDOM.render(
                                                          <NutritionalLabel  data={nutritionalFacts} /> , contentContainer);
                                                    }

                                                }>
                                                    <a className='nav-link' href='#'>
                                                        <i className='fas fa-info-circle'></i>
                                                        <span className='nav-link-text'>Nutritional Info</span>
                                                    </a>
                                                </li>

                                                <li className='nav-item' onClick={
                                                    (e) => {
                                                        let contentContainer = document.getElementById('recipe-details')
                                                        return ReactDOM.render(<RecipeDirections directions={recipeSteps} />, contentContainer);
                                                    }
                                                }>
                                                    <a className='nav-link'>
                                                        <i className='fas fa-list-ol'></i>
                                                        <span className='nav-link-text'> Directions </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                    </nav>

                                    <div className='row p-2' id='recipe-details'>
                                            {/** recipe content goes here once a user selected an action via the navbar  */}
                                    </div>

                                </div>
                        </div>
                    </div>
                </div>
    );
}
