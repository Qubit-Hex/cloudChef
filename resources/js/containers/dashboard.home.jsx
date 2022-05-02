/**
 *
 *  @file: Dashboard.home.jsx
 *
 *
 *  @purpose : inorder to render the home splash screen for the dashboard
 *
 */

import React from "react";
import ReactDOM from "react-dom";

import { ContactNavbar } from "../components/dashboard/contactsNavbar";
import { TemplateModal } from "../components/dashboard/recipe/core/template.modal";
import FetchServiceProvider from "../lib/fetchServiceProvider";

import { ScheduleTable } from "../components/dashboard/schedule/core/ScheduleTable";


/**
 *
 *  @component: MostRecentSchedule
 *
 *
 *  @purpose : inorder to render the most recent schedule
 *
 */


const MostRecentSchedule = (props) => {

    // state of the schedule ID

    const [scheduleID, setScheduleID] = React.useState(null);

    // request for obtaining the most recent schedule entry.
    const getMostRecentSchedule = async () => {
        const api = new FetchServiceProvider();
        const route = "/api/store/schedule/recent";

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };

        // get the most recent schedule for the system.
        return await api.get(route, headers);
    };

    // get the most recent schedule for the system.
    React.useEffect(() => {
        getMostRecentSchedule().then((response) => {
            if (response.status === "success" || response.status === 200) {
                // set the state for the schedule table
                setScheduleID(response.data.id);
            }
        });
    }, []);


    if (scheduleID) {
        // return the scheudle table if there is a entry in the system
        return ( <ScheduleTable scheduleID={scheduleID} employeeID={1} viewOnly={true} />);

    }  else {
        // no schedule data to be found then render the message
        return (
            <div>
                <div className="alert alert-info">
                    <h4>No Schedule Found</h4>
                    <p>
                        There are no schedules to be found for the system.
                    </p>
                </div>
            </div>
        );
    }

}

/**
 *
 *  @component : DashboardHome
 *
 *
 *  @purpose : inorder to render the dashboard home page. This is the first page that the user sees
 *
 */
export const DashboardHome = (props) => {
    const [employees, setEmployees] = React.useState([]);

    // get the employees of the store and set the state
    const RequestStoreEmployees = async () => {
        const api = new FetchServiceProvider();
        const route = "/api/store/employees/";

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: api.getCookie("accessToken"),
        };
        // return the promise for us to work with at a later time/
        return await api.get(route, headers);
    };

    // get the most recent schedule of the current store

    React.useEffect(() => {
        RequestStoreEmployees().then((response) => {
            setEmployees(response.eData);
        });
    }, []);

    return (
        <div className="container rm-pm dashboard-content">
            <div className="row mt-4 mb-4 p-0 m-0">
                {/** display the title for the page.  */}
                <h1
                    className="header-subtitle text-center"
                    style={{
                        fontSize: "2em",
                    }}
                >
                    Welcome
                </h1>

                <small className="text-center text-muted mt-4 mb-4">
                    Manage and view your stores information.
                </small>

                <img
                    src="/img/SVG/employee_dashboard.svg"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
            </div>

            <div className="col-md-11 m-0 mx-auto">
                    {/* contact navigation bar */}
                            <div className="card text-center">
                                <div className='card-header bg-transparent'>
                                    <h5 className="card-title header-subtitle">
                                            This Weeks schedule
                                        </h5>
                                </div>

                                <div className="card-body">

                                    <div className='schedule_pill'>
                                        <MostRecentSchedule />
                                    </div>

                                </div>
                            </div>
            </div>

                <div className="col-md-11 mx-auto">
                    <div className="card">
                        <div className="card-header bg-transparent text-center">
                            <h5 className="card-title header-subtitle">
                                    Current Employees
                            </h5>
                        </div>
                        <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>

                                                {/** find the values that we need into to display the employee information. */}
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th> Location</th>
                                                <th> Start Date. </th>
                                                <th> End Date </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee) => {
                                                // render the information of the employee that we have
                                                // recived from the api.
                                                return (
                                                    <tr key={employee.id}>
                                                        <td>
                                                            {
                                                                employee.first_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {employee.last_name}
                                                        </td>
                                                        <td>
                                                            {employee.email}
                                                        </td>
                                                        <td>
                                                            {employee.phone}
                                                        </td>
                                                        <td>
                                                            {employee.address}
                                                        </td>
                                                        <td>
                                                            {" "}
                                                            {employee.location}
                                                        </td>

                                                        <td>
                                                            {" "}
                                                            {
                                                                employee.start_date
                                                            }{" "}
                                                        </td>
                                                        <td>
                                                            {" "}
                                                            {employee.end_date ===
                                                            null
                                                                ? "N/A"
                                                                : employee.end_date}{" "}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

    );
};
