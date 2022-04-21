/***
 *
 *
 *  @file: employe.delete.jsx
 *
 *  @puropose: inorder to delete an employee from the system
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import { TemplateModal } from "../recipe/core/template.modal";


/**
 *
 *  @component: EmployeeRequest
 *
 *
 *  @purpose: this component is responsibles for fetching the employees from the store.
 *            that we belong to..
 *
 */

 const EmployeeRequest = async () => {
    const api = new FetchServiceProvider();
    const route = "/api/store/employees/";

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        accessToken: api.getCookie("accessToken"),
    };

    return await api.get(route, headers);
};


/**
 *
 *  @function: DeleteEmployee
 *
 *  @purpose: inorder to delete an employee from the system
 *
 */

const DeleteEmployee = (request) => {
    let api = new FetchServiceProvider();
    const route = '/api/store/employees/delete/';

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        accessToken: api.getCookie("accessToken"),
        employeeID: request
    };


    return api.delete(route, headers);
}




export const EmployeeDeleteDialog = (props) => {

    const [employee, setEmployee] = React.useState(null);




    React.useEffect(() => {
        EmployeeRequest().then((response) => {
            setEmployee(response.data);
        });
    }, [])


    return (
        <TemplateModal title='Delete Employee'
            body={
                <div>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                         // get the employee id from the values of the selected employee
                         const employeeID = document.getElementById('employee-selection').value;
                            // delete the employee
                            const container = document.getElementById('modal-container');
                            DeleteEmployee(employeeID).then((response) => {
                                if (response.status === 'success') {
                                    ReactDOM.render(<TemplateModal title="Success"
                                    body={
                                    <div>
                                        <div className="header-subtitle text-center">
                                            <h3> { response.message }</h3>
                                        </div>

                                        <div className="text-center">
                                            <img src='/img/SVG/Call waiting.svg' alt="" width={200} height={200} className='mx-auto'/>
                                        </div>
                                    </div>
                                    } />, container);
                                } else {
                                    ReactDOM.render(<TemplateModal title="Error" body={
                                        <div>
                                            <div className="header-subtitle text-center">
                                                <h3> { response.message }.</h3>
                                            </div>

                                            <div className='text-center'>
                                                <img src='/img/errors/cancel.svg' alt="" width={200} height={200} className='mx-auto'/>
                                            </div>

                                        </div>
                                        } />, container);

                                }
                            });
                        }
                    }>
                    <div className='header-title text-center'>
                        <h3 className='header-subtitle text-center'>Delete Employee </h3>
                        <img src='/img/SVG/trash.svg' width={200} height={200}  className={"mx-auto"} />
                    </div>

                    <div className='text-center'>
                        {/*&* drop down for viewing the employees of the store */}
                        <select className='form-select' id='employee-selection'>
                            <option>Select Employee</option>
                            {employee && employee.map((employee) => {
                                return (
                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                )
                            })}
                        </select>

                        <button className='btn btn-danger mt-2 mb-2'>
                            Delete
                        </button>

                    </div>
                </form>
                </div>
            } />
    )
}
