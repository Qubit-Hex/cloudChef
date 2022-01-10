/**
 *
 *  @component: DashboardHeader
 *
 *
 *  @purpose: This component is used to render the header of the dashboard.
 *
 */




import React, { Component } from 'react';


import FetchServiceProvider from '../../lib/fetchServiceProvider';

export class DashboardNav extends Component {
    constructor(props) {

        super(props);

        /**
         *
         *  our state here we will be using to update store specific details of the
         *  design of the dashboard!
         *
         */

        this.state = {
            isOpen: false,
            storeName: '',

        }



    }

    /**
     *
     *  @method: getCookie
     *
     *
     * @purpose: this method is used to get the cookie from the browser
     */

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     *  @method: componentWillMount
     *
     *  @purpose: This function is used to update the store name in the header
     *
     */

    // NOTE: we need to fix the logic to prevent a loop
    componentDidMount(prevProps, prevState) {

        if (this.state.storeName === '') {
        let fetchRequest = new FetchServiceProvider();

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getCookie('accessToken'),
            'command': 'getStoreName'
        }


        let userInput = {
            storeID: this.getCookie('storeID'),
            token: this.getCookie('accessToken'),
            time: Date.now(),
        };

       return  fetchRequest.$get(`/api/store/get?token=${userInput.token}`, headers, (response) => {

                this.setState({
                    storeName: response.store,

                })

        });
    } else {
        return;
    }

    }

    render() {

        return (

            <nav className="navbar dashboard-nav-color navbar-expand-lg navbar-transparent ml-auto mt-auto">
            <h3 className='dashboard-nav-title'>
              {/** store icon font awesome  */}
              <img src='/img/logo/Cloud Chef-logos_white.png' width='150px' height='150px' alt='cloud chef logo' className='img-fluid' />
              <i className="fas fa-store mr-2"></i>
            <small className='dashboard-nav-title-sub'> <b> Store /  </b>  {  this.state.storeName }</small> </h3>


            <div className='nav'>


              <div className='nav-items'>

              </div>

              <a  href='/dashboard/'className='nav-link'>
                <i className="fas fa-home"></i>
                <span className='nav-link-text'>Home</span>
              </a>

              <a  href='/dashboard/schedule/' className='nav-link'>


                <i class="fas fa-calendar-week"></i>
                <span className='nav-link-text'>
                  Schedule
                </span>
              </a>

              <a  href='/dashboard/messages/' className='nav-link'>
                {/** font awesome chat icon */}
                <i class="fas fa-comments"></i>
                <span className='nav-link-text'>
                  Messages
                </span>
              </a>

              <a href='/dashboard/contacts/' className='nav-link' >
                <i class="fas fa-user-tie"></i>
                <span className='nav-link-text'>
                  Contacts
                </span>
              </a>


              <a href='/dashboard/settings/' className='nav-link'>
                {/** font awesome gear icon */}
                <i class="fas fa-cog"></i>
                <span className='nav-link-text'>
                  Settings
                </span>
              </a>


              <a href='/dashboard/notification/' className='nav-link'>
                {/** font awesome bell icon */}
                <i class="fas fa-bell"></i>
                <span className='nav-link-text'>
                <i class="fas fa-angle-down"></i>
                </span>
              </a>

              <a  href='/dashboard/logout/'className='nav-link'>
                {/** font awesome power button */}
                <i class="fas fa-power-off"></i>
                <span className='nav-link-text'>
                  Logout
                </span>
              </a>
            </div>


          </nav>

        );
    }

}
