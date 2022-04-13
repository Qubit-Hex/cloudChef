/**
 *  file: solutions
 * ~
 *  type: container
 *
 *
 *  purpose: to glue compents together inorder to create a page
 *
 *
 */


import React from "react";

import {Header} from "../components/home/header";
import {Footer} from "../components/home/footer";

export default function SolutionsContainer(props) {

    return (
        <div>
            <Header/>


            <div className='container header-section-space-md mb-4'>

                <div className='row'>
                    <div className='col-sm  blob-lg'>
                        <img className='img-fluid' src='/img/chef-blacknwhite.jpg'/>
                    </div>

                    <div className='col-sm header-section-space-md'>
                        <h1 className='header-subtitle'>
                            AUTOMATE OUTDATED PROCCESSES
                        </h1>
                        <h2 className='header-title'>
                            Work Smarter, not Harder!
                        </h2>

                        <section>
                            <p className='header-description'>
                                Data driven technology eliminates manual data entry and associated labor costs, see how it can help with your
                                                             bottom line. Elimate errrors and let automation take over.
                            </p>
                        </section>
                    </div>

                </div>

                <div className='row header-section-space-md'>

                    <div className='col-sm'>

                        <img className='img-fluid' src='/img/world.svg'/>
                    </div>

                    <div className='col-sm header-section-space-md'>
                        <section>
                            <h1 className='header-subtitle'>
                                ANYWHERE ANYTIME
                            </h1>
                            <h2 className='header-title'>
                                No Matter Where Life Takes You</h2>
                            <p className='header-description'>
                                Get visibility into purchases and performance across locations and on any device,
                                                        Access Information from any device no matter where you are.
                            </p>
                        </section>
                    </div>
                </div>


                <div className='row header-section-space-md'>

                    <div className='col-sm'>
                        <img src='/img/prediction.svg' className='img-fluid'/>

                    </div>

                    <div className='col-sm header-section-space-md'>
                        <h1 className='header-subtitle'>
                            Data-Driven Business Insights</h1>
                        <h2 className='header-title'>
                            Putting Your Data to Good Use</h2>
                        <p className='header-description'>
                            Discover Data driven business insights.
                                                Tap into an intelligent, marketing-driven customer data warehouse that can be leveraged
                                                for marketing insights and business decisions.
                        </p>

                    </div>
                </div>


                <div className='row header-section-space-md'>
                    <div className='col-sm blob-lg'>
                        <img src='/img/service.jpg' className='img-fluid'/>
                    </div>

                    <div className='col-sm header-section-space-md'>
                        <h1 className='header-subtitle'>
                            REAL TIME COMMINICATION
                        </h1>
                        <h2 className='header-title'>
                            Instant Data in your organisation</h2>

                        <p className='header-description'>
                            If you've ever had a bad experience with a restaurant, had to deal with high-turnover of employees, and an unhappy customer base, then we have the perfect solution for you.
                                                We're an award-winning restaurant saas that helps restaurants manage everything from customer feedback and recipe management to employee management and marketing campaigns.
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
