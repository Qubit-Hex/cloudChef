/**
 *
 *
 *  @file: dashboard.recipies.jsx
 *
 *
 *  @purpose: to render the dashboard recipes page
 */


import React from "react"
import ReactDOM from "react-dom"
import { RecipeModal } from "../components/dashboard/recipe/recipeModal";


export const DashboardRecipies = (props) => {


    return (
        <div className="container-fluid profile_card dashboard-content">
            <div className="row">

            <h2 className='ml-4'> <b>Recipes</b> <small className='sub-caption ' > Welcome ()
              <br /><span className='text-center'>View recipes, edit, and share</span> </small></h2><br/>
                    <small className="'text-center text-muted"> <i className="fas fa-info-circle"></i>Have your whole team on the same page! </small>
            </div>

            {/** add a component inorder to dynamically search the recipes  in the database */}
            <div className="row">
                <div id='modal-container' className="modal-container"></div>
                        <div className="col card fit-table">
                            <h2 className="header-subtitle text-center mt-4 ">
                            {" View your current store Recipes"}
                            </h2>

                            <img
                                src="/img/SVG/recipie_header.svg"
                                alt="schedule icon"
                                width="300px"
                                height="300px"
                                className="mx-auto img-fluid" />


                            <div className='row'>
                                <div className='col-md'>
                                   {/** section to search recipes that the user requests  */}
                                    <div className="form-group">
                                        <label htmlFor="search-recipe" style={{
                                            fontWeight: ''
                                        }}>Search for a recipe</label>
                                        <input type="text" className="form-control" id="search-recipe" placeholder="Search for a recipe" />
                                        <button className='btn btn-message mt-2 mb-2 mx-auto d-block' style={{
                                            width: '400px',
                                        }}> Search </button>
                                    </div>
                                    </div>
                            </div>

                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th> Recipe </th>
                                            <th> Catagory </th>
                                            <th> Date Added </th>
                                            <th> Date Modified </th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td> Sliced Steak </td>
                                            <td> Mains </td>
                                            <td> 2022-01-01</td>
                                            <td> 2022-01-01</td>
                                            <td>
                                                <button className='btn btn-message' data-toggle="modal" data-target="#editRecipeModal"  onClick={
                                                    (e) => {
                                                        const modalContainer = document.getElementById('modal-container');
                                                        // we will create a rough draft of what the card will look like,
                                                        // and then we will pass it to the modal container
                                                        // later we will use components inorder to achieve the same result
                                                        // for the code to be reusable though out our application

                                                        // we will use the modal container to render the modal component
                                                        return ReactDOM.render(<RecipeModal />, modalContainer);

                                                    }
                                                }>
                                                    View<i className="fas fa-eye m-2"></i>
                                                </button>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            {/** modern recipe table for viewing recipes in a  */}
                   </div>
                </div>
            </div>
    )
}
