/**
 * 
 * 
 *   file: register componet 
 * 
 *  type:  (compent )
 * 
 *  purpose: to render the registration form for the appplication  
 * 
 */


import { data } from 'jquery';
import React from 'react';


export class RegisterPage extends React.Component {

    

  // create a function to post to api
   async postToApi(url, method, data) {
        let grabber =  await fetch(url, {
            method: method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: new FormData(data),
        });

        return grabber;
    }





    // do some form checks inorder to see if form is valid before even submiting 
    validateForm (event) {
        // loop though the events inorder to verify that form is actually validated        
        
       event.preventDefault();
        for (let i = 0; i < event.target.length - 2; i++) {
            const res = event.target[i].value.length !== 0? true : false;
            if (res === true) {
                // continue the loop 
                continue;
            }   else {
                break;
            }
        }
        // if the form is valid then we can submit the form
        const url = '/authentication/register/';


        /// PSUDO CODE 
        // 1. POST FORM DATA TO API
        // 2. GET RESPONSE FROM API
        // 3. SEND RESPONSE FROM API TO THE AUTHENTICATION CHANNEL
        // 4. GET JSON OBJECT REQUEST FROM THE AUTHENTICATION CHANNEL
        // 5. STORE THE JSON OBJECT IN THE LOCAL STORAGE
        // 6. IF THE JSON IN STORE SEND CREDENTIALS TO THE API TO VERIFY THEY ARE A REAL USER
        // 6. REDIRECT THE USER TO THE SUCCESS PAGE
        // 7. LOAD THE DASHBOARD
        // 8. IF THE USER IS NOT LOGGED IN THEN REDIRECT TO THE LOGIN PAGE
        // 9. IF THE USER IS LOGGED IN THEN REDIRECT TO THE DASHBOARd


        console.log(event.target);

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
        return token;
    }


    // validates the form content to make sure that the input fields are set
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
                 <form className='form-login' method='POST' action='/authentication/register/' onSubmit={ (e) => { this.validateForm(e);}}>
         
                 <div className='blob image-badge'>
                    <img className='img-fluid' src='/img/restaurant-outline.svg' width='50vh' height='50vw'/>
                 </div> 
        
                 
                     <h1 className='form-login-title text-center'> Register </h1>

                     <h3 className='form-login-title text-center' style={{'font-size': '18px', 'color': 'dodgerblue'}}> Please fill out form to register an account </h3> 
 
                     <h4 className='error text-danger'>  </h4>
                 <div className="form-group">
                   <label htmlFor="email">Email </label> 
                   <span className='error-message text-center text-danger'></span>
                   <input name='email' type="email" onChange={ (e) => {this.validate(e, 0)} } className="form-control" aria-describedby="emailHelp" placeholder="Please enter your email" />
                 </div>
                 
                <div className='form-group'>

                    <label htmlFor='name'> Your Fullname </label>
                    <span className='error-message text-center text-danger'></span>
                    <input type='text' className='form-control' onChange={ (e) => {this.validate(e, 1)} } name='full-name' placeholder='full-name'/>
                </div>


                <div className='form-group'>
                    <label htmlFor='company'>   Company Name </label>
                    <span className='error-message text-center text-danger'></span>
                    <input type='text' className='form-control' onChange={ (e) => {this.validate(e, 2)} } name='company' placeholder='Your company Name' />
                </div>


                <div className='form-group'>
                   <label htmlFor="password">Password</label>
                   <span className='error-message text-center text-danger'></span>
                   <input name='password' type="password" onChange={ (e) => {this.validate(e, 3)} } className="form-control" placeholder="password" />
                 </div>

                 <div className="form-group">
                 <label htmlFor="password">Confirm Password</label>
                 <span className='error-message text-center text-danger'></span>
                 <input name='password-confirm' type="password" onChange={ (e) => {this.validate(e, 4)} } className="form-control" placeholder="Confirm Password" />
               </div>

               <div className='form-group'>
               <input type="hidden" name="_token" value={this.generateToken()} />
               </div>
 
                 <button type="submit"  name='submit' className="btn-lg header-action" style={{'width': '100%'}}>Register </button>
               </form>
                 </div> 
 
             </div>
            </div>
            </div>
        )
    }
}