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

import fetchServiceProvider from '../../lib/fetchServiceProvider.js';



export class RegisterPage extends React.Component {
    
    // do some form checks inorder to see if form is valid before even submiting 
    constructor(props) {
        super(props);
        this.fetchServiceProvider = new fetchServiceProvider


        this.state = {

        }
    }


    validateForm (event) {
        // loop though the events inorder to verify that form is actually validated 
        
        event.preventDefault();
        
        for (let i = 0; i < event.target.length - 2; i++) {
            const res = event.target[i].value.length !== 0? true : false;
    
            if (res === false) {
                // let the user know that the form is not valid
                document.getElementsByClassName('error')[0].innerHTML = 'Please fill out all fields';
                break;
            }
        }
        
        let request = {
            email: event.target[0].value,
            fullname: event.target[1].value,
            company: event.target[2].value,
            password: event.target[3].value,
            password_confirm: event.target[4].value,
            _token: event.target[5].value
        }
        
        
        // if the form is valid then submit the form
        return this.register(request);
    }


    /**
     *  @method: register 
     * @prupose: to proccess the async registration compnent 
     * 
     * 
     */

    register(request) {
        let headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.generateToken(),
        }
        // logic once we get a response from our callbac;
       this.fetchServiceProvider.$post('/api/auth/register', request, headers, (response) => {
            console.table(response);


            // return any infomration for the server for the display to see !
            if (response.message !== 0 ) {
                document.getElementById('server_response_wrapper').innerHTML = response.message;
                document.getElementById('server_response_wrapper').style.fontWeight = 'bold';
            }

    });
}

    // generate our CSFR TOKEN FOR OUR APPLICATION 
    generateToken()
    {
        const token = document.getElementById('_token_').content;
        return token;
    }


    // validates the form content to make sure that the input fields are set
    validate(event, number) {
        // to make a shaking animation of our login store
        const errorWrapper = document.getElementsByClassName('error-message')[number];
        if (event.target.value.length === 0) {
            errorWrapper.classList.add('text-danger');
            errorWrapper.classList.remove('text-success');
            errorWrapper.innerText = 'Please fill out this field it is required';
            document.getElementById('registration-form').classList.add('shake-animation')
        } else {
            errorWrapper.innerHTML = `<i class="fas fa-check-circle"></i>  <span style='margin-left: 10PX;'> looks good! <?/span>`
            errorWrapper.classList.add('text-success');
            errorWrapper.classList.remove('text-danger');
            document.getElementById('registration-form').classList.remove('shake-animation')
            return true;
        }
    }

    render() {
        return (
            <div id='login-color-box'>
            <div className='container pannel'>
             <div className='row'>
 
                 <div className='col form-login' id='registration-form' >
                 <form className='form-login' onSubmit={ (e) => { this.validateForm(e);}}>
        
                 <div className='blob image-badge'>
                    <img className='img-fluid' src='/img/restaurant-outline.svg' width='50vh' height='50vw'/>
                 </div> 
        
                 
                     <h1 className='form-login-title text-center'> Registration </h1>

                     <h3 className='form-login-title text-center' style={{'font-size': '18px', 'color': 'dodgerblue'}}> Please fill out information inorder to register for an account  </h3> 
 
                     <h4 className='error text-danger text-center'>  </h4>

                     <h4 id='server_response_wrapper' class='error text-danger'></h4>
                 <div className="form-group">
                   <label htmlFor="email">Email </label> 
                   <span className='error-message text-center text-danger'></span>
                   <input name='email' type="email" onChange={ (e) => {this.validate(e, 0)} } className="form-control" aria-describedby="emailHelp" placeholder="Please enter your email" />
                 </div>
                 
                <div className='form-group'>

                    <label htmlFor='name'> Your Fullname </label>
                    <span className='error-message text-center text-danger'></span>
                    <input type='text' className='form-control' onChange={ (e) => {this.validate(e, 1)} } name='fullname' placeholder='full-name'/>
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
                 <input name='password_confirm' type="password" onChange={ (e) => {this.validate(e, 4)} } className="form-control" placeholder="Confirm Password" />
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