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

import { RegisterPage } from "../componets/register/register";
import { Header  } from "../componets/home/header";
import { Footer } from '../componets/home/footer';


 

export default function RegisterContainer(props) {
    return <div>
        <Header />
        <RegisterPage />
        <Footer />
    </div>
}