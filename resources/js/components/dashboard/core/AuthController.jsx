/**
 *
 *  @Component AuthController
 *
 *
 *  @purpose Inorder to validate authentication of a given user inorder to view a resource
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

    // check the current users permissions
    function checkPermissions(token)
    {

    }
    
    // return the component
    if (authorized) {
        return props.children;
    }
    return null;
}
