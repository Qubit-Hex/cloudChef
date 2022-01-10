/*
 *
 *
 *  @file:  Schedule.Schedule.jsx
 *
 *
 *  @purpose: This component is the main component for the schedule.
 *
 *
 *  @responsibilities:
 *                       - Renders the schedule.
 *                       - It get the schedule data from the server.
 *                       - and checks permissions on each request to see weather we want to show the user schedule or the admin schedule.
 *
 *
 */





import { parse } from 'path-browserify';
import React from 'react';
import FetchServiceProvider from '../../lib/fetchServiceProvider';


export class SchedulePannel  extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            attempts: 0,
            schedule: [],
        };
    }

    componentDidMount() {

        if (this.state.schedule.length === 0  && this.state.attempts < 3) {
            this.fetchSchedule();
            this.setState({attempts: this.state.attempts + 1});
        }

        return;
    }


    /**
     *
     *  @method: fetchSchedule
     *
     *  @description: This method is responsible for fetching the schedule from the server. and set the state of the schedule.
     *
     */

    fetchSchedule() {
        let fetchService = new FetchServiceProvider();

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': fetchService.getCookie('accessToken'),
        };

        fetchService.$get('/api/store/schedule/get', headers, (response) =>  {

            if (response.data.length > 0) {
                this.setState({schedule: response.data});

            }
            // set the state of our new schedule and render it to the user.
        });

        }


        /**
         *
         *  @method: parseSchedule
         *
         *  @purpose: inorder to orginize the schedule data by employeeID by using the employeeID as the key.
         *
         */

        parseSchedule() {
        const schedule = this.state.schedule;

        let parsedSchedule = new Object();
        //te to the parse schedule object by using the employeeID as the key

        schedule.map((employee) => {

            if (parsedSchedule[employee.employeeID] === undefined) {
                parsedSchedule[employee.employeeID] = [];
            }


            if (parsedSchedule[employee.employeeID]) {
                parsedSchedule[employee.employeeID].push(employee);
            }
        });

        return parsedSchedule;
    }



    render() {
        return (
            <table class="table mt-4">
            <thead>
                <tr>
                    { this.parseSchedule() }
                    <th scope="col"> Name </th>
                    <th scope="col"> Sunday </th>
                    <th scope="col"> Monday </th>
                    <th scope="col"> Tuesday </th>
                    <th scope="col"> Wednesday </th>
                    <th scope="col"> Thursday </th>
                    <th scope="col"> Friday </th>
                    <th scope="col"> Saturday </th>
                    <th scope="col"> Total Hours </th>
                </tr>
            </thead>
            <tbody id="wrapper_test">
                <tr>
                    <td>
                        <div className="col">
                            <img
                                src="/img/SVG/male_user.svg"
                                className="profile-img-sm"
                                alt="user photo"
                            />
                        </div>

                        <br/>

                        <div className="col">
                            <span> Example User </span>
                        </div>

                        <div className="col">
                            <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                                Manager
                            </span>
                        </div>
                    </td>
                    <td>
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>
                    </td>
                    <td>
                        <span className="role-badge badge badge-danger card-text-sub-text  bold">
                            OFF
                        </span>
                    </td>
                    <td>
                        {" "}
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>
                    </td>
                    <td>
                        {" "}
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>{" "}
                    </td>
                    <td>
                        {" "}
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>{" "}
                    </td>
                    <td>
                        {" "}
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>
                    </td>
                    <td>
                        {" "}
                        <span className="role-badge badge badge-primary card-text-sub-text  bold">
                            8:00 - 17:00{" "}
                        </span>{" "}
                    </td>
                    <td>
                        <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                            40 Hours
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        );
    }
}
