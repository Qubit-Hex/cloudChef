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

    console.log(props.id);


    const [status, setStatus] = React.useState(null);
    // inorder to delete a recipe we need to open a modal
    const deleteRecipe =  async () => {
        const api = new FetchServiceProvider();
        const url = '/api/store/recipes/delete/';

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'recipeId': Number(props.id)
        }

        return await api.delete(url, headers);
    }

    const closeModal = () => {
        const container = document.getElementById("modal-container");
        return ReactDOM.unmountComponentAtNode(container);
    }


    // render the success or falure message
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
                                    Your recipe has been deleted successfully
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
                                    Your recipe has failed to delete. Please try again
                                </span>
                             </span>
                            </div>
                        } />
                </div>
            );
        }

    return (
        <TemplateModal title='Delete Recipe' body={

            <div className='_content_'>
                <h4 className='header-subtitle'> Delete a recipe </h4>
                <small className='text-subtitle'> Are you sure you want to delete this recipe? </small> <br/><br/>
                <p className='text-danger'> This action can not be reversed. </p>

                <div className='form-group mt-4'>
                    <button className='btn btn-message mt-2' onClick={(e) => {
                        deleteRecipe().then((response) => {
                            if (response.status === 200) {
                                setStatus(true);
                            } else {
                                setStatus(false);
                            }
                        })
                    }}> Yes </button>
                    <button className='btn btn-danger mt-2' onClick={(e) => {
                        closeModal();
                    }} > No </button>

                </div>
            </div>
        }/>
    )

}
