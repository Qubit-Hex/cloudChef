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


    const validationCheck = (e) => {
        // query all the inputs and the fields
        let inputContainer = document.getElementById("modal-container");

        const inputs = inputContainer.querySelectorAll("input");
        // check have the fields been filled ?

        // make a map of the the inputs by their name
        let inputMap = _.map(inputs, (input) => {
            return {
                [input.name]: null,
            };
        });

        // reduce the map inorder to only display the unique fields that have been filled
        let inputReduce = _.reduce(inputMap, (acc, curr) => {
            return {
                ...acc,
                ...curr
            };
        });

        // map the inputs based on if they were checked or not ?
        let validateInputs = _.map(inputs, (input) => {
            // is input a radio button ?
            if (input.type === "radio") {
                // has our input been seledcted ?
                if (input.checked) {
                    return inputReduce[input.name] = input.value;
                }
            }
            // is input a file or text ?
            if (input.type === "file" || input.type === "text") {
               // has the field been filled ?
                return inputReduce[input.name] = input.value;
            }
        });

        // now lets check if the fields have been filled if not
        // then we need to display the error message to the dom
        // and return false

        const validateFields = Object.keys(inputReduce).map((key) => {
            if (inputReduce[key] === null || inputReduce[key] === "") {
                // return a error message to the dom.
                let errorMessage = document.getElementById(key+"-error");
                // render the error message to the dom
                ReactDOM.render(<div class="alert alert-danger">Please fill out all the fields</div>, errorMessage);
                return false;
            } else {
                let errorMessage = document.getElementById(key+"-error");
                ReactDOM.render('', errorMessage); // remove the error message from the dom
                return true;
            }
        });

        // check the array of fields that have been filled
        // if all the fields have been filled then return true
        // else return false

        if (validateFields.includes(false)) {
            return false;
        }

        // return execute our api call to the server
        return handleIngredients();
    }


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
                        "Accept": "application/json",
                        'accessToken': api.getCookie("accessToken")

                    }
                    // get the raw binary data of the file
                    const data = new FormData();
                    data.append("file", input.files[0], input.files[0].name);
                    // send the file to the server

                    // we will use a promise to handle the response.
                    return {
                        [input.name]: api.upload(route, data, headers)
                    }
                }
        });
        // now convert userInputs into a single object
        let userInputsObject = _.reduce(userInputs, (result, input) => {
            return {...result, ...input}
        }, {});

        // get the result of the  file upload ?
            userInputsObject.recipeImage.then(result => {
                // preform a render based on the response that we get from the server
                if (result.error) {
                    let errorContainer = document.getElementById("recipeImage-error");
                    // now lets render the error message to the dom
                    ReactDOM.render(<div class="alert alert-danger">{result.error}</div>, errorContainer);
                } else {
                    // we will pass the state of the object into each component. This will be used to update the state of the application
                    // wrap this in setTimeout to wait for the file to be ready

                    userInputsObject.key = result.key; // add the key to the object

                    return ReactDOM.render(<AddRecipeIngredients  recipeSummary={userInputsObject}/>, container);
                }
            });
    }

    // create our modal the will store the recipe information
    return (
        <div className="modal apply-modal-animation recipe-modal">
            <div
                className="modal-dialog">
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
                                            validationCheck(e);
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
