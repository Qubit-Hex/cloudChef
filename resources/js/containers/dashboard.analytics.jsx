/**
 *
 *
 *  @file: dashboard.analytics.jsx
 *
 *  @purpose: to provide analytics for the dashboard for admin users only
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";

export const DashboardAnalytics = (props) => {
    return (
        <div className="container-fluid profile_card dashboard-content">
            {/** load the d3 library */}
            <div className="row">
                <h2 className="ml-4">
                    {" "}
                    <b>Analytics </b>{" "}
                    <small className="sub-caption ">
                        {" "}
                        Welcome ()
                        <br />
                        <span className="text-center">
                            View and track your stores performance{" "}
                        </span>{" "}
                    </small>
                </h2>
                <br />
                <small className="'text-center text-muted">
                    {" "}
                    <i className="fas fa-info-circle"></i>Have your whole team
                    on the same page!{" "}
                </small>
            </div>

            {/** add a component inorder to dynamically search the recipes  in the database */}
            <div className="row">
                <div className="col">
                    <img
                        src="/img/SVG/data_analytics.svg"
                        width={400}
                        height={400}
                        className="img-fluid mx-auto d-block"
                    />
                </div>
            </div>

            <div className="row">
                {/**
                 *    create section to show current store sales and data and current operating
                 *    costs of the store for the current day
                 */}
                <div className="col">
                    <h2 className="text-center">
                        {" "}
                        <b>Current Store Sales</b>{" "}
                    </h2>
                    {/** DISPLAY THE CURRENT DATE    */}
                    <div className="row">
                        <div className="col">
                            <h5 className="text-center">
                                {" "}
                                <b>Today</b> {Date().toString()}{" "}
                            </h5>
                            <h5 className="text-center">
                                {" "}
                                <b> Sales</b> $ {5000}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/** store performance card  */}
                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <b>Food Cost</b>
                            </h5>

                            <Chart
                                chartType="Bar"
                                data={[
                                    ["Period", "Cost"],
                                    ["Jan", 3000],
                                    ["Feb", 10000],
                                    ["Mar", 15000],
                                    ["Apr", 18000],
                                    ["May", 21000],
                                    ["Jun", 14000],
                                ]}
                                width="100%"
                                height="400px"
                            />

                            <p
                                className="card-text"
                                style={{ fontWeight: 600 }}
                            >
                                View food cost for your stores
                            </p>

                            <button className="btn btn-message mt-4 w-50 mx-auto d-block">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {/** labour cost card  */}

                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <b>Labour Cost</b>
                            </h5>

                            <Chart
                                chartType="Bar"
                                data={[
                                    ["Period", "Cost"],
                                    ["Jan", 5000],
                                    ["Feb", 7000],
                                    ["Mar", 10000],
                                    ["Apr", 12000],
                                    ["May", 9000],
                                    ["Jun", 15000],
                                ]}
                                width="100%"
                                height="400px"
                            />

                            <p
                                className="card-text"
                                style={{ fontWeight: 700 }}
                            >
                                {" "}
                                View Detailed labour report.
                            </p>

                            <button className="btn btn-message mt-4 w-50 mx-auto d-block">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* sales card  */}

            <div className="row">
                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-money-check"></i>
                                <b>Sales</b>
                            </h5>
                            <p className="card-text">
                                View sales for your stores
                            </p>

                            <Chart
                                chartType="Bar"
                                data={[
                                    [
                                        "Period",
                                        " Projected Sales",
                                        "actual sales",
                                    ],
                                    ["Jan", 20000, 30000],
                                    ["Feb", 30000, 20000],
                                    ["Mar", 25000, 20000],
                                    ["Apr", 10000, 10000],
                                    ["May", 40000, 50000],
                                    ["Jun", 50000, 60000],
                                ]}
                                width="100%"
                                height="400px"
                            />

                            <button className="btn btn-message w-50 mt-4 mx-auto d-block">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {/* inventory card  */}
                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-boxes"></i>
                                <b>Inventory</b>
                            </h5>
                            <p className="card-text">
                                View inventory for your stores
                            </p>

                            <Chart
                                chartType="Bar"
                                data={[
                                    ["Period", "Sales"],
                                    ["Jan", 20000],
                                    ["Feb", 30000],
                                    ["Mar", 25000],
                                    ["Apr", 10000],
                                    ["May", 40000],
                                    ["Jun", 50000],
                                ]}
                                width="100%"
                                height="400px"
                            />
                            <button className="btn btn-message w-50 mx-auto d-block">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
