/**
 * 
 *   file: login
 * 
 * 
 *  TYPE: (COMPONENT)
 * 
 *  Purpose: inorder to display the login page 
 * 
 */


import React from "react";

import '../../assets/css/login.css';



export class LoginPage extends React.Component {


    constructor(props) {
        super(props);

        // our application state
        this.state = {

        }
    }

    // this will  prevent the event and verify if we go a token back or no
    isssueRequest(event) 
    {

    }
    
    // send a token with the information to our api backend
    sendRequestToken(e)
    {
      e.preventDefault();


        console.log(e);
    }

    render() {
        return (

          <div id='login-color-box'>
           <div className='container pannel'>
            <div className='row'>

                <div className='col form-login' >
                <form className='form-login' method='POST' action='/'  onSubmit={(e) => { e.preventDefault();}}>
                <div className='blob image-badge'>
                    <img className='img-fluid' src='/img/logo/black.png' />
                 </div> 
                    <h1 className='form-login-title text-center'> Please Login </h1>

                    <h4 className='error text-danger'>  </h4>
                <div className="form-group">
                  <label for="username">Username </label>
                  <input name='username' type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter enter username" />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input name='password' type="password" className="form-control" placeholder="password" />
                </div>
                <div className="form-group">
                <label for="client-id"> Client ID</label>
                <input name='client-id' type="text" className="form-control"  placeholder="ID Number" />
              </div>

                <div className='form-group mt-4'>
                  <a className='link text-center' href='#'> Forgot Password</a>
                </div>

                <button type="submit" onClick={(e) => {e.preventDefault(); console.log('test');}} name='submit' className="btn-lg header-action" style={{'width': '100%'}}>Login </button>
              </form>
                </div> 
                
                <div className='col form-login-splash'> 
                {/* SHADOW ELEMENT HERE FOR THE SHADOW EFFECT  */}

                <div className='form-splash-drop-shadow'>
                
                
                
                </div>
              
                </div>

            </div>
           </div>
           </div>
        );
    }
}