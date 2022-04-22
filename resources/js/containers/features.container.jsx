/***
 *
 *
 *  name: features
 *
 *  type: container
 *
 *
 *  purpose: to glue all the compents together
 *
 *
 */



import React from "react";


import { Header} from "../components/home/header";
import {Footer } from "../components/home/footer";

export default function FeaturesContainer(props) {

    return (
      <div className='page-content'>

          <Header/>

            <div className='container header-section-space-md mb-4'>

            <div className='row'>

              <div className='col-sm'>
                  <img className='img-fluid' src='/img/team-hands.svg' />

                </div>

                <div className='col-sm header-section-space-md'>
                  <h1 className='header-subtitle'>EXPLORE THE PLATFORM  </h1>
                </div>

            </div>

            <div className='row header-section-space-md'>

              <div className='col-sm blob-lg'>
                  <img className='img-fluid hero-image' src='/img/recipe-man-img.jpg' />
              </div>

                <div className='col-sm header-section-space-md'>
                  <h1 className='header-subtitle'> Recipe Management  </h1>
                  <h2 className='header-title'> A Recipe for Success </h2>
                  <p className='header-description'> Manage recipes in a simple interface
                  update team in real time with any changes the you roll out.  effortlessly perfect consistency.  </p>
                </div>

            </div>



            <div className='row header-section-space-md'>
              <div className='col-sm'>
                  <img src='/img/employee-man-img.svg' className='img-fluid' />
                 </div>

                  <div className='col-sm header-section-space-md'>
                    <h1 className='header-subtitle'>  Employee Management System </h1>
                    <p className='header-description'>
                    cloud chef is a easy employee management system for make schedules and managing food items. cloud chef makes it easy to make schedules, add new employees and manage what food your store sells.

                    </p>
                  </div>
              </div>
            </div>

          <Footer />
      </div>
    );
}
