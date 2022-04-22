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
                            Employee Management System.
                        </h1>
                        <h2 className='header-title'>
                            Work Smarter, not Harder!
                        </h2>

                        <section>
                            <p className='header-description'>
                                Cloud Chef is a cloud based employee management system that allows you to manage your employees and their schedules.
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
                                Cloud Based.
                            </h1>

                            <h2 className='header-title'>
                                Access Information, Everywhere.
                            </h2>

                            <p className='header-description'>
                                Access your employee information from anywhere, anytime. update your information from anywhere with an easy to use interface.
                            </p>
                        </section>
                    </div>
                </div>



                <div className='row header-section-space-md'>
                    <div className='col crop-image'>
                        <img src='/img/chef_bottom.jpg' className='img-fluid' />
                    </div>

                    <div className='col-sm header-section-space-md'>
                        <h1 className='header-subtitle'>
                            Recipe Management System.
                        </h1>
                        <h2 className='header-title'>
                            Instant Data in your organization</h2>

                        <p className='header-description'>
                            Improve training, reduce training time, and save time by using our cloud based recipe management system.
                            Have your employee's  access your stores information from anywhere. Instantly and fast.
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
