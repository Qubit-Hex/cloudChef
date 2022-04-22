/**
 *
 *  @file: contact.table.jsx
 *
 *
 *  @purpose: to render the contacts page
 *
 */


/**
 *
 *  @function: ContactsTable
 *
 *
 * @purpose: inorder to render the contacts table component
 *
 */

import React, { Component } from 'react';
import { ReactDOM  } from 'react';
import { EmployeeCard } from './contact.employeeCard';
import FetchServiceProvider from '../../../lib/fetchServiceProvider';


export const ContactsTable = (props) => {



    const [employees, setEmployees] = React.useState([]);

    /**
     *
     *  @function: fetchStoreContacts
     *
     *  @purpose: inorder to fetch the store contacts from the database
     *
     */
    const fetchStoredContacts = () => {

        const api = new FetchServiceProvider();

        const header = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        }
        // route for the information that we will be accessing
        const route = '/api/store/employees';

        // return the promise for us to work with in  another place
        return api.get(route, header);
    }
    // form the response for something that we can pass to a component
    // inorder to self render the data that we want to display.
    React.useEffect(() => {
        // fetch the data from the database

        fetchStoredContacts().then(response => {

            if (response.status === 'success') {
                setEmployees(response.data);
            } else { // if the response is not successful
               return new Error('Failed to fetch the data');
            }
        });
    }, []);

    return (

        <div className="container-xl dashboard-content">
        {/**  container for sending modals to the user  */}

        <h2 className='ml-4'> <b>Contacts</b> <small className='sub-caption ' > Welcome (
        ) <br /><span className='text-center'>View your teams contact information. </span> </small></h2>



            {/* make a tile with add. edit, and delete buttons */}




        {/** containers for modals and notifcations here  */}
        <div id='notification-container' className='row'></div>
        <div id="modal-container" className="modal-container"></div>

        {/**  container for the schedule components   */}

        {/* refactor into an component that i CAN LOOP THOUGH  THE
            THE SCHEDULE DATA AND RENDER IT */}

        <div className="row">   {/* row for the schedule components */}

            <div className="col card fit-table">
                <h2 className="header-subtitle text-center mt-4 ">
                  {" View your store contacts "}
                </h2>

                <img
                    src="/img/SVG/User Status_Outline.svg"
                    alt="schedule icon"
                    width="400px"
                    height="400px"
                    className="mx-auto img-fluid"
                />


                <span className="text-center">
                {/* paragraph about the contacts and how to use them */}
                <small className='text-small'>View all your contacts, for your store here </small>
                </span>
                <div className="schedule_pill">
        <table className='table table-responsive'>

        <thead>
            <tr>
            <th> Employee </th>
            <th> Address </th>
            <th> Location</th>
            <th> Phone </th>
            <th> Email </th>
            <th> Role </th>
        </tr>
        </thead>

        <tbody>
            {/** render my fetches users from api here */}

            {
                employees.map((employee, index) => {
                    // MAP THROUGH THE EMPLOYEES AND RENDER THEM HERE
                   return (
                    <EmployeeCard
                        id={employee.id}
                        name={employee.name}
                        address={employee.address}
                        location={employee.location}
                        phone={employee.phone}
                        email={employee.email}
                        role={employee.department}
                        key={index}
                    />
                  );
                })
            }
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
    )
}
