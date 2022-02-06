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
import FetchServiceProvider from "../lib/fetchServiceProvider";

export const DashboardRecipies = (props) => {


    const [recipes, setRecipes] = React.useState({});


    // get the recipe information from the database
    // and enumerate the table row inorder to get the recipes information
    const getRecipes = () => {
        const api = new FetchServiceProvider();

        const route = '/api/store/recipes/get';

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return api.get(route, headers);
    }

    const dataTunnel = getRecipes();

    React.useEffect( () => {

    // get the data from our promise that holds our data
        dataTunnel.then(response => {
            setRecipes(response.data);
        });
    }, []);



    // generator function to create the table rows

    const generateTablesRows = () => {
        return Object.keys(recipes).map((item, index ) => {
            // auto generate the tables rows for each of the recipes in the database
            return (
                    <tr key={index}>
                    <td> { recipes[item].recipe_name }</td>
                    <td> { recipes[item].catagory } </td>
                    <td>  { recipes[item].recipe_create_at }</td>
                    <td> { recipes[item].recipe_update_at }</td>
                    <td>
                        <button className='btn btn-message' data-toggle="modal" data-target="#editRecipeModal"  onClick={
                            (e) => {
                                const modalContainer = document.getElementById('modal-container');
                                // we will create a rough draft of what the card will look like,
                                // and then we will pass it to the modal container
                                // later we will use components inorder to achieve the same result

                                // for the code to be reusable though out our application
                                // we will use the modal container to render the modal component
                                return ReactDOM.render(<RecipeModal id={ recipes[item].recipe_id  }/>, modalContainer);

                            }
                        }>
                            View<i className="fas fa-eye m-2"></i>
                        </button>

                    </td>
                </tr>
            )
        });

    }



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
                            {"Current store recipes"}
                            </h2>

                            <img
                                src="/img/SVG/recipie_header.svg"
                                alt="schedule icon"
                                width="300px"
                                height="300px"
                                className="mx-auto img-fluid" />

                                <small className='text-center' style={{
                                    fontWeight: '600'
                                }}> All your recipes in one place,
                                to make your life easier. </small>

                                {/**
                                 *
                                 * add a component inorder to add recipes to the page current store
                                 *
                                 *  @blueprint: add a component inorder to add recipes to the page current store
                                 *              and then update the view to reflect the changes on that datbase
                                 *
                                 * */}



                                <table className='table mt-2 mb-2'>
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
                                        {/** trigger the generator inorder to display our recipe data form the data
                                         *  fetched from the database.
                                         */}


                                        {  generateTablesRows() }


                                    </tbody>
                                </table>

                            {/** modern recipe table for viewing recipes in a  */}
                   </div>
                </div>
            </div>
    )
}
