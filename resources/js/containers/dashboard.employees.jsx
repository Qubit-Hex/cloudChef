/**
 *
 *  @component : EmployeesPage
 *
 *
 *  @purpose : this component is used to render the employees page
 *
 */



import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../lib/fetchServiceProvider";

import { EmployeeAddModal} from "../components/dashboard/employee/employee.add";
import { EmployeeEditDialog } from "../components/dashboard/employee/employee.edit";
import { EmployeeDeleteDialog } from "../components/dashboard/employee/employee.delete";



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
}



export const EmployeesPage = (props) => {


    const [employees, setEmployees] = React.useState([]);
    // femployee is the rest formated response.

    React.useEffect(() => {
        RequestStoreEmployees().then((response) => {
            setEmployees(response.eData);
        });
    }, []);


    // conver the yearly salary into a hourly rate
    const calculateHoursRate = (salary) => {
        // get the hourly rate of the employee of the store.
        return Math.floor( salary / 52 / 5 / 8 ) + " / HR";
    }


    return (
        <div className="container-fluid profile_card dashboard-content">
            <div id='modal-container'></div>
        <div className="row">
            {/** display the title for the page.  */}
            <h1 className='header-subtitle text-center' style={{
                fontSize: '2em',
            }}>
                Employees
            </h1>
            <img src='/img/SVG/employee_page.svg' width={200} height={200} className='mx-auto' />
        </div>
            <div className='row'>
                    {/** make a coupe of tiles for adding an employing editing an employee, and deleting a employee.  */}

                    {/** add three tiles to the page one for adding an employee, one for editing employee and one for deleting employee */}
                    <div className='col-md-4'>
                        <div className='card button-tiles'>
                            <div className='card-header text-center bg-transparent'>
                                <img src='/img/SVG/user_status.svg' width={200} height={200} className='mx-auto' />
                                <h3 className='card-title'>Add</h3>
                                {/** brief description about what this option does */}
                                <p className='card-text text-muted'>
                                    Add an employee to the system
                                </p>
                                {/** font awesome add person icon */}
                            </div>
                            <div className='card-body'>
                               {/** add button */}
                                <button className='btn btn-message' onClick={() => {
                                    const container = document.getElementById('modal-container');
                                    ReactDOM.render(<EmployeeAddModal />, container);

                                }}>Add Employee</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card button-tiles'>
                            <div className='card-header text-center bg-transparent'>
                                <img src='/img/SVG/network_outline.svg' width={200} height={200} className='mx-auto' />
                                <h3 className='card-title'>Edit</h3>
                                <p className='card-text text-muted'>
                                    Edit an employee's details
                                </p>
                                {/** font awesome edit icon */}
                            </div>
                            <div className='card-body'>
                                {/** edit button */}
                                <button className='btn btn-message' onClick={() =>{
                                    const container = document.getElementById('modal-container');
                                    ReactDOM.render(<EmployeeEditDialog />, container);

                                }}>Edit Employee</button>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='card button-tiles'>
                            <div className='card-header text-center bg-transparent'>
                                <img src='/img/SVG/employee_card.svg' width={200} height={200} className='mx-auto' />
                                <h3 className='card-title'>Delete </h3>
                                <p className='card-text text-muted'>
                                    Remove an employee from the system
                                </p>
                                {/** font awesome delete icon */}
                            </div>
                            <div className='card-body'>
                                {/** delete button */}
                                <button className='btn btn-message' onClick={
                                    (e) => {
                                        const container = document.getElementById('modal-container');

                                        ReactDOM.render(<EmployeeDeleteDialog />, container);
                                    }
                                }>Delete Employee</button>
                            </div>
                        </div>
                    </div>
            </div>

            {/** section with a table showing the current employees  */}
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header text-center bg-transparent'>
                            <img src='/img/SVG/current_employees.svg' width={200} height={200} className='mx-auto' />
                            <h3 className='card-title'>Current Employees</h3>
                            <small className='text-center text-muted'>
                                View your current roaster of employees
                            </small>
                            {/** font awesome table icon */}
                        </div>
                        <div className='card-body'>
                            {/** table to display the current employees */}
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        {/** find the values that we need into to display the employee information. */}
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th> Location</th>
                                        <th> Salary </th>
                                        <th> Start Date. </th>
                                        <th> End Date </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((employee) => {
                                        // render the information of the employee that we have
                                        // recived from the api.
                                            return (
                                                <tr key={employee.id}>
                                                    <td>{ employee.first_name}</td>
                                                    <td>{ employee.last_name }</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.phone}</td>
                                                    <td>{employee.address}</td>
                                                    <td> { employee.location }</td>
                                                    <td> { calculateHoursRate(employee.salary)} </td>
                                                    <td> { employee.start_date } </td>
                                                    <td> { employee.end_date === null ? "N/A" : employee.end_date } </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
