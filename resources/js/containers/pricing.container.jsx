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

import { Header} from "../componets/home/header";
import {Footer } from "../componets/home/footer";

export default class PricingContainer extends Component {

    render() {
        return (
            <div className='page-content'>
                <Header />
                    <div className='container header-section-space-md mb-4'>

                        <div className='row mb-4'>

                        <div className='col-sm'>
                                <h1 className='header-subtitle  text-center'>Pricing</h1>

                                </div>
                            <div className='col-sm'>

                                <img src='/img/pricing-image.svg' className='img-fluid' />
                             
                            </div>


                        </div>
                        
                        <div className='row'>
                                <div className='col-sm m-2'>
                                    <div className='card payment-card'>              
                                        <div className='card-body'>
                                            <h1>Basic Plan  ( Table for one please ) </h1>
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
                                            <p> Cloud QR CODE ORDERING </p>
                                            

                                            <button type='button' className='header-action  md'>Sign Up</button>
                                        </div>
                                    </div>
                                </div>

                                <div class='col-sm m-2'>


                                    <div className='card payment-card'>              
                                        <div className='card-body'>
                                            <h1>Corporate PLAN   ( PARTY OF 100 ) </h1>
                                            <h2>(COMMING SOON) </h2>
                                            <div className='image-center-icon'>
                    <img className='img-fluid' src='/img/team-meeting.svg' width='50vh' height='50vw'/>
                 </div> 
                                            <h2 className='card-subtitle mb-2 text-muted'>PLEASE CONTACT</h2>
                                            <p className='card-text'>
                                              For corprate account please contact us for more information.
                                              Corporate account is available for 100 people.
                                              <p></p>
                                             <p> Unlimited tables.</p>
                                             <p>     Unlimited Stores. </p>
                                              <p>Unlimited staff. </p>
                                               <p> Unlimited customers. </p>
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