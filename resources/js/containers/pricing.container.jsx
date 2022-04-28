/**
 *
 *  naem: pricing container
 *
 *  type: container
 *
 *  purpose: to handle the pricing page
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Header } from "../components/home/header";
import { Footer } from "../components/home/footer";
import FetchServiceProvider from "../lib/fetchServiceProvider";

/**
 *
 *  @component : ContactPopup
 *
 *  @purpose : inorder to render the contact popup for the page
 *
 */


const ContactPopup = (props) => {

 // close the modal container is.
 const closeWindow = () => {
    let container = document.getElementById('modal-container');
    // unmount the component
    return ReactDOM.unmountComponentAtNode(container);
}


const request = async () => {
    // send the request to the server
    const api = new FetchServiceProvider();
    const route = '/api/mailer/send_mail';

    const data = {
        // the data that will be sent to the server.
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    // send the request to the server using a post command
    return api.post(route, data, headers);
}


// render the success  message tot the screen
const Success = () => {


}


// render the error message to the screen.
const Error = () => {


}

    // handle the submit event for the p

return (
    <div className="modal apply-modal-animation recipe-modal">
    <div
        className="modal-dialog">
        <div class="modal-content w-75">
            <div class="modal-header">
                <h5 class="modal-title "> Contact US </h5>
                <button
                    type="button"
                    class="btn-transparent modal-close far fa-times-circle"
                    aria-label="Close"
                    onClick={(e) => {
                        e.preventDefault();
                        closeWindow();
                    }}
                ></button>
            </div>
            <div class="modal-body p-0">
                    {/** 2x2 grid layout for this */}
                    <div className="row">
                        <div className="col-md-6">

                            <div>
                               {/** 4x4 image grid  */}
                               <img src='/img/SVG/send-message-icon.svg' width={300} height={300} className='d-block mx-auto mt-4' />
                               <h2 className="text-center header-subtitle" style={{
                                   fontSize: '1.75rem',
                               }}> Contact US </h2>

                            </div>
                        </div>

                        <div className='col-md-6 p-4 contact-form-popup'>
                        <span className='text-muted'>  Please fill out the form inorder to contact us, about our corporate plans. </span>
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    request().then((response) => {

                                        const container = document.getElementById('modal-container');

                                        if (response.status === 200 || response.status === 'success') {
                                          //  render the success message of the page
                                          ReactDOM.render(<Success />, container);
                                            closeWindow();
                                        } else {
                                            // render the error message of the page
                                            ReactDOM.render(<Error />, container);
                                        }
                                    });
                                }
                            }>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    {/** full name  */}
                                    <label htmlFor="exampleInputPassword1">Full Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Full Name"/>
                                </div>
                                <div className="form-group">
                                    {/** phone number */}
                                    <label htmlFor="exampleInputPassword1">Phone Number</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Phone Number"/>
                                </div>
                                <div className="form-group">
                                    {/** company name */}
                                    <label htmlFor="exampleInputPassword1">Company Name</label>
                                    <input type="text" class="form-control" id="company" placeholder="Company Name"/>
                                </div>
                                <button className='header-action md mx-auto'>
                                    <i className='fas fa-paper-plane'></i>
                                    <span> Send </span>

                                </button>
                            </form>

                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
);

}




export default class PricingContainer extends Component {
    render() {
        return (
            <div className="page-content">

                <Header />
                <div id='modal-container'></div>
                <div className="container header-section-space-md mb-4 ">
                    <div className="row mb-4">
                        <div className="col-sm">
                            <h1 className="header-subtitle  text-center">
                                Pricing
                            </h1>

                            <p className="text-center mt-4">
                                See our pricing plan and choose the best plan
                                the will suit your business needs.
                            </p>
                        </div>
                        <div className="col-sm">
                            <img
                                src="/img/pricing-image.svg"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm m-2">
                            <div className="card payment-card">
                                <div className="card-body">
                                    <h1>Small Business Plan</h1>
                                    <div className="image-center-icon">
                                        <img
                                            className="img-fluid"
                                            src="/img/restaurant-outline.svg"
                                            width="50vh"
                                            height="50vw"
                                        />
                                    </div>
                                    <h2 className="card-subtitle mb-2 text-muted">
                                        $0/month
                                    </h2>
                                    <p className="card-text">
                                        Try our basic plan for free
                                    </p>

                                    <p></p>
                                    <p> One store </p>
                                    <p> Access your information anywhere </p>
                                    <p>
                                        {" "}
                                        Cloud based services, access your
                                        information anywhere{" "}
                                    </p>
                                    <p> Manage staff using our platform </p>
                                    <p> And much more </p>

                                    <div className='text-center d-block mx-auto'>
                                        <button
                                            type="button"
                                            className="header-action  md"

                                            onClick={
                                                (e) => {
                                                // redirect the user to the registration plan
                                                e.preventDefault();
                                                window.location.href = "/register/";
                                            }}>
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm m-2">
                            <div className="card payment-card">
                                <div className="card-body">
                                    <h1> Corporate Restaurant Plan </h1>
                                    <h2>(Coming Soon) </h2>
                                    <div className="image-center-icon">
                                        <img
                                            className="img-fluid"
                                            src="/img/team-meeting.svg"
                                            width="50vh"
                                            height="50vw"
                                        />
                                    </div>
                                    <h2 className="card-subtitle mb-2 text-muted">
                                        PLEASE CONTACT
                                    </h2>
                                    <p className="card-text">
                                        <p>For corporate account please contact us</p>
                                        <p> Unlimited Stores. </p>
                                        <p>Unlimited staff. </p>
                                        <p> Unlimited customers. </p>
                                        <p> And Much more. </p>
                                    </p>

                                    <div className='mx-auto d-block text-center'>
                                        <button
                                            type="button" className="header-action  md mx-auto"
                                            onClick={
                                                (e) => {
                                                    let container = document.getElementById('modal-container');
                                                    ReactDOM.render(<ContactPopup />, container);

                                                }
                                            }
                                            >
                                            Contact US
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
