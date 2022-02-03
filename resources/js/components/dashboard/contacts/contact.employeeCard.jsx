/**
 *
 *
 * @file: contact.employeeCard.jsx
 *
 *
 *
 * @purpose: to render the contacts to the table of the contacts page
 *
 *
 */

import React from "react";
import ReactDOM from "react-dom";


/**
 *
 *  @function: EmployeeCard
 *
 *
 *  @purpose: inorder to render the employee card component to the table of our contacts page
 */
    export const EmployeeCard = (props) => {

    return (
        <tr style={{
            fontWeight: 400,
            fontSize: '1.0rem',
        }}>
        <td> { props.name } </td>
        <td> { props.address } </td>
        <td> { props.location  } </td>
        <td> { props.phone } </td>
        <td>  { props.email  }  </td>
        <td>  <b>{ props.role }  </b></td>
        </tr>
    )
}
