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
import FetchServiceProvider from "../../../lib/fetchServiceProvider";


// this will check the current users permissions
// and if the permission is valid then it will render the component
// otherwise it will return nothing so image this a way to protect a component
// from being display to a user that does not have the correct permissions  to view it
export const AuthController = (props) => {

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

    // return the component
    if (authorized) {
        if (isAdmin) {
            return props.children + props.protected;
        } else {
            return props.children;
        }
    }

    // if our component is not authorized then we will return nothing
    // ie the user doesn't  have the correct permissions to view this resource.
    return null;
}
