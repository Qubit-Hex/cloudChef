/**
 *
 *  @component CreateRecipeModal
 *
 *
 *
 *  @purpose: to generate the modal for creating news recipes in the database
 *
 */

import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";

/**
 *
 * @component  Add Ingredents
 *
 *
 */


const AddRecipeIngredients = (props) => {



    // the state where we will hold the ingredients
    const [ingredient, setIngredient] = React.useState([]);

    // close the modal window
    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    };



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
        <div className="col-md-12">
            <h4 className='header-subtitle'> Ingredients </h4>
            <div className="form-group">
            <label htmlFor="recipe-ingredents">Add Ingredient </label>
             <input type='text' className="form-control mt-2 mb-2" id="recipe-ingredents" placeholder="Enter ingredents" />
             <button className='btn btn-message mt-2 mx-auto d-block' onClick={(e) => {
                // append the the ingredents to the ingredents array
                let ingredents = document.getElementById("recipe-ingredents").value;
                // append the ingredents to the ingredents array
                setIngredient(ingredient => [...ingredient, ingredents]);
            }}> Add Ingredents </button>

            </div>
        </div>
        </div>

        <div className='row'>
            {/** here we will render a table with the new ingrednets that we are going to add to the recipe */}
            {/** refactor this into a componet that we will pass out state into,  */}
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
                    );
                })
                }
                </tbody>
            </table>
        </div>
        <div className="row-cols-1">
                                {/** next and back buttons for the dialog  */}
                                <div className='col mx-auto d-block'>
                                    <button onClick={
                                        (e) => {
                                            alert('next page');
                                        }
                                    }
                                        className="btn btn-message w-25 btn-block m-3"
                                    >
                                        Next
                                    </button>

                                    <button
                                        className="btn btn-danger w-25 btn-block m-3"
                                        onClick={(e) => {
                                            alert('back page');

                                        }}

                                    >
                                        Back
                                    </button>


                                </div>
                                </div>

        </div>

        </div>
        </div>
        </div>
        </div>
    );
}


export const CreateRecipeModal = (props) => {
    // close the modal windows to the application
    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    };


    // active the handle igredients page of the application

    const handleIngredients = () => {
        let container = document.getElementById("modal-container");

        return ReactDOM.render(<AddRecipeIngredients />, container);
    }



    // create our modal the will store the recipe information
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
                            padding: "10px",
                        }}
                    >
                        {/**  create a form for uploading a image  */}
                        <div className="container">
                        <h4 className="header-subtitle"> Recipe Details  </h4>
                            <div className="row">
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">
                                        Recipe Image
                                    </label>
                                    <input
                                        type="file"
                                        class="form-control mt-2 mb-2"
                                        id="createrecipe-uploadimage"
                                    />
                                </div>
                            </div>


                            <div className='row'>
                                {/** recipe name  */}
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="createrecipe-name">Recipe Name</label>
                                        <input type="text" className="form-control mt-2 mb-2" id="createrecipe-name" placeholder="Enter recipe name" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">
                                        Category Name
                                    </label>
                                    <input type='text' className='form-control mt-2 mb-2' placeholder='Please enter a category Name' />
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio1"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                value="option2"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="inlineRadio2"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                value="option1"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio1"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                value="option2"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio1"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                value="option2"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio1"
                                                value="option1"
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
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                value="option2"
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
                                {/** next and back buttons for the dialog  */}
                                <div className='col'>
                                    <button onClick={
                                        (e) => {
                                            handleIngredients();
                                        }
                                    }
                                        className="btn btn-message w-25 btn-block m-3"
                                    >
                                        Next
                                    </button>

                                    <button
                                        className="btn btn-danger w-25 btn-block m-3"

                                    >
                                        Back
                                    </button>


                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
