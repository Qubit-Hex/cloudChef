/**
 * 
 *  @File: contacts_navbar.jsx
 *  
 *  @components ContactNavbar
 *  
 * 
 *  @purpose inorder to create async component for contact filters / search via the store 
 */



import React from "react";
import { ReactDOM } from "react-dom";


export class ContactNavbar extends React.Component {
    constructor(props) {

      super(props);
    }



    render() {

        return (
            <div className='profile_Navbar container-fluid'>
              <div className='row'>
                 <div className='col'>
                      <div className='form-group ml-lg-4'>
                      <label htmlFor='search_contact' className='mr-2'>Search Contact</label>       
                      <input type="text" className="form-control" placeholder="Search" />
                      <button  class="btn-light ml-2 mt-2 fas fa-search"></button>
                      </div>
                  </div>
                  
                  <div className='col'>
                      <div className='form-group ml-lg-4'>
                          <label className="switch"> Role: </label>
                          <select className="form-control">
                              <option> Manager </option>
                              <option> Employee </option>
                          </select>
                      </div>

                  </div>
                </div>
             
            </div>
        );
    }


}