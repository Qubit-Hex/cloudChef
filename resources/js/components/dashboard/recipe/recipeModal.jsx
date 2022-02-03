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



import React from "react"
import ReactDOM from "react-dom"


// import sub components

import { NutritionalLabel } from "./nutritionalLabel";



export const RecipeModal = (props) => {


    // close the window when the user clicks on the close button
    const closeWindow = () => {
        let container = document.getElementById('modal-container');
        return ReactDOM.unmountComponentAtNode(container);
    }


    // render the igredients of the recipe that the user clicked on
    const renderIngredients = () => {


    }


    // render the steps of the recipe that the user clicked on

    const renderSteps = () => {

    }


    // render the nutrition information of the recipe that the user clicked on

    const renderNutrition = () => {

    }

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

                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <small className='text-muted p-2'>
                                                <i className="fas fa-info-circle"></i>
                                                <span className='text-center'>Slice steak is an entree a part of the main menu! </span> <br />
                                    </small>
                                </div>

                                <img src='/img/sliced-steak.jpg' width="400px" height="400px" alt="recipe" className='img-fluid modal-recipe-img rounded-2 desktop-view' />
                            </div>

                            <ul className='list-group list-group-flush m-4'>

                                <li className='list-group-item'>
                                    <div className='row'>
                                        <small className='text-muted p-2'>
                                           {/** icon for recipe catagory in restaurant  */}
                                            <i className="fas fa-utensils" style={{
                                                color: '#ffc107',
                                                fontSize: '1.5rem'
                                            }}></i>
                                            <span className='text-center'> <strong> Recipe Catagory:  <span> Mains </span></strong></span>
                                        </small>
                                    </div>
                                </li>

                                <li className='list-group-item'>
                                    <div className='row'>
                                        {/** allergy information  */}
                                        <small className='text-muted p-2'>
                                            {/** icon for allergies use a greenish color */}
                                            <i className="fas fa-allergies" style={{
                                                color: '#28a745',
                                                fontSize: '1.5rem'
                                            }}></i>
                                            <span className='text-center'> <strong> Allergies: </strong></span>
                                        </small>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4 m-1'>
                                            <small className='text-muted text-center p-2'>
                                                {/** brown bread color for bread icon */}
                                                Gluten Free:  <span className='text-danger'> NO</span><br />
                                            </small>
                                        </div>
                                        <div className='col-md-4 m-1'>
                                            <small className='text-muted text-center p-2'>
                                                Egg Free:  <span className='text-success'> YES </span> <br />
                                            </small>
                                        </div>
                                        <div className='col-md-4 m-1'>
                                            <small className='text-muted text-center p-2'>
                                                Fish Free: <span className='text-success'> YES </span>  <br />
                                            </small>
                                        </div>
                                        <div className='col-md-4 m-1'>
                                            <small className='text-muted text-center p-2'>

                                                Nut Free: <span className='text-danger' style={{
                                                    fontWeight: 'bold'
                                                }}> YES </span>  <br />
                                            </small>
                                        </div>
                                        <div className='col-md-4 m-1'>
                                            <small className='text-muted text-center p-2'>
                                                Dairy Free:  <span className='text-success'> YES </span> <br />
                                            </small>
                                        </div>
                                    </div>
                                </li>

                                {/** now we are going to list the favour profile of the item we are displaying */}
                                <li className='list-group-item'>
                                    <div className='row'>
                                        <small className='text-muted p-2'>
                                           {/** food icon */}
                                            <i className="fas fa-utensils" style={{
                                                fontSize: '1.5rem'
                                            }}></i>
                                            <strong>Favour Profile </strong>  <br />
                                        </small>
                                    </div>
                                    <div className='row'>
                                        <div className='col m-1'>
                                            <small className='text-muted text-center p-2'>
                                                Spicy: <span className='text-danger'>No </span>  <br />
                                            </small>
                                        </div>

                                            <div className='col m-1'>
                                                <small className='text-muted text-center p-2'>
                                                    Sweet:   <span className='text-danger'> No</span><br />
                                                </small>
                                            </div>

                                            <div className='col m-1'>
                                                <small className='text-muted text-center p-2'>
                                                    Savory: <span className='text-success'> YES </span> <br />
                                                </small>
                                            </div>
                                    </div>
                                </li>

                            </ul>
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

                                                            return ReactDOM.render(
                                                                <div className='recipe-ingredients'>
                                                                    {/** ingedent list for the recipe selected  */}
                                                                    <h2 className='text-center' style={{fontWeight: '700'}}> Ingredients </h2>
                                                                    <span> Required Ingredients for this recipe. </span>
                                                                    <ol className='list-group list-group-flush m-4'>
                                                                       <li className='list-group-item'>
                                                                            <div className='row'>
                                                                                <small className='text-muted p-2'>
                                                                                    <i className="fas fa-utensils"></i>
                                                                                    <span className='text-center'>

                                                                                        <span> 6oz Steak</span>
                                                                                    </span>
                                                                                </small>
                                                                            </div>
                                                                        </li>

                                                                        <li className='list-group-item'>
                                                                            <div className='row'>
                                                                                <small className='text-muted p-2'>
                                                                                    <i className="fas fa-utensils"></i>
                                                                                    <span className='text-center'>
                                                                                       {/** Badge for each ingredient   */}

                                                                                        <span> 3oz Demi Glaze </span>
                                                                                    </span>
                                                                                </small>
                                                                            </div>
                                                                        </li>

                                                                        <li className='list-group-item'>
                                                                            <div className='row'>
                                                                                <small className='text-muted p-2'>
                                                                                    <i className="fas fa-utensils"></i>
                                                                                    <span className='text-center'>

                                                                                        <span> 1 portion Seasonal Veggies </span>
                                                                                    </span>
                                                                                </small>
                                                                            </div>
                                                                        </li>

                                                                        <li className="list-group-item">
                                                                            <div className='row'>
                                                                                <small className='text-muted p-2'>
                                                                                    <i className="fas fa-utensils"></i>
                                                                                    <span className='text-center'>
                                                                                        <span> Arugula for garnish </span>
                                                                                    </span>
                                                                                </small>
                                                                            </div>
                                                                        </li>

                                                                        <li className='list-group-item'>
                                                                            <div className='row'>
                                                                                <small className='text-muted p-2'>
                                                                                    <i className="fas fa-utensils"></i>
                                                                                    <span className='text-center'>

                                                                                        <span> 1 portion of starch of choice </span>
                                                                                    </span>
                                                                                </small>
                                                                            </div>
                                                                        </li>
                                                                    </ol>
                                                                </div>, contentContainer
                                                            );
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
                                                            <div className='recipe-cookingTime'>
                                                                <h5 className='text-center'>
                                                                    {/** cooking time for the recipe selected  */}
                                                                    <i className="fas fa-clock"></i>
                                                                    Cooking Time: <span className='text-success'> 30 minutes </span>
                                                                </h5>
                                                            </div>, contentContainer);
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

                                                        return ReactDOM.render(
                                                          <NutritionalLabel calories={700} /> , contentContainer);
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


                                                        return ReactDOM.render(<section className='content-container'>
                                                                <header>
                                                                    <h1 className='text-center' style={{
                                                                        fontWeight: '4',
                                                                        fontSize: '2.5rem'
                                                                    }}> Recipe Directions  </h1>
                                                                </header>

                                                                <main>
                                                                    {/** main a section inorder to guide the user
                                                                     * to the steps of the recipe
                                                                     *
                                                                     */}
                                                                    <div className='container'>
                                                                        <div className='row'>
                                                                            <div className='col-md-12'>
                                                                                <ol className='list-group'>

                                                                                    <li className='list-group-item'>
                                                                                        <p>  Grill steak to the customers specifications </p>
                                                                                    </li>
                                                                                    <li className='list-group-item'>
                                                                                        <p>  Grill steak to the customers specifications </p>
                                                                                    </li>
                                                                                    <li className='list-group-item'>
                                                                                        <p>  Grill steak to the customers specifications </p>
                                                                                    </li>
                                                                                    <li className='list-group-item'>
                                                                                        <p>  Grill steak to the customers specifications </p>
                                                                                    </li>
                                                                                    <li className='list-group-item'>
                                                                                        <p>  Grill steak to the customers specifications </p>
                                                                                    </li>
                                                                                </ol>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </main>

                                                            </section>, contentContainer);



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
