/**
 *
 *  file: footer
 *
 *  type: (component)
 *
 *
 *  purpose: to render the footer component
 *
 */


import React from "react";


export class Footer extends React.Component {
    render() {
      return (
        <footer>
        {" "}

            <div className='container footer'>


              <div className='row'>
              <div className='row'>
              </div>

              <div className='row'>
                  <div className='col-sm mt-4'>
                  {/* SOLUTIONS    */}
                      <ul className="list-group footer-list">
                      <li className="list-group-item footer-section-title"> Solutions </li>
                      <li className='list-group-item footer-section-subtitle'>  How We Help</li>
                      <li className='list-group item footer-section-divider'> </li>
                      <li className='list-group-item footer-section-link'> <a href='#'>Access Information from anywhere </a></li>
                      <li className='list-group-item footer-section-link'> <a href='#'>Easily Integrate Data Across System </a></li>
                      <li className='list-group-item footer-section-link'> <a href='#'> Discover Data-Driven Insights </a></li>
                        <li className='list-group-item footer-section-link'> <a href='#'>  Manage Your Data </a></li>
                      </ul>
                  </div>

                  <div className='col-sm'>
                  {/* RECIPE MANAGEMENT  */}
                    <ul className='list-group footer-list'>
                        <li className='list-group-item footer-section-title'>  Features  </li>
                        <li className='list-group-item footer-section-subtitle'>  Explore the platform</li>
                        <li className='list-group-item footer-section-divider'> </li>
                        <li className='list-group-item footer-section-link'>  <a href='#'>  Recipe Management </a></li>
                        <li className='list-group-item footer-section-link'>  <a href='#'>  Employee Management </a> </li>
                        <li className='list-group-item footer-section-link'>  <a href='#'>  Schedule Management </a> </li>

                    </ul>
                  </div>
              </div>

             </div>
            </div>


        </footer>
      );
    }

}
