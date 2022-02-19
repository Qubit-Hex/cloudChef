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
                  <img className="img-fluid" width='150px' height='150px' src="/img/logo/Cloud Chef-logos_white.png"  alt=""/>
            </a>



          <div className="container">



            <button  onClick={this.handleToggle} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon icon-large"><i className={this.getIconClass(this.state.hamToggle)}></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <div className="navbar-nav">

              <a className='nav-link' href='/'> Home </a>
                <a
                  className="nav-link"
                  href='/solutions/'
                  id="dropdown-solutions"
                >
                  Solutions
                </a>

                <a
                  className="nav-link"
                  href='/features/'
                  id="dropdown-features"
                >
                  Features
                </a>

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
