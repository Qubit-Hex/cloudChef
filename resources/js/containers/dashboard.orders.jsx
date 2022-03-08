/**
 *
 *  @file: dashboard.orders.jsx
 *
 *  @purpose :  container for the kitchen display component
 *
 */


import React from "react";
import ReactDOM from "react-dom";

import { KitchenDisplayUnit } from "../components/dashboard/orders/KitchenDisplayUnit";


// we will be setting up routes for the dashboard pages here

const KitchenDisplayContainer = (props) => {


    {/** this will our component that will do the heavy lifting add a large level of abstraction
        in order to hide the complex logic  */}
    return (
        <div className='container-fluid'>
            <KitchenDisplayUnit />
        </div>
    )

}

export const DashboardOrders = (props) => {

    return (
        <div className="container profile_card dashboard-content" style={{top: '15%'}}>
        <div className="row">

            {/** we will be adding routing to this at a later time */}
            <KitchenDisplayContainer />
        </div>
        </div>
    )
}
