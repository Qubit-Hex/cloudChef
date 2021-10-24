/**
 * 
 *   file: home.container
 * 
 *  
 *  purpose: this file glues all the componets  together  
 * 
 */


import React from "react";


/**
 * 
 *  home.jsx (template file)
 * 
 * 
 *  purpose: inorder to create our page templates 
 * 
 * 
 * 
 */
 import { Body} from '../componets/home/body';
 import { Footer } from '../componets/home/footer';
 import {Header} from '../componets/home/header';


 export default function HomeContainer(props) {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}