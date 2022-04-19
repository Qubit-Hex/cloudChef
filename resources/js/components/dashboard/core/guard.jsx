/**
 *
 *  @file: Guard.jsx
 *
 *
 *  @purpose: inorder to guard protected resources and prevent unauthorized access
 *
 */



import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";


/**
 *
 *  @function: AdminGuard
 *
 *  @purpose: to guard any resources that required admin access
 *
 *  props: cargo: -> ANY component that requires admin access
 * 
 *
 */


export const AdminGuard = (props) => {

    const [auth, setAuth] = React.useState(false);

    const dial = () => {
        const api = new FetchServiceProvider();
        const route = '/api/auth/permissions';

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return api.get(route, headers);
    }


    React.useEffect(() => {
        dial().then(res => {
            if (res.status === 'success' && res.authenticated === true && res.permissions === 'admin') {
                setAuth(true);
            }
        })
    }, []);


    // preform a if elese statement for the conditional render of the component

    if (auth) {
        return props.cargo;
    } else {
        // just return a blank component for now
        return <div></div>
    }
}


/**
 *
 *  @function: UserGuard
 *
 *  @purpose: to guard any resources that required user access
 *
 *  cargo: -> ANY component that requires user access
 *
 */

export const UserGuard = (props) => {

    const [auth, setAuth] = React.useState(false);

    const dial = () => {
        const api = new FetchServiceProvider();
        const route = '/api/auth/permissions';

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken')
        }

        return api.get(route, headers);
    }

    React.useEffect(() => {
        dial().then(res => {
            if (res.status === 'success' && res.authenticated === true && res.permissions === 'employee' || res.permissions === 'admin' || res.permissions === 'user') {
                setAuth(true);
            }
        })
    }, []);

    // preform a conditional render of the component

    if (auth) {
        return props.cargo;
    } else {
        // just return a blank component for now
        return <div></div>
    }
}
