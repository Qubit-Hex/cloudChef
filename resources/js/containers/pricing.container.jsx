/**
 * 
 *  naem: pricing container
 * 
 *  type: container
 * 
 *  purpose: to handle the pricing page
 * 
 */



import React, { Component } from 'react';

import { Header} from "../components/home/header";
import {Footer } from "../components/home/footer";

export default class PricingContainer extends Component {

    render() {
        return (
            <div className='page-content'>
                <Header />
                    <div className='container header-section-space-md mb-4'>

                        <div className='row mb-4'>

                        <div className='col-sm'>
                                <h1 className='header-subtitle  text-center'>Pricing</h1>

                                <p className='text-center mt-4'>
                                See our pricing plan and choose the best plan the will suit your business needs.
                                    </p>

                                </div>
                            <div className='col-sm'>

                                <img src='/img/pricing-image.svg' className='img-fluid' />
                             
                            </div>


                        </div>
                        
                        <div className='row'>
                                <div className='col-sm m-2'>
                                    <div className='card payment-card'>              
                                        <div className='card-body'>
                                            <h1>Small Business Plan</h1>
                                            <div className='image-center-icon'>
                    <img className='img-fluid' src='/img/restaurant-outline.svg' width='50vh' height='50vw'/>
                 </div> 
                                            <h2 className='card-subtitle mb-2 text-muted'>$0/month</h2>
                                            <p className='card-text'>
                                              Try our basic plan for free
                                            </p>

                                            <p></p>
                                            <p> One store </p>
                                            <p> Access your information anywhere </p>
                                            <p> Cloud based services, access your information anywhere </p>
                                            <p> Manage staff using our platform </p>
                                            <p> And much more </p>
                                            

                                            <button type='button' className='header-action  md'>Sign Up</button>
                                        </div>
                                    </div>
                                </div>

                                <div class='col-sm m-2'>


                                    <div className='card payment-card'>              
                                        <div className='card-body'>
                                            <h1> Corporate Resturant Plan </h1>
                                            <h2>(COMMING SOON) </h2>
                                            <div className='image-center-icon'>
                    <img className='img-fluid' src='/img/team-meeting.svg' width='50vh' height='50vw'/>
                 </div> 
                                            <h2 className='card-subtitle mb-2 text-muted'>PLEASE CONTACT</h2>
                                            <p className='card-text'>
                                              For corprate account please contact us for more information.
                                              Corporate account is available for 100 people.
                                              <p></p>
                                             <p>     Unlimited Stores. </p>
                                              <p>Unlimited staff. </p>
                                               <p> Unlimited customers. </p>
                                               <p> real time store performance. </p>
                                            </p>

                                            

                                            <button type='button' className='header-action  md'>Contact US</button>
                                        </div>
                                    </div>
                                    </div>


                            </div>
                    </div>

                <Footer />
            </div>);

    }
}