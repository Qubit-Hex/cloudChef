/***
 * 
 * 
 *  name: features
 *  
 *  type: container
 * 
 * 
 *  purpose: to glue all the compents together 
 * 
 * 
 */



import React from "react";


import { Header} from "../componets/home/header";
import {Footer } from "../componets/home/footer";

export default function FeaturesContainer(props) {

    return (
      <div className='page-content'>

          <Header/>

            <div className='container'>

            <div className='row'>

                
            </div>

            </div>

          <Footer />
      </div>
    );
}