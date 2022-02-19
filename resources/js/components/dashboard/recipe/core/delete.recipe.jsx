/**
 *
 *   @componnent DeleteRecipe
 *
 *
 *  @purpose inorder to delete a given recipe from the database
 *
 */



import React from "react";
import ReactDOM  from "react-dom";

import FetchServiceProvider from "../../../../lib/fetchServiceProvider";
import { TemplateModal } from "./template.modal";

export const DeleteRecipe = (props) => {
    // inorder to delete a recipe we need to open a modal
    const deleteRecipe =  async () => {
        const api = new FetchServiceProvider();
        const url = `/api/v1/recipe/${props.recipeId}`;

        return await api.delete(url);
    }


    // now we need to send a modal to the user to confirm the deletion
    const confirmDelete = () => {
        // render a confrim modal

    }

    // a modal if that recipe couldnt be deelted    will be shown
    const deleteFailed = () => {
        // render a error modal.
    }


    return (
        <TemplateModal title='Delete Recipe' body={

            <div className='_content_'>
                <h4 className='header-subtitle'> Delete a recipe </h4>
                <small className='text-subtitle'> Are you sure you want to delete this recipe? </small> <br/><br/>
                <p className='text-danger'> This action can not be reversed. </p>

                <div className='form-group mt-4'>
                    <button className='btn btn-message mt-2' onClick={(e) => {
                    }}> Yes </button>
                    <button className='btn btn-danger mt-2' onClick={(e) => {
                    }}> No </button>

                </div>
            </div>
        }/>
    )

}
