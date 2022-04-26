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
import { isNumber } from "lodash";

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
    return <Chart chartType='BarChart'
        width={'100%'}
        height={'400px'}
        data={[
            ['Day', 'Labour Cost'],
            ['Monday', 100],
            ['Tuesday', 200],
            ['Wednesday', 300],
            ['Thursday', 400],
            ['Friday', 500],
            ['Saturday', 600],
            ['Sunday', 700]
        ]}
        options={{
            title: 'Labour Cost',
            chartArea: { width: '50%' },
            hAxis: {
                title: 'Day',
                minValue: 0
            },
            vAxis: {
                title: 'Labour Cost',
                minValue: 0
            }
        }} />
}


const TodaysLabourCost = (props) => {

    const [cost, setCost] = React.useState(0);

    const request =  async() => {

        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/labour/daily';

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return await api.get(route, header);
    }



    // get daily labour cost

    function getDailyLabourCost(response)
    {
        let hours = 0;
        for (let i = 0; i < response.data.length; i++) {
            let start = response.data[i].start_time;
            let endTime = response.data[i].end_time;
            // convert the time to a float
            start = parseFloat(start.replace(':', '.'));
            endTime = parseFloat(endTime.replace(':', '.'));
            let total = endTime - start;

            // use the old school loop since map and filter run way slower...
            for (let j = 0; j < response.employeeSalary.length; j++)
            {
                if (response.employeeSalary[j].id === response.data[i].employee_id) {
                   let hourlyRate = Math.round(response.employeeSalary[j].salary / 52 / 40);
                   hours += total * hourlyRate;
                   console.log(hours);
                }
            }
        }

        return hours;
    }

    // get the cost of the labour for the store
    React.useEffect(() => {
        request().then(response => {
            console.log(response);

            if (response.status === 200 || response.status === 'success') {

                if (response.data.length > 0) {
                    // run the function inorder to get the labour cost
                    setCost(getDailyLabourCost(response));
                } else {
                    // we go not data back
                    setCost("No Data");
                }

            }});


    }, []);
    return <div> <h1 className='header-title mt-4'> { isNumber(cost)  === true ? `\$${cost}` : "No Data" } </h1></div>

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


                    <div className="row">
                        <div className='col-md-12 mx-auto d-block text-center'>
                            <button className='header-action btn-lg' onClick={
                                (e) => {
                                    const container = document.getElementById('labourWeekly');
                                }
                            }>
                                <i className="fas fa-chart-bar"></i>
                                <span> Go </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/** three containers for the charts analytics  */}
            <div className="row">
                <div className="col-md-3 mx-auto chart-container">
                    <h1 className="text-center header-subtitle">
                        <b> Today's Labour Cost </b>

                    </h1>

                    <div id='labourDaily'>
                        <TodaysLabourCost />
                    </div>
                </div>

                <div className="col-md-3 chart-container mx-auto">
                    <h1 className="text-center header-subtitle">
                        <b> Weekly Labour Cost </b>
                    </h1>

                    <div id='labourWeekly'>
                        <LabourCostWeekly />
                    </div>
                </div>

            </div>
        </div>
    );
};
