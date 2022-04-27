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

import { ContactNavbar} from "../components/dashboard/contactsNavbar";
import { TemplateModal } from "../components/dashboard/recipe/core/template.modal";
import FetchServiceProvider from "../lib/fetchServiceProvider";


import { ScheduleTable } from "../components/dashboard/schedule/core/ScheduleTable";

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


    React.useEffect(() => {
        RequestStoreEmployees().then((response) => {
            setEmployees(response.eData);
        });
    }, []);



    return (
        <div className='container rm-pm dashboard-content'>
            <div className='row p-0 m-0'>
            <div className="col-md-11">
                {/* contact navigation bar */}
                <div id='message-box-container'> </div>

                <div className='table-contacts-container'>

                    <div classNAme='row'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title header-subtitle">This Weeks schedule</h5>

                                    {/* current employees goes h    ere */}
                                    <div className='table-responsive border-dark'>
                                    <ScheduleTable employeeID={8} scheduleID={8} viewOnly={true} />
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

                    <div className='col-md-11'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title header-subtitle">Current Employees</h5>
                                <p className="card-text">
                                    {/* current employees goes here */}

                                         <div className="table-responsive">
                                         <table className="table ">
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
                                                             <td>{employee.first_name}</td>
                                                             <td>{employee.last_name}</td>
                                                             <td>{employee.email}</td>
                                                             <td>{employee.phone}</td>
                                                             <td>{employee.address}</td>
                                                             <td> {employee.location}</td>

                                                             <td> {employee.start_date} </td>
                                                             <td>
                                                                 {" "}
                                                                 {employee.end_date === null
                                                                     ? "N/A"
                                                                     : employee.end_date}{" "}
                                                             </td>
                                                         </tr>
                                                     );
                                                 })}
                                             </tbody>
                                         </table>
                                     </div>

                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
