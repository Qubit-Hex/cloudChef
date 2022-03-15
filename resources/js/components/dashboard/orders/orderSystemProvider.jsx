/**
 *
 * @file: orderSystemProvider.jsx
 *
 *
 *  @purpose:  This component is used to interact with the order system
 *
 *
 *
 *  @functionality:   - place an orders, authenticate user, get orders, get order details,
 *                    - send order details to the order system, get order status,
 *
 */

import React from "react";
import ReactDOM from 'react-dom';
import { KitchenDisplayUnit } from "./KitchenDisplayUnit";


// button for the pos system to clean up the some of the code to make it more readable
// for now ill will only handle the click events

// but i also might change this into a class and use factorys intead of the prop components.
// so we can use the same component for the pos and the dashboard
export const POS_Button = (props) => {
    return (
        <div className='col-md-2'>
        <div className='card pos-button'  onClick={props.handleClick}>
            <div className='card-header'>
                <h3 className='card-title'>{ props.title }</h3>
            </div>

            <div className='card-body'>
                <i className={ props.icon }></i>
            </div>
        </div>
        </div>
    )
}


// container for the pos system inorder to make the code more readable...
const POSContainer = (props) => {
    return (
        <div className='container pos'>
        <div className="row">
            { props.children }
        </div>
        </div>
    );
}



export const OrderSystemProvider = (props) => {

        return (
            <div className="container-fluid profile_card dashboard-content pos" id='pos-system-container'>

                    <img src='/img/SVG/shopping_cart.svg' className='img-fluid' />
                    <span className='header-subtitle'> Welcome to the Order System.  </span>
                    <p className='header-subtitle  text-center'> <b style={{ color: 'black'}}> Your Success is our mission! </b> </p>


            <div className="row" style={{
                marginLeft: '10vw',
            }}>
                {/** create 3 modern tiles for adding a order, editing an order, and deleting an order */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card pos-button" onClick={
                        (e) => {// render our options inorder to display the orders of the system.
                            const container = document.getElementById('pos-container');
                            ReactDOM.render(

                            <POSContainer>
                                <POS_Button title='Go Back' icon='fas fa-arrow-left fa-4x' handleClick={ (e) => {
                                    // now clear the container and render the dashboard again
                                    ReactDOM.render(<div></div>, container);
                                }}/>
                                <POS_Button title='Beverage' icon='fa-solid fa-champagne-glasses fa-4x' handleClick={props.handleClick}/>
                                <POS_Button title='Appetizer' icon='fa-solid fa-utensils fa-4x' handleClick={props.handleClick}/>
                                <POS_Button title='Entree' icon='fas fa-pizza-slice fa-4x' handleClick={props.handleClick}/>
                                <POS_Button title='Dessert' icon='fas fa-ice-cream fa-4x' handleClick={props.handleClick}/>
                                <POS_Button title='Side' icon='fas fa-utensils fa-4x' handleClick={props.handleClick}/>
                                <POS_Button title='Salad' icon='fas fa-leaf fa-4x' handleClick={props.handleClick}/>
                            </POSContainer>, container);
                        }
                    }>
                        <div className='card-header'>
                            <h5 className="card-title">Add Order</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                   {/** add cart icon font awesome */}
                                    <i className="fas fa-cart-plus fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/** view current orders in queue   */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card pos-button" onClick={
                        (e) => {
                            // display the kitchen orders in the dashboard
                            let container = document.getElementById('pos-container');
                            ReactDOM.render(<KitchenDisplayUnit />, container);
                        }
                    }>
                        <div className='card-header'>
                            <h5 className="card-title">View Orders</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    {/** add cart icon font awesome */}
                                    <i className="fas fa-shopping-cart fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/** edit order section */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card pos-button">
                        <div className='card-header'>
                            <h5 className="card-title">Edit Order</h5>
                        </div>

                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    {/** edit cart icon font awesome */}
                                    <i className="fas fa-edit fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/** delete order section */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="card pos-button">
                        <div className='card-header'>
                            <h5 className="card-title">Delete Order</h5>
                        </div>

                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    {/** delete cart icon font awesome */}
                                    <i className="fas fa-trash-alt fa-3x"></i>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {/** container for holding the order actions such as add, modify, and delete */}
            <div className="row" id='pos-container'>
                {/** build me a point of sales system ui for a restaurant
                 *   need this like catagories, items, and orders
                */}


        </div>
    </div>);
}
