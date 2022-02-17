
/**
 *
 *  @component: RecipeIngredients
 *
 *
 *  @purpose: inorder to render the ingredients of the recipe in a list from for the
 *            end user to see how to prepare the recipe
 *
 */


 import React from "react";
 import { ReactDOM } from "react-dom";


 export const RecipeIngredients = (props) => {

    return (
        <div className='recipe-ingredients'>
        {/** ingedent list for the recipe selected  */}
        <h2 className='text-center' style={{fontWeight: '700'}}> Ingredients </h2>
        <p className='text-center text-muted'> Required Ingredients for this recipe. </p>
        <ol className='list-group list-group-flush m-4'>

            {/** now we are going to list the ingredients of the item we are displaying */}
        {
            Object.keys(props.data).map((item, index) => {
                return (
                    <li className='list-group-item' key={index}>
                        <div className='row'>
                            <small className='text-muted p-2'>
                                <i className='fas fa-utensils'></i>
                                <span className='text-center'>
                                     <span> <strong>  { props.data[item] }  </strong></span>
                                </span>
                            </small>
                        </div>
                    </li>
                );
            })

        }
        </ol>
    </div>
  );

}
