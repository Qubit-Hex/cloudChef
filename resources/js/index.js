/**
 *
 *  file: index.js
 *
 *  type: (main)
 *
 *  purpose: main file inorder to get things going
 */



import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import AppRoutes from "./router.js";

// UI Sections

let container = document.getElementById("root");

// main application component for displaying webpages

ReactDOM.render(
<BrowserRouter >
    <AppRoutes / >
        <div id='notification-container'>  </div>
    </BrowserRouter>,
    container);
