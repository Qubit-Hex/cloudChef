/**
 *      file: register 
 * 
 *      type: ( container )
 *  
 *      purpose: to provide view of our login container
 * 
 * 
 */


import React from 'react';

import { RegisterPage } from "../components/register/register";
import { Header  } from "../components/home/header";
import { Footer } from '../components/home/footer';


 

export default function RegisterContainer(props) {
    return <div>
        <Header />
        <RegisterPage />
        <Footer />
    </div>
}