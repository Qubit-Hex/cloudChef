/**
 *
 *
 *  @file: dashboard.recipies.jsx
 *
 *
 *  @purpose: to render the dashboard recipes page
 */

import React from "react";
import ReactDOM from "react-dom";
import { RecipeModal } from "../components/dashboard/recipe/recipeModal";
import FetchServiceProvider from "../lib/fetchServiceProvider";
import { CreateRecipeModal } from "../components/dashboard/recipe/CreateRecipeModal";
import { RecipeModifyModal } from "../components/dashboard/recipe/recipeModifyModal";
import { DeleteRecipe } from "../components/dashboard/recipe/core/delete.recipe";
import { AdminGuard } from "../components/dashboard/core/guard";
import { UserGuard } from "../components/dashboard/core/guard";

/**
 *
 *  @component: addRecipeCard
 *
 *
 *  @purpose: inorder to add the recipe to the system
 *
 *
 */

const AddRecipeCard = (props) => {
    return (
        <div className="row">
            {/** here we are going to add a component inorder to create a section to add recipes to the database  */}

            <div className="col-md-6 mx-auto d-block">
                <div className="card">
                    {/** font awesome add button */}

                    <div className="card-header bg-transparent">
                        <h5 className="card-title header-subtitle">
                            Add Recipe
                        </h5>
                        <small className="text-muted">
                            {" "}
                            Make your team stronger by connecting all your
                            information in one place.{" "}
                        </small>
                    </div>

                    <div className="card-body p-lg-5">
                        <img
                            src="/img/SVG/toast_out.svg"
                            width={300}
                            height={300}
                            className="img-fluid mx-auto d-block"
                            alt="chef-platter"
                        />
                        <p className="card-text text-center">
                            Add a new recipe to your database
                        </p>

                        <button
                            className="btn btn-message w-25 mx-auto d-block"
                            data-toggle="modal"
                            data-target="#addRecipeModal"
                            onClick={(e) => {
                                const modalContainer = document.getElementById("modal-container");

                                return ReactDOM.render(
                                    <CreateRecipeModal id={null} />,
                                    modalContainer
                                );
                            }}
                        >
                            Add<i className="fas fa-plus-circle m-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/***
 *
 *  @component: editRecipe
 *
 *  @purpose: inorder to render the edit recipe section of the table
 *
 *
 */

const EditRecipe = (props) => {
    return (
        <button
            className="btn btn-warning m-2 "
            data-toggle="modal"
            data-target="#editRecipeModal"
            onClick={(e) => {
                const modalContainer =
                    document.getElementById("modal-container");

                return ReactDOM.render(
                    <RecipeModifyModal id={props.recipeID} />,
                    modalContainer
                );
            }}
        >
            Edit<i className="fas fa-edit m-2"></i>
        </button>
    );
};

/**\
 *
 *  @method: DeleteRecipeButton
 *
 *
 *  @purpose: inorder to render the delete recipe button
 *
 */

const DeleteRecipeButton = (props) => {
    return (
        <button
            className="btn btn-danger m-2"
            data-toggle="modal"
            data-target="#deleteRecipeModal"
            onClick={(e) => {
                const modalContainer =
                    document.getElementById("modal-container");
                // this will contain the delete modal for delete a recipe from the database
                return ReactDOM.render(
                    <DeleteRecipe id={props.recipeID} />,
                    modalContainer
                );
            }}
        >
            Delete<i className="fas fa-trash-alt m-2"></i>
        </button>
    );
};

/**
 *
 *  @component: ViewRecipeButton
 *
 *
 *  @purpose: inorder to render the view recipe button
 *
 */

const ViewRecipeButton = (props) => {
    return (
        <button
            className="btn btn-message m-2"
            data-toggle="modal"
            data-target="#viewRecipeModal"
            onClick={(e) => {
                const modalContainer =
                    document.getElementById("modal-container");

                return ReactDOM.render(
                    <RecipeModal id={props.recipeID} />,
                    modalContainer
                );
            }}
        >
            View<i className="fas fa-eye m-2"></i>
        </button>
    );
};


/**
 *
 *  @component:DashboardRecipies
 *
 *  @purpose: inorder to render the main dashboard page.
 *
 *
 */



export const DashboardRecipies = (props) => {
    const [recipes, setRecipes] = React.useState({});

    // get the recipe information from tAdd he database
    // and enumerate the table row inorder to get the recipes information
    const getRecipes = () => {
        const api = new FetchServiceProvider();

        const route = "/api/store/recipes/get";

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };

        return api.get(route, headers);
    };

    const dataTunnel = getRecipes();

    React.useEffect(() => {
        // get the data from our promise that holds our data
        dataTunnel.then((response) => {
            setRecipes(response.data);
        });
    }, []);

    // generator function to create the table rows

    const generateTablesRows = () => {
        // add an error boundry to check if the tables rows are empty

        if (recipes.length === 0) {
            return (
                <tr>
                    {/** error icon  */}
                    <td colSpan="5" className="text-center">
                        {/** no  recipes found icon */}
                        <img
                            src="/img/SVG/empty_inbox.svg"
                            alt="no recipes found"
                            width="200px"
                            height="200px"
                        />
                        <h3
                            className="text-danger"
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            No Recipes found
                        </h3>
                    </td>
                </tr>
            );
        }

        return Object.keys(recipes).map((item, index) => {
            // auto generate the tables rows for each of the recipes in the database
            return (
                <tr key={index}>
                    <td> {recipes[item].recipe_name}</td>
                    <td> {recipes[item].catagory} </td>
                    <td> {recipes[item].created_at}</td>
                    <td> {recipes[item].updated_at}</td>
                    <td className="d-flex">
                        {/**
                         *
                         * only render the edit or delete button if the user is a admin.
                         *
                         */}
                        <UserGuard
                            cargo={
                                <ViewRecipeButton
                                    recipeID={recipes[item].recipe_id}
                                />
                            }
                        />
                        <AdminGuard
                            cargo={
                                <EditRecipe recipeID={recipes[item].recipeID} />
                            }
                        />
                        <AdminGuard
                            cargo={
                                <DeleteRecipeButton
                                    recipeID={recipes[item].recipe_id}
                                />
                            }
                        />
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container-fluid profile_card dashboard-content">
            <div id="modal-container"></div>
            <div className="row mt-4 mb-4">
                {/** display the title for the page.  */}
                <h1
                    className="header-subtitle text-center"
                    style={{
                        fontSize: "2em",
                    }}
                >
                    Recipes
                </h1>

                <small className="text-center text-muted mt-4 mb-4">
                    Manage your recipes here. You can add, edit and delete
                    recipes.
                </small>

                <img
                    src="/img/SVG/cloud_recipe.svg"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
            </div>

            <AdminGuard cargo={<AddRecipeCard />} />

            <div className="row">
                <div className="col">
                    <div id="modal-container" className="modal-container"></div>
                    <div id="modal-alert-container"></div>
                    <div className="card">
                        <div className="card-header bg-transparent text-center">
                            <h2 className="header-subtitle text-center mt-4 ">
                                Current store recipes
                            </h2>
                            <div className="_img_ d-block mx-auto text-center">
                                <img
                                    src="/img/SVG/recipie_header.svg"
                                    alt="schedule icon"
                                    width="300px"
                                    height="300px"
                                    className="mx-auto img-fluid"
                                />
                            </div>

                            <p className="text-center">
                                {" "}
                                All your recipes in one place, to make your life
                                easier.{" "}
                            </p>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> Recipe </th>
                                            <th> Catagory </th>
                                            <th> Date Added </th>
                                            <th> Date Modified </th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>

                                    <tbody>{generateTablesRows()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
