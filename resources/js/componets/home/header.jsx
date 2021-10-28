/**
 * 
 *  file: header
 * 
 *  type: (compent)
 * 
 * 
 *  purpose: inorder to render the header section of the page 
 * 
 */


 import React from "react";


 export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hamToggle: true
    }

    this.handleToggle = this.handleToggle.bind(this);
  }
  // active and decactive the toggle button state
  handleToggle()
  {
      if (this.state.hamToggle === true) {
        this.setState({hamToggle: false});
      } else {
        this.setState({hamToggle: true});
      }
  }

  getIconClass(state){
    return state ? 'fa fa-bars' : 'far fa-window-close'; 
  }




  render() {

    return (
      <div className="_header_">
        <nav className="navbar navbar-expand-lg navbar-transparent ml-auto mt-auto">
                  <a className='navbar-brand' href='/'>
                  <img className="img-fluid" width='50%' height='50%' src="/img/logo/Cloud Chef-logos_white.png"  alt=""/> 
            </a>
    
               
       
          <div className="container">


            
            <button  onClick={this.handleToggle} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon icon-large"><i className={this.getIconClass(this.state.hamToggle)}></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <div className="navbar-nav">


              <a className='nav-link' href='/'> Home </a>
                <a
                  className="nav-link dropdown-toggle"
                  href='/solutions/'
                  id="dropdown-solutions"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Solutions
                </a>
                <ul className="dropdown-menu fade-in" aria-labelledby="dropdown-solutions">
                  <li className='nav-item'>
                    <a className="dropdown-title" >
                      How we can Help
                    </a>
                    <p className='dropdown-subtitle text-center'> We want you to make the most of every dollar of revenue. </p>
                  </li>
                  <div  className='border-breakpoint' />
                  <div className='container'>

                    <div className='row'>

                        <div className='col-sm'>
                              <li >  
                                <i className="fas fa-robot dropdown-icon"></i>
                                <a className='dropdown-link' href='/solutions/'> Automate Outdated Processes  </a>
                                <p className='dropdown-desc'> Minimize data entry, manual workflows & associated labor costs  </p>
                              </li>
                        </div>

                        <div className='col-sm'>
                            <li> 
                              <i className="fas fa-database dropdown-icon"></i>
                              <a className='dropdown-link' href='/solutions/'> Access Information from anywhere   </a>
                              <p className='dropdown-desc'>Get visibility & take action on any mobile or desktop device</p>
                            
                            </li>
                        </div>

                        <div className='border-breakpoint' /> 
                        <div className='row'>

                          <div className='col-sm'>
                              <li> 
                                <i className="fas fa-broadcast-tower dropdown-icon"></i>
                                <a className='dropdown-link' href='/solutions/'> Intergrate data across systems  </a>
                                <p className='dropdown-desc'> A hub for your financial data without the need for redundant data entry</p>
                              </li>
                          </div>


                          <div className='col-sm'>
                            <li>
                               <i className="fas fa-chart-line dropdown-icon"></i>
                               <a className='dropdown-link' href='/solutions/'> Real time data </a> 
                               <p className='dropdown-desc'>  Accurate, real-time analytics improve purchasing, menu pricing & production </p>
                            </li>
                          </div>
                          
                          
                        </div>

                        <div className='row'>
                        <div className='col-sm'>
                            

                            <p className='header-subtitle mt-4'>  Your success is our mission!  </p>
                        </div>

                        </div>

                         
                    </div>

                  </div>
                </ul>
                <a
                  className="nav-link dropdown-toggle"
                  href='/features/'
                  id="dropdown-features"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Features
                </a>

                <ul className="dropdown-menu fade-in" aria-labelledby="dropdown-features">
                  <div className='container'>
                    <div className='row'>
                    {/** RECFACTOR THIS */}
                          <div className='col-sm'>
                              <li>
                                
                                  <a className='dropdown-title'>Explore the Platform </a>
                                  <p className='dropdown-subtitle text-center'>provides easy-to-use tools to better run your restaurant.</p>
                              </li>
                                <div className='border-breakpoint' />
                          </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm'>
                            <li>
                                <i className="fas fa-utensils dropdown-icon"></i>
                                <a className='dropdown-link' href='/features/'> Recipe Management </a>
                                <p className='dropdown-desc'> Simplified plate costing fueled by accurate invoice data  </p>
                            </li>
                        </div>


                        <div className='col-sm'>
                            <li>
                                <i className="far fa-chart-bar dropdown-icon"></i>
                                <a className='dropdown-link' href='/features/'> Food Cost Management </a>
                                <p className='dropdown-desc'> Real-time reports & dashboards to maximize your margins</p>
                            </li>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-sm'>
                            <li>
                            <i className="fas fa-users  dropdown-icon"></i>
                              <a className='dropdown-link' href='/features/'> Communication System </a>
                              <p className='dropdown-desc'>Easy-to-use Communication system update team in real time,
                              get data drivin insights from customers in real time</p>
                            </li>
                        </div>


                        <div className='col-sm'>
                            <li>
                                  <i className="fas fa-user-tie dropdown-icon"></i>
                                  <a className='dropdown-link' href='/features/'> Employee Management System</a>
                                  <p className='dropdown-desc'> cloud chef employee management system is designed to make both managers and workers more productive by automating time tracking records, 
                                  reports and data analytics.</p>
                            
                            </li>
                        </div>

                    </div>
                  </div>
                </ul>

                <a className="nav-link" href="/pricing/">
                  Pricing 
                </a>

                <a className="nav-link" href="/login/">
                  <button className="btn btn-primary header-action-no-margin">
                    {" "}
                    Login{" "}
                  </button>
                </a>

                <a className="nav-link" href="/register/">
                  <button className="btn btn-primary header-action-no-margin">
                    {" "}
                    Register{" "}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  }
  