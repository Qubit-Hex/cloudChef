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
import { isNumber, isString } from "lodash";


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
                }
            }
        }

        return hours;
    }

    // get the cost of the labour for the store
    React.useEffect(() => {
        request().then(response => {

            if (response.status === 200 || response.status === 'success') {

                if (response.data.length > 0) {
                    // run the function inorder to get the labour cost
                    setCost(getDailyLabourCost(response));
                } else {
                    // we go not data back
                    setCost("No Data Available at this time");
                }

            }});

    }, []);
    return <div> <h1 className='mt-4' style={{
        fontSize: '4rem',
    }}> { isNumber(cost)  === true ? `\$${cost}` : "No Data" } </h1></div>

}


/**
 *
 *  @component: weeklyLabourCost
 *
 *
 *   @purpose: inorder to render the weekly labour cost of the organization.
 *
 *
 *  @props: scheduleID
 *
 */

const WeeklyLabourCost = (props) => {

    // check if the props.ScheduleID is a number

    const [error, setError] = React.useState(false);
    const [labourData, setLabourData] = React.useState([]);


    const request = async(scheduleID) => {
        const api = new FetchServiceProvider();
        const route = '/api/store/schedule/labour/weekly';

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'scheduleID': scheduleID
        }

        return api.get(route, header);
    }


    // send the request to the server.
    React.useEffect(() => {
        request(props.scheduleID).then(response => {
            if (response.status === 200 || response.status === 'success') {
                    setLabourData(response.data);
            } else {
                setError(true);
            }
        });
    }, [])


    if (error === true) {
        return (
            <div className='text-danger text-center mt-2'>
                <h3>
                    <span className="fas fa-exclamation-circle text-danger"></span>
                    <span className='text-danger'> Error:  No data found for that week</span>
                </h3>
            </div>
        )

    }

    const getWeeklyLabourCost = (labourCost) => {

       return  Object.keys(labourCost).map((employee, index) => {
            return [
                labourCost[employee].first_name + ' ' + labourCost[employee].last_name,
                labourCost[employee].totalHours,
                " $" + Math.round(labourCost[employee].totalHours * labourCost[employee].salary),
            ];
        });
    }



    return (<Chart chartType="Bar"
        width="100%"
        height="400px"
        data={[
            ['employee', 'hours', 'LabourCost'],
            ...getWeeklyLabourCost(labourData)
            ]}
            options={{
                title: 'Weekly Labour Cost',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Hours',
                    minValue: 0
                    },
                    vAxis: {
                        title: 'Employee'
                        },
                        legend: { position: 'none' }
                        }}
                        legendToggle
                        />)
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

                <div className='col-md-12'>
                    <h2 className="header-subtitle text-center">Labour Cost</h2>
                    <div className='_img_ d-block mx-auto text-center'>
                        <img src="/img/SVG/finance_analytics.svg" width={250} height={250} />
                    </div>
                        <p className="text-center text-muted">
                            Current Labour cost of your store
                        </p>
                </div>

                    <div className="col-md-6 d-block text-center mx-auto">
                        <div className='form-group'>
                            <label> Please select a week </label>
                            <p id="error-container" className='text-danger'></p>
                            <select className='form-select mt-4' id='schedule-id'>
                            <option> Please select a week </option>
                            {
                                schedule.map((week, index) => {
                                    return (
                                        <option key={index} value={week.id}>
                                            {formatDateRange(week.week, week.year)}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        </div>

                        <div className='form-group'>
                            <button className='btn header-action w-75' onClick={
                                (e) => {
                                    const container = document.getElementById('weekly-labour-container');
                                    const scheduleID = document.getElementById('schedule-id').value;
                                    const errorContainer = document.getElementById('error-container');

                                    if (scheduleID === 'Please select a week') {
                                       return errorContainer.innerHTML = 'Please select a week';
                                    }

                                    errorContainer.innerHTML = '';
                                    if (container.hasChildNodes()) {
                                       ReactDOM.unmountComponentAtNode(container);
                                    }

                                    return ReactDOM.render(<WeeklyLabourCost scheduleID={scheduleID} />, container);
                                }
                            }>
                                <i className="fas fa-sync-alt"></i>
                                GO
                            </button>
                        </div>
                    </div>
            </div>

            {/** three containers for the charts analytics  */}
            <div className="row">

                <div className='col-md-5 mx-auto chart-container'>
                    {/** section inorder to render the employees labour via the week selected */}
                    <h1 className='text-center header-subtitle'>
                        <b> Weekly Labour Cost</b>
                    </h1>

                    <small className='text-center text-muted'>
                        View your labour cost for the week selected.
                    </small>

                    <div id='weekly-labour-container'>

                    </div>
                </div>



                <div className="col-md-5 mx-auto chart-container">
                    <h1 className="text-center header-subtitle">
                        <b> Today's Labour Cost </b>
                    </h1>
                    <small className='text-center text-muted'>
                            View your labour cost for today
                        </small>

                    <div id='labourDaily'>
                        <TodaysLabourCost />
                    </div>
                </div>

            </div>
        </div>
    );
};
