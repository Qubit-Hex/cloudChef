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

  // do some form checks inorder to see if form is valid before even submiting 
  validateForm (event) {
    // loop though the events inorder to verify that form is actually validated 
    for (let i = 0; i < event.target.length - 2; i++) {
        const res = event.target[i].value.length !== 0? true : false;
        if (res === true) {
            // continue the loop 
            continue;
        }   else {
            console.log('error'); 
            event.preventDefault();
            break;
        }
    }
// submit the form if the all fields are filled out

    postData('/authentication/login/', ['something']);
    return event.target.submit();
   
}
// generate our CSFR TOKEN FOR OUR APPLICATION 
generateToken()
{
    const token = document.getElementById('_token_').content;


    let data = new Object();


    // get basic information about our user to send back to the server=
    data = {
        token: true,
        tokenValue: token,
        isLoggedIn: false,
        time: Date.now(),          
    }
      
    console.log(data);
    return token;
}


// validate the form 
validate(event, number) {

    const errorWrapper = document.getElementsByClassName('error-message')[number];
    if (event.target.value.length === 0) {
        errorWrapper.innerText = 'Please fill out this field it is required';
    } else {
        errorWrapper.innerText = '';
        return true;
    }
}


    render() {
        return (

          <div id='login-color-box'>
           <div className='container pannel'>
            <div className='row'>

                <div className='col form-login' >
                <form className='form-login' method='POST' action='/authentication/login/'  onSubmit={ (e) => { this.validateForm(e) }}>
                <div className='blob image-badge'>
                    <img className='img-fluid' src='/img/restaurant-outline.svg' width='50vh' height='50vw'/>
                 </div> 
                    <h1 className='form-login-title text-center'> Please Login </h1>

                    <h4 className='error text-danger'>  </h4>
                <div className="form-group">
                  <label for="username">Username </label>
                  <span className='error-message text-center text-danger'></span>
                  <input name='username'  onChange={ (e) => {this.validate(e, 0)}}  type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter enter username" />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <span className='error-message text-center text-danger'></span>
                  <input name='password'  onChange={ (e) => {this.validate(e, 1)}}  type="password" className="form-control" placeholder="password" />
                </div>
                <div className="form-group">
                <label for="client-id"> Client ID</label>
                <span className='error-message text-center text-danger'></span>
                <input name='client-id'  onChange={ (e) => {this.validate(e, 2)}}  type="text" className="form-control"  placeholder="ID Number" />
              </div>


              <div className='form-group'>
               <input type="hidden" name="_token" value={this.generateToken()} />
               </div>

                <div className='form-group mt-4'>
                  <a className='link text-center' href='#'> Forgot Password</a>
                </div>

                <button type="submit" name='submit' className="btn-lg header-action" style={{'width': '100%'}}>Login </button>
              </form>
                </div> 
                
               

            </div>
           </div>
           </div>
        );
    }
}