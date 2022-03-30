/**
 *
 *  @file:  Schedule.labour.jsx
 *
 *
 *  @purpose : This component is responsible for rendering the schedule of the organization.
 */



import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { Chart } from "react-google-charts";

/**
 *
 *  @method: getLabourCost
 *
 *  @purpose : This method is responsible for rendering the labour cost of the organization.
 *
 */

/**
 *
 *  @component : Schedule Labour
 *
 *  @purpose : inorder to the render the labour section of the schedule page.
 *
 */


export const ScheduleLabour = (props) => {

    return (

        <div className="row mx-auto">
        <div className="col card fit-table">
            <h2 className="header-subtitle text-center mt-4 ">
                {" View your labour cost for your store."}
            </h2>

            <img
                src="/img/SVG/finance_analytics.svg"
                alt="schedule icon"
                width="300px"
                height="300px"
                className="mx-auto img-fluid"
            />
            <div className="schedule_pill">
                {/** chart to show the daily labour cost of our store */}

                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Day', 'Labour Cost'],
                        ['Mon', 200],
                        ['Tue', 600],
                        ['Wed', 700],
                        ['Thu', 500],
                        ['Fri', 0],
                        ['Sat', 0],
                        ['Sun', 0],
                    ]}
                    options={{
                        hAxis: {
                            title: 'Day',
                        },
                        vAxis: {
                            title: 'Labour Cost',
                        },
                        legend: {
                            position: 'bottom',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}

                />



            </div>
        </div>

        <div className="col card fit-table">
            <h2 className="header-subtitle text-center mt-4 ">
                {" View your over time watch."}
            </h2>

            <img
                src="/img/SVG/user_status.svg"
                alt="schedule icon"
                width="300px"
                height="300px"
                className="mx-auto img-fluid"
            />
            <div className="schedule_pill">

            {/** make a bar chart to show employee over time cost  */}

            <Chart chartType="BarChart" width="100%" height="400px" data={
                [ [ 'Employee', 'OT Hours', 'Cost' ],
                    [ 'John', 10, 400 ],
                    [ 'Peter', 20, 500 ],
                    [ 'Sam', 30, 600 ],

            ]
            } />


            </div>
        </div>
    </div>
    );
}
