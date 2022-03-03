/**
 *
 *
 *  @file: dashboard.analytics.jsx
 *
 *  @purpose: to provide analytics for the dashboard for admin users only
 *
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
                        src="/img/prediction.svg"
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
                    <h2 className="text-center" style={{
                        fontSize: '1.5em',
                        marginTop: '1em',
                        fontWeight: '800',
                    }}>
                        {" "}
                <b> Quick Overview. </b>{" "}
                    </h2>
                    {/** DISPLAY THE CURRENT DATE    */}
                    <div className="row">
                        <div className="col">
                            <p className="text-center mt-2" style={{
                                fontWeight: '500',
                            }}>
                                {" "}
                                {Date().toString()}{" "}
                            </p>
                            <section className='text-center' style={{
                                fontWeight: 800,
                            }}>
                            <span className="text-center m-4">
                                <i className="fas fa-shopping-cart" style={{
                                    fontSize: '1.5em',
                                    color: '#3b5998'
                                }}></i> Sales  $ {5000}
                            </span>

                            <span className="text-center m-4">
                                {/** labour cost  */}
                                <i className="fas fa-users" style={{
                                    fontSize: '1.5em',
                                    color: '#3b5998'
                                }}></i> Labour Cost  $ {5000}
                            </span>

                            <span className='text-center m-4'>
                                {/** food cost  */}
                                <i className="fas fa-utensils" style={{
                                    fontSize: '1.5em',
                                    color: '#3b5998'
                                }}></i> Food Cost  $ {5000}
                            </span>

                            <span className='text-center m-4'>
                                {/** operating cost  */}
                                <i className="fas fa-cogs" style={{
                                    fontSize: '1.5em',
                                    color: '#3b5998'
                                }}></i> Operating Cost  $ {5000}
                            </span>
                        </section>
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

                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <b> Peak Times </b>
                            </h5>
                            <p className="card-text">
                                View peak times for your stores
                            </p>

                            {/** use a line chart for peak times */}
                            <Chart
                                chartType="Line"
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
                        <button className='btn btn-message w-50 mx-auto d-block'>
                            View
                        </button>
                    </div>
                </div>

                {/** make a card to see most sold menu item today  */}
                <div className="col-sm">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <b>Most Sold Menu Item</b>
                            </h5>
                            <p className="card-text">
                                View most sold menu item for your stores
                            </p>
                            {/** bar chart of 5 most popular items and amount sold */}
                            <Chart
                                chartType="Bar"
                                data={[
                                    ["Item", "Sales"],
                                    ["Chicken", 20000],
                                    ["Beef", 30000],
                                    ["Pork", 25000],
                                    ['ceaser salad', 10000],
                                    ['pizza', 40000],
                                    ['burger', 50000],
                                ]}
                                width="100%"
                                height="400px"/>

                                <button className="btn btn-message w-50 mx-auto d-block">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm">
                        <div className="card">
                            {/**make a card to top 5 best performing waitress */}
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="fas fa-chart-bar mr-2"></i>
                                    <b>Best Performing Waitress</b>
                                </h5>
                                <p className="card-text">
                                    View best performing waitress for your stores
                                </p>
                                {/** bar chart of 5 best performs waitress */}
                                <Chart
                                    chartType="Bar"
                                    data={[
                                        ["Waitress", "Sales"],
                                        ["Sarah Jones", 20000],
                                        ["John Doe", 30000],
                                        ["Jane Doe", 25000],
                                        ['Jane Doe', 10000],
                                        ['John Doe', 40000],
                                        ['Sarah Jones', 50000],

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

                    <div className="col-sm">
                        <div className="card">
                            {/** make a card to display customer complaints
                             *   what waa the complaint
                             *  how many times it was reported durning a shift.
                             *  how many time per week it was reported
                             * how many time per month it was reported
                              */}
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="fas fa-chart-bar mr-2"></i>
                                    <b>Customer Complaints</b>
                                </h5>
                                <p className="card-text">
                                    View customer complaints for your stores
                                </p>
                                {/** bar chart for customer complaints */}
                                <Chart
                                    chartType="Bar"
                                    data={[
                                        ["Complaint", "time reported today", 'times reported this week',
                                         'times reported this month', 'item'],
                                        ["Customer Complaint", 20000, 30000, 25000, 10000],
                                        ['Dry Food', 40000, 50000, 60000, 20000],
                                        ['Overpriced', 50000, 60000, 70000, 30000],
                                        ['Underpriced', 60000, 70000, 80000, 40000],
                                        ['Overcooked', 70000, 80000, 90000, 50000],
                                        ['Undercooked', 80000, 90000, 100000, 60000],
                                        ['Overcooked', 90000, 100000, 110000, 70000],
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

                    <div className="col-sm">
                        {/** card for best performing cook */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="fas fa-chart-bar mr-2"></i>
                                    <b>Best Performing Cook</b>
                                </h5>
                                <p className="card-text">
                                    View best performing cook for your stores
                                </p>
                                {/** bar chart for best performing cook */}


                                {/**
                                 *  Best performing cooks algorithm
                                 *
                                 *  1. Cook on shift and sales
                                 *  2. the time of there tickets how fast and they sell bills
                                 *  3. percentage of there attendance record
                                 *  4. amount of complaints average shift
                                 *  5. cleanliness of the kitchen
                                 *  6. work efficiency score
                                 *  7. average time to serve
                                 *
                                 */}
                                </div>
                        </div>
                    </div>
            </div>
        </div>
</div>
    );
};
