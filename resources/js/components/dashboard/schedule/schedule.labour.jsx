/**
 *
 *  @file: schedule.labour.jsx
 *
 *
 *  @purpose: inorder to render the labour analytics of the organization.
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
// google charts
import Chart from "react-google-charts";

/**
 *
 *  @component: getLabourCostWeekly
 *
 *
 *  @purpose: inorder to get the labour cost of the organization for the week.
 *
 *
 */

const LabourCostWeekly = (props) => {
    // get the week cost of the labour for the store
    const request = () => {
        // preform the request to the database
    };

    // pass the data to the google chart for rendering of the information from the database.
    return <div></div>;
};

const LabourCostMonthly = (props) => {

    const request = () => {

    }
    return <div></div>
}


const TodaysLabourCost = (props) => {
    const request = () => {

    }

    return <div></div>
}


export const ScheduleLabour = (props) => {
    // schedule state

    const [schedule, setSchedule] = React.useState([]);

    // grab the required data from the props
    const request = async () => {
        // some request
        const api = new FetchServiceProvider();
        const route = "/api/store/schedule/get";

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };

        return await api.get(route, headers);
    };

    // set the data from the schedules.
    React.useEffect(() => {
        request().then((response) => {
            console.log(response);
            if (response.status === 200 || response.status === "success") {
                setSchedule(response.data);
            }
        });
    }, []);

    return (
        <div className="_labour_">
            <div className="row">
                <h2 className="header-subtitle text-center">Labour Cost</h2>
                <img
                    src="/img/SVG/finance_analytics.svg"
                    width={250}
                    height={250}
                />
                <p className="text-center text-muted">
                    Current Labour cost of your store
                </p>
            </div>

            {/** three containers for the charts analytics  */}
            <div className="row">
                <div className="col-md-3 mx-auto chart-container">
                    <h1 className="text-center header-subtitle">
                        <b> Today's Labour Cost </b>

                    </h1>

                    <div>
                        <TodaysLabourCost />
                    </div>
                </div>

                <div className="col-md-3 chart-container mx-auto">
                    <h1 className="text-center header-subtitle">
                        <b> Weekly Labour Cost </b>
                    </h1>

                    <div>
                        <LabourCostWeekly />
                    </div>
                </div>
                <div className="col-md-3 mx-auto chart-container">
                    <h1 className="text-center header-subtitle">
                        <b> Monthly Labour Cost </b>
                    </h1>

                    <div>
                        <LabourCostMonthly />
                    </div>
                </div>
            </div>
        </div>
    );
};
