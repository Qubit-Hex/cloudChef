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
import { AuthController } from "../core/AuthController";


// button for the pos system to clean up the some of the code to make it more readable
// for now ill will only handle the click events

// but i also might change this into a class and use factorys intead of the prop components.
// so we can use the same component for the pos and the dashboard
const POS_Button = (props) => {
    return (
        <div className='card pos-button'  onClick={props.handleClick}>
            <div className='card-header'>
                <h3 className='card-title'>{ props.title }</h3>
            </div>

            <div className='card-body'>
                <i className={ props.icon }></i>
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
                    <div className="card pos-button">
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

                {/** add order section with sections such as beverage, appetizer, entree, dessert, and side */}
                <POSContainer>
                    <POS_Button title='Beverage' icon='fas fa-wine-bottle fa-3x' handleClick={() => { alert('hellp ')} } />
                    <div className='container pos'>
                    <div className="row">
                        {/** create threes for our initial screwen in the pos system */}
                        <div className='col'>
                            <div className="card pos-button">
                                <div className='card-header'>
                                    <h5 className='card-title'> Go Back</h5>
                                </div>
                                <div className='card-body'>
                                    {/** back button font awesome */}
                                    <i className="fas fa-arrow-left fa-4x"></i>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card pos-button">
                                <div className='card-header'>
                                    <h5 className='card-title'>Beverage</h5>
                                </div>
                                <div className='card-body'>
                                    {/** champne glasess font awesome */}
                                    <i className="fa-solid fa-champagne-glasses fa-4x"></i>

                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className='card pos-button'>
                                <div className='card-header'>
                                    <h5 className='card-title'>Appetizer's</h5>
                                </div>
                                <div className='card-body'>
                                    <i className="fas fa-utensils fa-4x"></i>

                                </div>
                            </div>
                        </div>


                        <div className='col'>
                            <div className='card pos-button'>
                                <div className='card-header'>
                                    <h5 className='card-title'>Entree's</h5>
                                </div>
                                <div className='card-body'>
                                {/** pizza slice icon */}
                                    <i className="fas fa-pizza-slice fa-4x"></i>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='card pos-button'>
                                <div className='card-header'>
                                    <h5 className='card-title'>Desserts</h5>
                                </div>
                                <div className='card-body'>
                                    <i className="fas fa-ice-cream fa-4x"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className='card pos-button'>
                                <div className='card-header'>
                                    <h5 className='card-title'>Salads</h5>
                                </div>
                                <div className='card-body'>
                                    <i className="fa-solid fa-leaf fa-4x"></i>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='card pos-button'>
                                <div className='card-header'>
                                    <h5 className='card-title'>Sides</h5>
                                </div>
                            <div className='card-body'>
                                {/** icon for sides */}
                                <i className="fas fa-utensils fa-4x"></i>
                            </div>
                        </div>
                   </div>
                    </div>
            </div>
                </POSContainer>
        </div>
    </div>);
}
