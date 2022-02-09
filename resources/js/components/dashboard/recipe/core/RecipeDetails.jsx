/**
 *
 * @component: RecipeDetails
 *
 *
 * @purpose: to render the recipe details component
 *           such as the name, allergies, and flavour profile
 *
 *
 */


import React from "react";
import { ReactDOM } from "react-dom";


 export const RecipeDetails = (props) => {

    // parse input of props

    const parseInput = (input) => {
        if (input === null) {
            return "";
        }
        // now lets check if input is equal to true or false
        return input === true ? "Yes" : "No";
    }

    return (
        <ul className='list-group list-group-flush m-4'>

        <li className='list-group-item'>
            <div className='row'>
                <small className='text-muted p-2'>
                   {/** icon for recipe catagory in restaurant  */}
                    <i className="fas fa-utensils" style={{
                        color: '#ffc107',
                        fontSize: '1.5rem'
                    }}></i>
                    <span className='text-center'> <strong> Recipe Catagory:  <span> {props.catagory} </span></strong></span>
                </small>
            </div>
        </li>
        {/* refactor this to a component */}

        <li className='list-group-item'>
            <div className='row'>
                {/** allergy information  */}
                <small className='text-muted p-2'>
                    {/** icon for allergies use a greenish color */}
                    <i className="fas fa-allergies" style={{
                        color: '#28a745',
                        fontSize: '1.5rem'
                    }}></i>
                    <span className='text-center'> <strong> Allergies: </strong></span>
                </small>
            </div>
            <div className='row'>
                <div className='col-md-4 m-1'>
                    <small className='text-muted text-center p-2'>
                        {/** brown bread color for bread icon */}
                        Gluten Free:  <span className='text-danger bold'> { parseInput(props.glutenFree) }</span><br />
                    </small>
                </div>
                <div className='col-md-4 m-1'>
                    <small className='text-muted text-center p-2'>
                        Egg Free:  <span className='text-success'> { parseInput(props.eggFree)} </span> <br />
                    </small>
                </div>
                <div className='col-md-4 m-1'>
                    <small className='text-muted text-center p-2'>
                        Fish Free: <span className='text-success'> { parseInput(props.fishFree) } </span>  <br />
                    </small>
                </div>
                <div className='col-md-4 m-1'>
                    <small className='text-muted text-center p-2'>

                        Nut Free: <span className='text-danger' > { parseInput(props.nutFree) } </span>  <br />
                    </small>
                </div>
                <div className='col-md-4 m-1'>
                    <small className='text-muted text-center p-2'>
                        Dairy Free:  <span className='text-success'> { parseInput(props.dairyFree) } </span> <br />
                    </small>
                </div>
            </div>
        </li>

        {/** now we are going to list the favour profile of the item we are displaying */}
        <li className='list-group-item'>
            <div className='row'>
                <small className='text-muted p-2'>
                   {/** food icon */}
                    <i className="fas fa-utensils" style={{
                        fontSize: '1.5rem'
                    }}></i>
                    <strong>Favour Profile </strong>  <br />
                </small>
            </div>
            <div className='row'>
                <div className='col m-1'>
                    <small className='text-muted text-center p-2'>
                        Spicy: <span className='text-danger'> { parseInput(props.spicy) } </span>  <br />
                    </small>
                </div>

                    <div className='col m-1'>
                        <small className='text-muted text-center p-2'>
                            Sweet:   <span className='text-danger'> { parseInput(props.sweet)} </span><br />
                        </small>
                    </div>

                    <div className='col m-1'>
                        <small className='text-muted text-center p-2'>
                            Savory: <span className='text-success'> { parseInput(props.savory)} </span> <br />
                        </small>
                    </div>
            </div>
        </li>
     </ul>
    )
}
