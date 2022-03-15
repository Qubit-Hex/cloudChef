/**
 *
 *  @Component AuthController
 *
 *
 *  @purpose Inorder to validate authentication of a given user inorder to view a resource
 *            - this component will act a middleware for the user to be authenticated.
 *
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../lib/fetchServiceProvider";


/**
 *
 *  @Component Guard
 *
 *  @purpose: This component is responsible for checking the authentication of the user.
 *
 * @param {
 * } props.protected - this is the protected route that will be checked for authentication
 *
 * @returns
 */
export const Guard = (...props) => {

    const [error, setError] = React.useState(null);
    const [authorized, setAuthorized] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const fetchService = new FetchServiceProvider();

    // check the current users permissions
    // this will be an api call to check if the user has the correct permission and if they do then
    // it will render the component
    function checkPermissions(token)
    {
        const api = new FetchServiceProvider();
        const route = '/api/auth/verify';

        const headers = {
            'Content-Type': 'application/json',
            'bearer': token

        }
        // check our response and update the program state.
        api.get(route, headers).then(response => {
           if (response.auth === true) {
                setAuthorized(true);
                if (response.admin === true) {
                    setIsAdmin(true);
                }
           }
         });
    }

    // if our component is not authorized then we will return nothing
    // ie the user doesn't  have the correct permissions to view this resource.
    return null;
}
