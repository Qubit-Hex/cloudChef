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


export const OrderSystemProvider = (props) => {

        return (
            <div className="container-fluid profile_card dashboard-content">
            <div className="row">
                {/**
                 *
                 *  layout three tiles with add order, edit orders and delete order
                 *
                 */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Order</h5>
                            <p className="card-text">
                                {/** add shopping cart icon */}
                                <i className="fa fa-shopping-cart fa-5x"  style={{
                                    color: '#00bcd4',
                                    margin: 'auto',
                                    display: 'block',
                                    marginTop: '20px',

                                }}
                                aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        );

}
