/**
 *
 *   @compoennt ModifyRecipeIngredients
 *
 *
 *  @purpose  Inorder to modify the recipe ingredients for a given recipe
 *
 */


import React from "react";
import ReactDOM from "react-dom";

// sub imports
import FetchServiceProvider from "../../../../lib/fetchServiceProvider";
import { TemplateModal } from "./template.modal";

export const ModifyRecipeIngredients = (props) => {

    // the state where we will hold the ingredients
    const [ingredient, setIngredient] = React.useState([]);
    const [status, setStatus] = React.useState(null);

    // close the modal window
    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    };

    // check the length of the ingredients array
    // weather or not to render the table

    const checkLength = (state) => {
        if (ingredient.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // get the ingredients for the recipe
     const getIngredients =  async () => {
         // covert to async call
         let api = new FetchServiceProvider();
         let route = '/api/store/recipes/find/' + props.id;

         const headers = {
                'Content-Type': 'application/json',
                'accessToken': api.getCookie('accessToken')
         }

         // make the call
        const response = await api.get(route, headers);

        return response;
    }



    //  now send the request to the server for proccessing
    const sendRequest = async (data) => {
        const api = new FetchServiceProvider();
        const route = '/api/store/recipes/update/ingredients/';

        //  set the headers of the recioe
        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'recipeId': props.id
        }

        // make the call
        const response = await api.patch(route, data, headers).then(response => {
            if (response.status === 200) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        });
    }


    // handle the nutritional facts for the ingredients
    const handleNutritionalFacts = () => {
        let modalContainer = document.getElementById('modal-container');
        // does the ingredient list have any ingredients?
        if (ingredient.length === 0) {
            let errorWrapper = document.getElementById('recipeIngredientsError');
            // render error message to the screen
            return ReactDOM.render((<div class="alert alert-danger"> <b> Error: </b> Your Recipe Must contain at least one ingredient. </div>), errorWrapper);
        } else {
            // if the list is not empty render our next page that will handle the nutritional facts
           // our function that will update the recipe goes here.
           // send the request to the server
            sendRequest(ingredient);
        }
    }


    // build the ingredient list
    React.useEffect(() => {
        // get the ingredients for the recipe
        getIngredients().then(response => {
            // set the ingredients to the state
            let recipe = response.data.recipe_ingredients.recipe_ingredients;
            setIngredient(JSON.parse(recipe));
        });

    }, []);

        //  check the state of our application.
    //  if the state is true then we will render the success message
    //  if the state is false then we will render the error message

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
                                Your recipe ingredients have been updated
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
        <div className="row">
        <div className="col">
            <hr />
            <h4 className='header-subtitle text-center'> Ingredients </h4>
            <div className="form-group">
            <div className='col-md-10 mx-auto d-block'>
                <div id='modal-alert-container'></div>
                <label htmlFor="recipe-ingredents">Add Ingredient </label>
                <small className='text-muted'> Example: 6oz of demi glaze. </small>
                <input type='text' className="form-control mt-2 mb-2" id="recipe-ingredents" placeholder="Enter ingredents" />
                <span  id='recipeIngredientsError' className='text-danger'></span>
                <button className='btn btn-message mt-2 mx-auto d-block w-75' onClick={(e) => {
                // append the the ingredents to the ingredents array
                let ingredents = document.getElementById("recipe-ingredents").value;
                // append the ingredents to the ingredents array

                if (ingredents !== "") {
                    // check the input fields is not empty then set the state to render the ingredents list
                    setIngredient([...ingredient, ingredents]);
                    document.getElementById("recipe-ingredents").value = "";
                } else {
                    // we will trigger a bootstrap alert to notify the user that the ingredents were added
                    // we will also clear the input field
                    let createAlert = document.getElementById("modal-alert-container");
                    // render our alert to the screen to let the user know that the ingredents were added
                    ReactDOM.render( <div className="alert-container" role="alert">
                        {/* make a modern looking alert message */}

                        <div className="alert alert-warning alert-dismissible fade-in">
                            <button href="#" className="btn btn-transparent close ml-4 mr-4" data-dismiss="alert"
                            onClick={
                                (e) => {
                                    // remove the alert from the screen
                                    ReactDOM.unmountComponentAtNode(createAlert);
                                }
                            }
                            aria-label="close">&times;</button>
                            <span>
                                <strong>Warning:</strong> Your recipe must contain one ingredient.
                            </span>
                        </div>

                </div>, createAlert);
                }
            }}> Add </button>
            </div>
            </div>
        </div>
        </div>

        <div className='row mt-4'>
            {/** here we will render a table with the new ingredents that we are going to add to the recipe */}
            {/** refactor this into a component that we will pass out state into,  */}

            {
                // check our length of our render then render the table
                checkLength(ingredient) ?  (
                <div>
                    <h3 className='header-subtitle text-center'>Ingredient List </h3>
                    <table className='table mt-4'>
                <thead>
                    <tr>
                        <th> Ingredient </th>
                        <th> Action </th>
                    </tr>
                </thead>

                <tbody id='recipe-ingredents-list-container'>
                    {/** our put will be generated here  */}
                    {

                    ingredient.map((item, index) => {

                    return (
                        <tr key={index}>
                            <td> {item} </td>
                            <td> <button className='btn btn-danger mx-auto d-block w-auto' data-key={index} onClick={
                                // remove an item from the ingredents array
                                (e) => {
                                    // this is our clean up operation in the ingredents array
                                    let newState = ingredient;

                                    // map all the ingredents in the array that does not equal our data key
                                    let newArray = newState.map((item, key) => {
                                        if (index !== key) {
                                            return item;
                                        }
                                        // remove empty values
                                    });
                                    // remove all the empty values from the array
                                    let cleanArray = newArray.filter(item => item);
                                    setIngredient(cleanArray);
                                }

                            }> Remove </button></td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table> </div>
                ) : false

            }
        </div>
                            <div className="row mt-4 ml-4 mx-auto">
                                { /** make back and next buttons in same row side by side  */}
                                <hr />

                                <div className='col mt-2'>
                                    <button className='btn header-action mx-auto d-block w-100' onClick={(e) => {
                                        // handle the nutritional facts for the ingredients
                                        handleNutritionalFacts();
                                    }}> Next </button>
                                </div>


                                </div>
                            </div>
    );
}
