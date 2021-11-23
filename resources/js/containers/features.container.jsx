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


import { Header} from "../componets/home/header";
import {Footer } from "../componets/home/footer";

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
                  <h2 className='header-title'> Do less, earn more.</h2>
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
                  <img className='img-fluid hero-image' src='/img/savings.svg' />

                </div>
                
                <div className='col-sm header-section-space-md'>
                    <h1 className='header-subtitle'>  FOOD COST MANAGEMENT  </h1>
                    <h2 className='header-title'>  INCREASE YOUR BOTTOM LINE   </h2>
                    <p className='header-description'>  Track you food cost, and waste easily figure where you are wasting money 
                    using data driven technolgy   </p>
                </div>

            </div>


            <div className='row header-section-space-md'>
              <div className='col-sm'>
                  <img src='/img/employee-man-img.svg' className='img-fluid' />
                 </div>

                  <div className='col-sm header-section-space-md'>
                    <h1 className='header-subtitle'>  EMPLOYEE MANAGEMENT </h1>
                    <h2 className='header-title'> A SYSTEM FOR YOUR EMPLOYEES   </h2>
                    <p className='header-description'> Manage schedules, time off, availibility, drop shifts and more!   </p>
                  </div>

              </div>


              <div className='row header-section-space-md'>
                <div className='col-sm'>
                  <img src='/img/com-img.svg' className='img-fluid' />

                </div>


                <div className='col-sm header-section-space-md'>
                    <h1 className='header-subtitle'>  COMMUNICATION  </h1>
                    <h2 className='header-title'>  KNOW WHAT GOING ON IN REAL TIME   </h2>
                    <p className='header-description'> Connect your whole orginization together and get updates in realtime!
                    we connect you to your customers, and employee so you can roll out changes in real time hyper-focus on the customer experience and 
                    increase your profit!.  </p>

                </div>

                </div>

            </div>

          <Footer />
      </div>
    );
}