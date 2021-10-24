/***
 * 
 * 
 *   file: router.js
 * 
 * 
 *   type: (router) 
 * 
 * 
 *  purpose: render all of our front end routes 
 */

 import React from "react";
 import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";
 


 // pages for the application
 import HomeContainer from './containers/home.container';
 import LoginContainer from './containers/login.container';
 import RegisterContainer from './containers/register.container';
 import SolutionsContainer from './containers/solutions.container'; 
 import FeaturesContainer from './containers/features.container';
 
 export default function AppRoutes() {
    return (
      <Router>
        <Switch>

        <Route path='/solutions/'>
            <SolutionsContainer />
        </Route>


        <Route path='/features/'>

            <FeaturesContainer />
        </Route>


        <Route path='/pricing/'>


        </Route>


        <Route path="/login/">
            <LoginContainer />
        </Route>
 
 
        <Route path='/register/'>
              <RegisterContainer />
        </Route>

 
          <Route path="/">
             <HomeContainer />
          </Route>
          
        </Switch>
    </Router>
    );
  }
 