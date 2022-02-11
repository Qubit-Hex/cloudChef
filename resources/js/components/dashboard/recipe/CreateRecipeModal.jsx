/**
 *
 *  @component CreateRecipeModal
 *
 *
 *
 *  @purpose: to generate the modal for creating news recipes in the database
 *
 */

import _, { result } from "lodash";
import React, { Component } from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";



// sub components export for the parent component

import { CreateNutritionalFacts } from "./core/create.NutritionalFacts";
import { AddRecipeIngredients } from "./core/create.addRecipeIngredients";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";


export const CreateRecipeModal = (props) => {
    // close the modal windows to the application


    const closeWindow = () => {
        let container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    };

    // check if the data is being passed to the component
    const handleIngredients = () => {
        let container = document.getElementById("modal-container");

        // load all the user Inputs
        let inputElements = container.querySelectorAll('input');

        // return the values of the inputs to a object
        let userInputs = _.map(inputElements, (input) => {
           // return a object with the name as the key and the value as the value
           // check inputs is a radio or a text input
           // we need to perform the checks on the operatation.
              if (input.type === "radio") {
                  // check if the radio button is checked
                    if (input.checked === true) {
                        return {
                            [input.name]: input.value
                        }
                }
              }
                if (input.type === "text") {
                    return {
                        [input.name]: input.value
                    }
                }
                if (input.type === "file") {
                    // send the file to the server side api for processing
                    const api = new FetchServiceProvider();
                    const route = "/api/store/recipes/file";

                    const headers = {
                        // headers for uploading the file
                        "Accept": "application/json"

                    }

                    // get the raw binary data of the file
                    const data = new FormData();
                    data.append("file", input.files[0], input.files[0].name);

                    console.log(data.get(input.files[0].name));

                    // send the file to the server
                    api.upload(route, data, headers).then((response) => {
                        console.log(response);
                    })
                }
        });

        // now convert userInputs into a single object
        let userInputsObject = _.reduce(userInputs, (result, input) => {
            return {...result, ...input}
        }, {});

        // we will pass the state of the object into each component. This will be used to update the state of the application

        // wrap this in setTimeout to wait for the file to be ready
            return ReactDOM.render(<AddRecipeIngredients  recipeSummary={userInputsObject}/>, container);
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
                                        <input type="text" name='recipeName' className="form-control mt-2 mb-2" id="createrecipe-name" placeholder="Enter recipe name" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">
                                        Category Name
                                    </label>
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="glutenFree"
                                                id="inlineRadio"
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
                                                id="inlineRadio2"
                                                value="false"
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
                                                name="dairyFree"
                                                id="inlineRadio3"
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
                                                id="inlineRadio3"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="nutFree"
                                                id="inlineRadio4"
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
                                                name="nutfeee"
                                                id="inlineRadio3"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="eggFree"
                                                id="inlineRadio3"
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
                                                name="eggFree"
                                                id="inlineRadio3"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="fishFree"
                                                id="inlineRadio3"
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
                                                id="inlineRadio3"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="sweet"
                                                id="inlineRadio1"
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
                                                id="inlineRadio2"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="savory"
                                                id="inlineRadio1"
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
                                                id="inlineRadio2"
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
                                    <div className="form-group">
                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="spicy"
                                                id="inlineRadio1"
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
                                                id="inlineRadio2"
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
                                            handleIngredients();
                                        }
                                    }
                                        className="btn btn-message w-50 btn-block m-3"
                                    >
                                        Next
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
