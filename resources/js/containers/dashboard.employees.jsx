/**
 *
 *  @component : EmployeesPage
 *
 *
 *  @purpose : this component is used to render the employees page
 *
 *
 *
 *  @functionaily : inorder to add employees, edit employee details, and remove employees from the store
 *
 */



import React from "react";
import ReactDOM from "react-dom";
import { EmployeeAddModal } from "../components/dashboard/employee/employee.add";


export const EmployeesPage = (props) => {

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
                                <h3 className='card-title'>Add Employee</h3>
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
                                <h3 className='card-title'>Edit Employee</h3>
                                {/** font awesome edit icon */}
                            </div>
                            <div className='card-body'>
                                {/** edit button */}
                                <button className='btn btn-message' onClick={() => props.editEmployee()}>Edit Employee</button>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='card button-tiles'>
                            <div className='card-header text-center bg-transparent'>
                                <img src='/img/SVG/employee_card.svg' width={200} height={200} className='mx-auto' />
                                <h3 className='card-title'>Delete Employee</h3>
                                {/** font awesome delete icon */}
                            </div>
                            <div className='card-body'>
                                {/** delete button */}
                                <button className='btn btn-message' onClick={() => props.deleteEmployee()}>Delete Employee</button>
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
                            {/** font awesome table icon */}
                            <i className="fas fa-table fa-2x"></i>
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
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Zip</th>
                                        <th>Hire Date</th>
                                        <th>Salary</th>
                                        <th>Commission</th>
                                        <th>Manager</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
