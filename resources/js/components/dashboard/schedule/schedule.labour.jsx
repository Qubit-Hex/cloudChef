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
    const request = async () => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/labour/weekly';

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return await api.get(route, header);
        // preform the request to the database
    };



    React.useEffect(() => {
        request().then(response => {
            console.log(response);
        });

    }, []);

    // pass the data to the google chart for rendering of the information from the database.
    return <Chart chartType="Bar"
        data={[
            ['Mon ', 'Labour Cost'],
            ['Tues', 0],
            ['Wed', 10],
            ['Thurs', 200],
            ['Fri', 300]
            ['Sat', 400]
            ['Sun', 500]
        ]}
        options={{
            title: 'Labour Cost',
            hAxis: { title: 'Week', titleTextStyle: { color: '#000' } },
            vAxis: { minValue: 0 }
            }}
            graph_id="LabourCostWeekly"
            width="100%"
            height="400px"/>;
}


const TodaysLabourCost = (props) => {
    const request =  async() => {

        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/labour/today';

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return await api.get(route, header);
    }


    return <div> <h1 className='header-title'> $ 500</h1></div>

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


         // format a date range by providing a week number and year
         // this is a rudimentary function to format the date range
         const formatDateRange = (week, year) => {
            const date = new Date(year, 0, 1 + (week - 1) * 7);
            const date2 = new Date(year, 0, 1 + week * 7);
            const month = date.toLocaleString('default', { month: 'long' });
            const month2 = date2.toLocaleString('default', { month: 'long' });
            const day = date.toLocaleString('default', { day: 'numeric' });
            const day2 = date2.toLocaleString('default', { day: 'numeric' });
            const dateRange = `${month} ${day} - ${month2} ${day2}`;
            return dateRange;
        }


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

                <div className='col-md-6 d-block mx-auto text-center'>
                    <select className='form-select'>
                        <option> Please Select an week </option>
                        {
                            schedule.map((item, index) => {
                                return <option key={index}>{formatDateRange(item.week, item.year) } </option>
                            })
                        }
                    </select>
                </div>
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

            </div>
        </div>
    );
};
