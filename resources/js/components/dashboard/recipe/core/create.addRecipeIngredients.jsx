
/**
 *
 *   @component  AddRecipeIngredients
 *
 *   @purpose: to generate the modal for adding ingredients to the recipe. This modal will be used to add the ingredients to the recipe
 *
 *
 *  @author : Oliver Shwaba
 */

import React from "react";
import ReactDOM  from "react-dom";
import { CreateRecipeModal } from "../CreateRecipeModal";

// sub imports
import { CreateNutritionalFacts } from "./create.NutritionalFacts";

 export const AddRecipeIngredients = (props) => {


    // check if the data is being passed to the component
    console.log(props);
    // the state where we will hold the ingredients
    const [ingredient, setIngredient] = React.useState([]);

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
    // handle the nutritional facts for the ingredients
    const handleNutritionalFacts = () => {
        let modalContainer = document.getElementById('modal-container');
        return ReactDOM.render(<CreateNutritionalFacts recipeSummary={props.recipeSummary} recipeIngredients={ingredient} />, modalContainer);
    }

    return (
        <div className="modal apply-modal-animation recipe-modal">
        <div
            className="modal-dialog"
            style={{
                maxWidth: "80%",
            }}
        >
            <div class="modal-content w-75">
                <div class="modal-header">
                    <h5 class="modal-title "> Add Recipe </h5>
                    <button
                        type="button"
                        class="btn-transparent modal-close far fa-times-circle"
                        aria-label="Close"
                        onClick={(e) => {
                            e.preventDefault();
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
        <div className='container'>
        <div className="row">
        <div className="col">
            <h4 className='header-subtitle'> Ingredients </h4>
            <div className="form-group">
            <div className='col-md-6'>
                <label htmlFor="recipe-ingredents">Add Ingredient </label>
                <small className='text-muted'> Example: 6oz of demi glaze. </small>
                <input type='text' className="form-control mt-2 mb-2" id="recipe-ingredents" placeholder="Enter ingredents" />

                <button className='btn btn-message mt-2 w-25 mx-auto d-block' onClick={(e) => {
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
                                <strong>Warning!</strong> Please enter an ingredient field cannot be empty.
                            </span>
                        </div>

                </div>, createAlert);
                }
            }}> Add </button>
            </div>
            </div>
        </div>
        </div>

        <div className='row'>
            {/** here we will render a table with the new ingrednets that we are going to add to the recipe */}
            {/** refactor this into a componet that we will pass out state into,  */}

            {
                // check our length of our render then render the table
                checkLength(ingredient) ?  (
                    <table className='table mt-lg-3'>
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
                            <td> <button className='btn btn-danger w-25 mx-auto d-block' data-key={index} onClick={
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
            </table>
                ) : false

            }
        </div>
                            <div className="row mt-4 mx-auto d-block">
                                    {/** next and back buttons for the dialog  */}

                                        <button
                                            className="btn btn-danger w-25 btn-block m-3"
                                            onClick={(e) => {
                                                // render the prevoius dialog
                                                const container = document.getElementById("modal-container");
                                                return ReactDOM.render(<CreateRecipeModal />, container);
                                            }}

                                        >
                                            Back
                                        </button>


                                        <button onClick={
                                            (e) => {
                                                handleNutritionalFacts();
                                            }
                                        }
                                            className="btn btn-message w-25 btn-block m-3"
                                        >
                                            Next
                                        </button>

                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
    );
}
