/**
 *
 *  file: header
 *
 *  type: (compent)
 *
 *
 *  purpose: inorder to render the header section of the page
 *
 */


import React from "react";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hamToggle: true,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }
    // active and decactive the toggle button state
    // bootstrap toggle wasnt working so i used this instead
    // vanilla js never fails :).
    handleToggle() {
        // trigger showing and hiding the menu
        let navel = document.getElementById('navbar');

        if (this.state.hamToggle) {
            this.setState({
                hamToggle: false,
            });
            // trigger the animations
            // show the menu and hide the toggle button
             navel.classList.add('show');
             navel.classList.add('hide');
        } else {
            this.setState({
                hamToggle: true,
            });
            // add a 1.75 delay to the animation
                navel.classList.add('hide');
                navel.classList.remove('show');

        }
    }

    getIconClass(state) {
        return state ? "fa fa-bars" : "far fa-window-close";
    }

    render() {
        return (
            <header className="_header_" id='navbar-wrapper'>
                <nav className="navbar navbar-expand-xl ml-auto mt-auto">

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={
                            (e) => {
                                return this.handleToggle(e);
                            }
                        }
                    >
                        <span className="navbar-toggler-icon icon-large">
                            <i
                                className={this.getIconClass(
                                    this.state.hamToggle
                                )}
                                style={{
                                    color: "white",
                                }}
                            ></i>
                        </span>
                    </button>



                    <a href="/">
                        <img
                            className="img-logo"
                            width="100px"
                            height="100px"
                            src="/img/logo/Cloud Chef-logos_white.png"
                            alt=""
                        />
                    </a>

                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbar">
                            <a className="nav-link" href="/">
                                {" "}
                                Home{" "}
                            </a>
                            <a
                                data-toggle="collapse"
                                className="nav-link"
                                href="/solutions/"
                                id="dropdown-solutions"
                            >
                                Solutions
                            </a>

                            <a
                                className="nav-link"
                                href="/features/"
                                id="dropdown-features"
                            >
                                Features
                            </a>

                            <a className="nav-link" href="/pricing/">
                                Pricing
                            </a>

                            <a className="nav-link m-1" href="/login/">
                                <button className="btn btn-primary header-action-no-margin">
                                    {" "}
                                    Login{" "}
                                </button>
                            </a>

                            <a className="nav-link m-1" href="/register/">
                                <button className="btn btn-primary header-action-no-margin" style={{

                                }}>
                                    {" "}
                                    Register{" "}
                                </button>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}
