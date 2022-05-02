/**
 *
 *   file: login
 *
 *
 *  TYPE: (COMPONENT)
 *
 *  Purpose: inorder to display the login page
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import FetchServiceProvider from "../../lib/fetchServiceProvider.js";



import fetchServiceProvider from "../../lib/fetchServiceProvider.js";
import { Modal } from "../dashboard/schedule/base/Modal.jsx";

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // our application state

        this.fetchServiceProvider = new fetchServiceProvider();
    }

    /**
     *
     * @method: validateForm
     *
     * @purpose  inorder to validate the form before submitting the form
     * @parmeter    event
     * @returns event;
     *
     */

    validateForm(event) {
        // verify the all inputs fields are filled before sending our request to the api
        event.preventDefault();

        if (
            event.target.username.value.length !== 0 &&
            event.target.password.value.length !== 0 &&
            event.target["client-id"].value.length !== 0
        ) {
            // create a request object for api request with input values
            let request = {
                username: event.target.username.value,
                password: event.target.password.value,
                clientId: event.target["client-id"].value,
                _token: this.generateToken(),
            };

            return this.login(request);
        }

        return (document.getElementById("error-response").innerHTML =
            "Please fill in all fields");
    }

    /**
     *
     * method: login api Request
     *
     *  @purpose: inorder to preform the fetre request to the login api
     */

    login(request) {
        let headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + request._token,
        };
        this.fetchServiceProvider.$post(
            "/api/auth/login",
            request,
            headers,
            (response) => {
                if (response.message) {
                    document.getElementById("error-response").innerHTML =
                        response.message;
                }

                // check if user is authentication if so then we will
                // redirect the user to the dashboard
                if (response.authenticated) {
                    window.location.href = response.redirect;
                }
            }
        );
    }

    generateToken() {
        return document.getElementById("_token_").content;
    }

    /**
     *
     * @method: ForgotPassword
     *
     *
     *  @purpose: inorder to render the forgot password form
     */
    ForgotPassword = () => {

        const request = async() => {

            const api = new FetchServiceProvider();
            const route = '/api/auth/reset_password/';

            const header = {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            const data = {
                email: document.getElementById('email').value
            }

            return await api.post(route, data, header);
        }

        const SuccessModal = (props) => {
            return (
               <Modal title='Success' body={
                   <div>
                       <section className='text-center'>
                           <i className="fas fa-check-circle fa-3x text-success"></i>
                           <p className='mt-1'> Please check your email for a reset link </p>
                           <p className='mt-1'> { props.message }</p>
                       </section>
                   </div>
               }/>
            );
        }


        const ErrorModal = (props) => {
            return (
                <Modal title='Error' body={
                    <div>
                        <section className='text-center'>
                            <i className="fas fa-times-circle fa-3x text-danger"></i>
                            <p className='mt-1'> { props.message }</p>
                        </section>
                    </div>
                }/>
            );
        }

        return ( <Modal title='Forgot Password'
                        body={
                            <div>
                                <div>
                                    <section>
                                        <p> Please enter your email inorder to reset your password.</p>
                                    </section>
                                </div>


                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        type='email'
                                        className='form-control mt-2'
                                        id='email'
                                        placeholder='Enter your email'
                                    />
                                </div>

                                <div className='mx-auto d-block text-center'>
                                    <button className='btn header-action' onClick={
                                        (e) => {
                                            // send the request to the server and reset the password.
                                            e.preventDefault();
                                            const container = document.getElementById('modal-container');

                                            // send the request to the server and reset the password.
                                            // of the user that is requested to reset the password.
                                            request().then((response) => {
                                                if (response.status === 'success' || response.status === 200) {
                                                    return ReactDOM.render(<SuccessModal message={response.message}/>, container);
                                                } else {
                                                    return ReactDOM.render(<ErrorModal  message={response.message}/>, container);
                                                }
                                            });

                                            //return ReactDOM.render(<SuccessModal/>, container);
                                        }
                                    }>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        }
                />);
    }



    /**
     * @method": validate
     *
     * @purpose: inorder to validate the form as the user is typing inorder to notify the user if they need to enter the required fields
     * @returns  event
     */
    validate(event, number) {
        // to make a shaking animation of our login store
        const errorWrapper =
            document.getElementsByClassName("error-message")[number];
        if (event.target.value.length === 0) {
            errorWrapper.classList.add("text-danger");
            errorWrapper.classList.remove("text-success");
            errorWrapper.innerText =
                "Please fill out this field it is required";
            document
                .getElementById("registration-form")
                .classList.add("shake-animation");
        } else {
            errorWrapper.innerHTML = `<i class="fas fa-check-circle"></i>  <span style='margin-left: 10PX;'> looks good! <?/span>`;
            errorWrapper.classList.add("text-success");
            errorWrapper.classList.remove("text-danger");
            document
                .getElementById("registration-form")
                .classList.remove("shake-animation");
            return true;
        }
    }

    render() {
        return (
            <div id="login-color-box">
                <div id='modal-container'  className='dashboard-content'></div>
                <div className="container pannel">
                    <div className="row">
                        <div className="col form-login" id="registration-form">
                            <form
                                className="form-login"
                                onSubmit={(e) => {
                                    this.validateForm(e);
                                }}
                            >
                                <div className="blob image-badge">
                                    <img
                                        className="img-fluid"
                                        src="/img/restaurant-outline.svg"
                                        width="50vh"
                                        height="50vw"
                                    />
                                </div>
                                <h1 className="form-login-title text-center">
                                    {" "}
                                    Please Login{" "}
                                </h1>

                                <h3
                                    className="form-login-title text-center"
                                    style={{
                                        "font-size": "18px",
                                        color: "dodgerblue",
                                    }}
                                >
                                    {" "}
                                    Please enter your login details{" "}
                                </h3>

                                <h4
                                    className="error text-danger text-center"
                                    id="error-response"
                                >
                                    {" "}
                                </h4>
                                <div className="form-group">
                                    <label for="username">Username </label>
                                    <span className="error-message text-center text-danger"></span>
                                    <input
                                        name="username"
                                        onChange={(e) => {
                                            this.validate(e, 0);
                                        }}
                                        type="email"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter enter username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <span className="error-message text-center text-danger"></span>
                                    <input
                                        name="password"
                                        onChange={(e) => {
                                            this.validate(e, 1);
                                        }}
                                        type="password"
                                        className="form-control"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="client-id"> Client ID</label>
                                    <span className="error-message text-center text-danger"></span>
                                    <input
                                        name="client-id"
                                        onChange={(e) => {
                                            this.validate(e, 2);
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="ID Number"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={this.generateToken()}
                                    />
                                </div>

                                <div className="form-group mt-4">
                                    <a
                                        className="link text-center"
                                        href="#"
                                        onClick={(e) => {
                                            // trigger the forgot password modal.
                                            const container = document.getElementById('modal-container');

                                            ReactDOM.render(this.ForgotPassword(), container);
                                        }}
                                    >
                                        {" "}
                                        Forgot Password
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    name="submit"
                                    className="btn-lg header-action"
                                    style={{ width: "100%" }}
                                >
                                    Login{" "}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
