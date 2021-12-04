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
 import { Body} from '../components/home/body';
 import { Footer } from '../components/home/footer';
 import {Header} from '../components/home/header';


 export default function HomeContainer(props) {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}