/**
 *
 *  @component: DashboardHeader
 *
 *
 *  @purpose: This component is used to render the header of the dashboard.
 *
 */

import { auto } from "@popperjs/core";
import { nodeName } from "jquery";
import React, { Component } from "react";

import FetchServiceProvider from "../../lib/fetchServiceProvider";

export class DashboardNav extends Component {
    constructor(props) {
        super(props);

        /**
         *
         *  our state here we will be using to update store specific details of the
         *  design of the dashboard!
         *
         */

        this.state = {
            isOpen: false,
            storeName: "",
        };
    }

    /**
     *
     *  @method: getCookie
     *
     *
     * @purpose: this method is used to get the cookie from the browser
     */

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     *  @method: componentWillMount
     *
     *  @purpose: This function is used to update the store name in the header
     *
     */

    // NOTE: we need to fix the logic to prevent a loop
    componentDidMount(prevProps, prevState) {
        if (this.state.storeName === "") {
            let fetchRequest = new FetchServiceProvider();

            let headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.getCookie("accessToken"),
                command: "getStoreName",
            };

            let userInput = {
                storeID: this.getCookie("storeID"),
                token: this.getCookie("accessToken"),
                time: Date.now(),
            };

            return fetchRequest.$get(
                `/api/store/get?token=${userInput.token}`,
                headers,
                (response) => {
                    this.setState({
                        storeName: response.store,
                    });
                }
            );
        } else {
            return;
        }
    }

    render() {
        return (
            <div>
                <nav class="navbar p-2 shadow header-navbar-dashboard">
                    <div className="navbar-brand header-title">
                        <button
                            className="btn header-action remove-hamburger-menu"
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: "5px",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                            onClick={(e) => {
                                let sidenav = document.getElementById("expanding-nav");
                                let navbarState = sidenav.classList.toggle("displayState");

                                if (navbarState === true) {
                                    sidenav.classList.remove("slideOutFade");
                                    sidenav.classList.toggle("slideInFade");
                                } else {
                                    // remove the class if the navbar is closed
                                    sidenav.classList.remove("slideInFade");
                                    sidenav.classList.toggle("slideOutFade");
                                }
                            }}
                        >
                            <i
                                class="fas fa-bars"
                                style={{ color: "#fff", fontSize: "2rem" }}
                            ></i>
                            {/* arrow pointing down with animation  */}
                        </button>

                        <span className="dashboard-nav-title-sub nav-brand" style={{
                            fontSize: '1rem',
                        }}>
                            <img
                                src="/img/logo/Cloud Chef-logos_white.png"
                                alt="cloud chef logo"
                                className="navbar-brand-img"
                            />
                            <i
                                className="fas fa-store mr-2"
                                style={{ color: "#fff" }}
                            ></i>{" "}
                            <span>
                                <b> Store / </b> {this.state.storeName}
                            </span>
                        </span>
                    </div>
                </nav>
                <nav
                    className="navbar dashboard-horizontal-nav"
                    id="expanding-nav"
                >
                    <div className="navbar ">
                        <a href="/dashboard/" className="nav-link">
                            <i className="fas fa-home"></i>
                            <span className="nav-link-text">Home</span>
                        </a>

                        <a href="/dashboard/schedule/" className="nav-link">
                            <i class="fas fa-calendar-week"></i>
                            <span className="nav-link-text">Schedule</span>
                        </a>

                        <a href="/dashboard/recipie/" className="nav-link">
                            {/**  food management pat for cloud recipes etcc... */}
                            <i className="fas fa-hamburger"></i>
                            <span className="nav-link-text">Recipes</span>
                        </a>

                        <a href='/dashboard/advertising/' className="nav-link">
                            <i className="fas fa-bullhorn"></i>
                            <span className="nav-link-text">Advertising</span>
                        </a>

                        <a href='/dashboard/analytics/' className="nav-link">
                            <i className="fas fa-chart-line"></i>
                            <span className="nav-link-text">Analytics</span>
                        </a>

                        <a href="/dashboard/messages/" className="nav-link">
                            {/** font awesome chat icon */}
                            <i class="fas fa-comments"></i>
                            <span className="nav-link-text">Messages</span>
                        </a>

                        <a href="/dashboard/contacts/" className="nav-link">
                            <i class="fas fa-user-tie"></i>
                            <span className="nav-link-text">Contacts</span>
                        </a>

                        <a href="/dashboard/settings/" className="nav-link">
                            {/** font awesome gear icon */}
                            <i class="fas fa-cog"></i>
                            <span className="nav-link-text">Settings</span>
                        </a>

                        {/** plugins */}
                        <a href="/dashboard/plugins/" className="nav-link">
                            <i className="fas fa-plug"></i>
                            <span className="nav-link-text">Plugins</span>
                        </a>

                        {/** LOGOUT BUTTON  WITH A POWER BUTTON*/}
                        <a href="/dashboard/logout/" className="nav-link">
                            <i class="fas fa-power-off"></i>
                            <span className="nav-link-text">Logout</span>
                        </a>

                    </div>
                </nav>{" "}
            </div>
        );
    }
}
