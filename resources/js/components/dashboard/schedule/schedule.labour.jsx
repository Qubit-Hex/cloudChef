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
 *  @function: getStoreSchedule
 *
 *
 *  @purpose: this is inorder to get the schedule for the store returning a promise containing our schedule
 *            data for use to work with in other functions.
 *
 */

 const getStoreSchedule = async (cookie, year, week) => {

    const headers = {
        "Content-Type": "application/json",
        accessToken: cookie,
        week: week,
        year: year
    };

    const route = "/api/store/schedule/get";

    const api = new FetchServiceProvider();

    const request =  api.get(route, headers);

    return await request;
};


/**
 *
 *  @component : LabourCostChart
 *
 *  @purpose : inorder to the render the labour section of the schedule page.
 *
 */

const LabourCostChart = (props) => {

    return (
        <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Day', 'Cost'],
                        ["Sunday", props.sunday],
                        ["Monday", props.monday],
                        ["Tuesday", props.tuesday],
                        ["Wednesday", props.wednesday],
                        ["Thursday", props.thursday],
                        ["Friday", props.friday],
                        ["Saturday", props.saturday],
                    ]}

                    options={{
                        title: 'Labour Cost',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Day',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Total Hours',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />
    )
}


/**
 *
 * @component : DisplayError
 *
 * @purpose : inorder to display an error message if the user has not selected a week. or a network error of some sort,.
 *
 */

  const DisplayError = (props) => {

    return (
        <div className="alert alert-danger mt-2" role="alert">
            <div className='mx-auto'>
                <h4 className="alert-heading">Oh snap! You got an error!</h4>
                <img src='/img/SVG/store.svg' width={200} height={200} alt="store" />
            </div>

            <div className='text-muted'>
                <p>
                    {props.error}
                </p>
            </div>
        </div>
    )
}


/**
 *
 *  @component : ScheduleLabour
 *
 *
 *  @purpose : This component is responsible for rendering the schedule of the organization.
 *
 *
 */

export const ScheduleLabour = (props) => {

    const api = new FetchServiceProvider();
    const cookie = api.getCookie("accessToken");
    const [labour, setLabour] = React.useState([]);

    // function inorder to group the days of the week into an array.
    const groupDays = (labour) => {

        // check if the labour is empty. if so return an empty array.
        if (labour.length === undefined) {
            return [];
        }

        //  the number is the day of the week by a numerical representation  from 1 to 7.
            const sunday = labour.filter(day => day.day === 7);
            const monday = labour.filter(day => day.day === 1);
            const tuesday = labour.filter(day => day.day === 2);
            const wednesday = labour.filter(day => day.day === 3);
            const thursday = labour.filter(day => day.day === 4);
            const friday = labour.filter(day => day.day === 5);
            const saturday = labour.filter(day => day.day === 6);

            // get the store hours per day off the week
            const totalHours = (day) => {
                let total = 0;
                return day.map(hour => {
                   return hour.end_time - hour.start_time;
                })
            };

            // combine all values into a object containing the total hours per day
            const totalHoursPerDay = {
                sunday: totalHours(sunday),
                monday: totalHours(monday),
                tuesday: totalHours(tuesday),
                wednesday: totalHours(wednesday),
                thursday: totalHours(thursday),
                friday: totalHours(friday),
                saturday: totalHours(saturday)
            };


            // add the total hours per day to the schedule
            totalHoursPerDay.sunday = totalHoursPerDay.sunday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.monday = totalHoursPerDay.monday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.tuesday = totalHoursPerDay.tuesday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.wednesday = totalHoursPerDay.wednesday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.thursday = totalHoursPerDay.thursday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.friday = totalHoursPerDay.friday.reduce((a, b) => a + b, 0);
            totalHoursPerDay.saturday = totalHoursPerDay.saturday.reduce((a, b) => a + b, 0);

            // return the new values of the array.
            return totalHoursPerDay;
    }


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

                <small className='text-muted text-center m-2'>
                    Track your labour cost for your store.
                </small>
                <br />

                {/** add a week data picker inorder to render the schedule data  */}

                <div className='row'>
                    <div className='col'>
                        <input type='week' id='weekPicker' className='form-control m-2' />
                        <button className='btn btn-message mt-4 mx-auto' onClick={
                            (e) => {
                            // now lets trigger the function to get the schedule data
                            const weekInput = document.getElementById('weekPicker').value;
                            const container = document.getElementById('labour-cost-wrapper');
                            const year = weekInput.split("-")[0];
                            // use regex to only return the week number
                            const week = weekInput.split("-")[1].match(/\d+/g);

                            const scheduleRes = getStoreSchedule(cookie, year, week).then(  (response) => {
                                setLabour(response.data);
                                return new Promise((resolve, reject) => {
                                    let data = groupDays(response.data).length === 0 ? false : groupDays(response.data);
                                    if (data) {
                                        resolve(groupDays(response.data));
                                    } else {
                                        // might add more edge case here to render differnt error messages. based on the edge that was hit.
                                        reject("No data found");
                                    }
                                });
                            });
                            // return the schedule data to the container of the application.
                            scheduleRes.then( (data) => {
                                const chart = new LabourCostChart(data);
                                ReactDOM.render(chart, container);
                            }).catch( (error) => {
                                // render our error message to the container.
                                ReactDOM.render(<DisplayError error={error} />, container);
                                });

                            // now we need to get the data from the server and render it to the page.
                            // inorder to properly render the data from the chart we need to get the data from the server.

                        }}> Go </button>

                    </div>
                </div>

                 {/** make a chart that show the data for the week */}

                 <div id='labour-cost-wrapper'>

                 </div>

            </div>
        </div>
    </div>
    );
}
