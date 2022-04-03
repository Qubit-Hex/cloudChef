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
            <div className="col schedule_pill">
                {/** chart to show the labour cost of the current store.  */}
                <h3 className="header-subtitle text-center mt-4">
                    {"Labour Cost"}
                </h3>
                <br />
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Labour Cost'],
                        ['Jan', 1000],
                        ['Feb', 1170],
                        ['Mar', 660],
                        ['Apr', 1030],
                    ]}
                    options={{
                        title: 'Labour Cost',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Month',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Labour Cost',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>


            <div className='col schedule_pill'>
                    {/** create a chart for tracking employees on over time */}

                <h3 className="header-subtitle text-center mt-4">
                    {"Employees on over time"}
                </h3>

                <br />
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Month', 'Employees'],
                        ['Jan', 1000],
                        ['Feb', 1170],
                        ['Mar', 660],
                        ['Apr', 1030],
                    ]}
                    options={{
                        title: 'Employees on over time',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Month',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Employees',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
             </div>
        </div>
    </div>
    );
}
