/**
 *
 *  @file: employee.edit.jsx
 *
 * @purpose: this component is used to render the employee edit page
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
 *  @component: RequestEditEmployee
 *
 *
 *  @purpose: this component is used to edit an employees information
 *
 */

const RequestEditEmployee = (data) => {
    let api = new FetchServiceProvider();
    const route = "/api/store/employees/edit";

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        accessToken: api.getCookie("accessToken"),
    };

    // all the information that we will be editing for the said employee.
    // use the patch request since we just need parital edits

    return api.put(route, data, headers);
};

/**
 *
 *
 *  @function: EditEmployeeForm
 *
 *  @purpose: this function is used to render the form for editing an employee
 *
 */

const EditEmployeeForm = (props) => {
    const id = props.employeeID;
    const employee = props.employeeData;

    const data = employee.filter((person) => {
        if (person.id === id) {
            return person;
        }
    });

    // all of the input fields for the edit form

    let requestInput = {
        first_name: data[0].first_name,
        last_name: data[0].last_name,
        address: data[0].address,
        location: data[0].location,
        phone: data[0].phone,
        email: data[0].email,
        phone: data[0].phone,
        salary: data[0].salary,
        is_active: data[0].is_active,
        start_date: data[0].start_date,
        end_date: data[0].end_date,
    };



    return (
        <TemplateModal
            title="Edit Employee"
            body={
                <div>
                    <div className="header-subtitle text-center">
                        <h3>Edit Employee Information.</h3>
                    </div>

                    <form className="form-group" onSubmit={
                        (e) => {
                            e.preventDefault();


                            let inputs = {
                                id: id,
                                first_name: e.target.first_name.value,
                                last_name: e.target.last_name.value,
                                address: e.target.address.value,
                                location: e.target.location.value,
                                phone: e.target.phone.value,
                                email: e.target.email.value,
                                salary: e.target.salary.value,
                                is_active: e.target.active.checked,
                                start_date: e.target.start_date.value,
                                end_date: e.target.end_date.value,
                            };


                            RequestEditEmployee(inputs).then((response) => {
                                let container = document.getElementById('modal-container');

                                if (response.status === 'success') {
                                    // render the success message
                                    ReactDOM.render(<TemplateModal title="Success"
                                    body={
                                    <div className="text-center">Employee information has been updated successfully.</div>} />, container);
                                } else {
                                    // render the error message.
                                    ReactDOM.render(<TemplateModal title="Error" body={<div className="text-center">{response.message}</div>} />, container);
                                }
                            });
                        }
                    }   >
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                name='first_name'
                                className="form-control mt-2 mb-2"
                                id="first_name"
                                defaultValue={requestInput.first_name}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                name='last_name'
                                className="form-control mt-2 mb-2"
                                id="last_name"
                                defaultValue={requestInput.last_name}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name='address'
                                className="form-control mt-2 mb-2"
                                id="address"
                                defaultValue={requestInput.address}
                                placeholder="Address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                name='location'
                                className="form-control mt-2 mb-2"
                                id="location"
                                defaultValue={requestInput.location}
                                placeholder="Location"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-2 mb-2"
                                id="email"
                                defaultValue={requestInput.email}
                                name='email'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="phone"
                                name='phone'
                                defaultValue={requestInput.phone}
                                placeholder="Phone"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="salary"
                                name='salary'
                                defaultValue={requestInput.salary}
                                placeholder="Salary"
                            />
                        </div>
                        {/** toggle switch for active account */}
                        <div class="form-check form-switch">
                            <label
                                class="form-check-label mt-2 mb-2"
                                for="flexSwitchCheckDefault"
                            >
                                {" "}
                                Active{" "}
                            </label>
                            <input
                                class="form-check-input"
                                type="checkbox"
                                name='active'
                                defaultChecked={requestInput.is_active}
                                id="flexSwitchCheckDefault"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="start_date">Start Date</label>
                            <input
                                type="date"
                                name='start_date'
                                className="form-control mt-2 mb-2"
                                id="start_date"
                                defaultValue={requestInput.start_date}
                                placeholder="Start Date"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end_date">End Date</label>
                            <input
                                type="date"
                                name='end_date'
                                className="form-control mt-2 mb-2"
                                id="end_date"
                                defaultValue={requestInput.end_date}
                                placeholder="End Date"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-message mt-2 mb-2"
                        >
                            <i className="fas fa-save"></i> Save
                        </button>
                    </form>
                </div>
            }
        />
    );
};

export const EmployeeEditDialog = (props) => {
    // need a state for the amount of employees in the store

    // this will hold our employee data
    const [eData, setEData] = React.useState([]);

    React.useEffect(() => {
        // get the data inside of our state of our compoent.
        EmployeeRequest().then((response) => {
            setEData(response.eData);
        });
    }, []);


    return (
        <TemplateModal
            title="Edit Employee"
            body={
                <div>
                    {/** make a section where we have to choose what employee we would like it edit */}

                    <div className="header-subtitle text-center">
                        <h3>Edit Employee Information.</h3>
                    </div>

                    <div className="form-group">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                let data = Number(
                                    document.getElementById("employee-select")
                                        .value
                                );

                                // now filter eData to only return the employee that we want to edit
                                let employee = eData.filter((employee) => {
                                    // conver the types to prevent an error.
                                    return Number(employee.id) == data;
                                });

                                let container =
                                    document.getElementById("modal-container");
                                // render the modal that will container all the information that we need to edit
                                return ReactDOM.render(
                                    <EditEmployeeForm
                                        employeeID={data}
                                        employeeData={eData}
                                    />,
                                    container
                                );
                            }}
                        >
                            <label htmlFor="employee-select">
                                Select Employee
                            </label>
                            <select
                                className="form-control"
                                name="employee"
                                id="employee-select"
                            >
                                {/** loop through all the employees and display them */}
                                {eData.map((employee) => {
                                    return (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.first_name + " " + employee.last_name }
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="form-group mx-auto">
                                <button className="btn btn-message m-3 mx-auto">
                                    Edit Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
};
