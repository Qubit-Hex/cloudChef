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


    const sendInfo = () => {
        let container = document.getElementById('modal-container');
        // unmount the component
        const request = async () => {
            // send the request to the server
            const api = new FetchServiceProvider();
            const route = '/api/contact/send';

            const data = {
                // the data that will be sent to the server.
            }

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            // send the request to the server using a post command
            return api.post(route, data, headers)
        }

        let sendMail =  request();
        // check the request status
        React.useEffect(() => {
            sendMail.then((response) => {
                if (response.status === 200) {
                    // close the modal
                    // trigger a succcess message to bind to the modal
                    closeWindow();
                } else {
                    // trigger a error message to bind to the modal
                }
            });
        }, []);
    }


    // handle the submit event for the page
    const onSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you shortly.');
    }

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

                            <div className='background-img-popup'>
                               {/** 4x4 image grid  */}
                               <img src='/img/SVG/teamup.svg' className='img-fluid' />

                            </div>
                        </div>

                        <div className='col-md-6 p-4 contact-form-popup'>
                        <h1> Contact US </h1>
                        <span className='text-muted'>  Please fill out the form inorder to contact us, about our corporate plans. </span>
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    onSubmit(e);
                                }
                            }>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    {/** full name  */}
                                    <label for="exampleInputPassword1">Full Name</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Full Name"/>
                                </div>
                                <div className="form-group">
                                    {/** phone number */}
                                    <label for="exampleInputPassword1">Phone Number</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone Number"/>
                                </div>
                                <div className="form-group">
                                    {/** company name */}
                                    <label for="exampleInputPassword1">Company Name</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Company Name"/>
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

                        <div class="col-sm m-2">
                            <div className="card payment-card">
                                <div className="card-body">
                                    <h1> Corporate Resturant Plan </h1>
                                    <h2>(COMMING SOON) </h2>
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
                                        For corporate account please contact us
                                        for more information. Corporate account
                                        is available for 100 people.
                                        <p></p>
                                        <p> Unlimited Stores. </p>
                                        <p>Unlimited staff. </p>
                                        <p> Unlimited customers. </p>
                                        <p> And Much more. </p>
                                    </p>

                                    <button
                                        type="button"
                                        className="header-action  md"
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

                <Footer />
            </div>
        );
    }
}
