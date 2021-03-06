/**
 *
 *   file: body
 *
 *   type: (component)
 *
 *
 *  purpose: inorder to rend the body section
 */

import React from "react";

export class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body">
                <div className="container header-section-space-md">

                    <div className="row container">

                        <div className="col-md-6">
                            <div className="intro-image-grid">
                                <img src="/img/intro-header.jpg" className="img-fluid header-image rounded" alt="burger image" width={'500px'} />
                            </div>

                        </div>

                        <div className="col-md-6 header-section-space-md intro-second-title">
                                <h1 className="header-subtitle"> Cloud Chef </h1>
                                <h2 className="header-title"> The Secret Ingredient</h2>

                                <h3 className="header-description">
                                    Cloudchef is a restaurant management solution
                                    that helps any establishment and its staff work
                                    smarter and more efficient. We put all the
                                    information you need in one place, for when you
                                    need it the most.
                                </h3>

                                <h4 className="header-description">
                                    Make employee training easy and simple by using
                                    our cloud based recipe management system.
                                </h4>

                                <a href="/login/">
                                    <button
                                        className="btn btn-primary header-action"
                                        style={{ marginRight: "40px" }}
                                    >
                                        See it in Action
                                    </button>
                                </a>
                            </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-4 bg-white">
                        <div className="col-sm mb-3 blob-lg">
                            <img
                                src="/img/food-phone.jpg"
                                className="img-fluid"
                                alt="food photo"
                            />
                        </div>
                        <div className="col-sm header-section-space-md">
                            <h1 className="body-section-title">
                                {" "}
                                ALL OF YOUR RECIPES{" "}
                            </h1>

                            <h1 className="multi-color-section">
                                <span>Available </span>
                                <span>Anywhere </span>
                                <span>Anytime </span>
                            </h1>
                            <p className="header-description">
                                Cloud-based platform can be accessed from a
                                desktop or mobile device. Premium new recipe &
                                menu management for culinary professionals.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-4 bg-white ">
                        <div className="col-sm blob-lg">
                            <img
                                src="/img/burger-present.jpg"
                                className="img-fluid"
                                alt="burger present"
                            />
                        </div>

                        <div className="col-sm header-section-space-md">
                            <h1 className="body-section-title">
                                {" "}
                                Accurate Recipes Across All Locations
                            </h1>
                            <p className="header-description">
                                {" "}
                                Keep consistency in your menus and margins. Our
                                cloud-based software ensures that every unit has
                                access to the same recipes. Your customers know
                                that they can expect the same quality no matter
                                where they dine. You know that you can expect
                                the same profit from each plate.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-4 p-2 bg-white header-section-space-md">
                        <div className="col-sm crop-image">
                            <img
                                src="/img/baker-image.jpg"
                                className="img-fluid shadow"
                                alt="chef"
                            />
                        </div>

                        <div className="col-sm header-section-space-md">
                            <h1 className="body-section-title">
                                {" "}
                                Configure Calculations to What You Want{" "}
                            </h1>

                            <p className="header-description">
                                Ingredients can come in many different forms,
                                package sizes, and weights when received from
                                vendors. No matter what unit of measurement you
                                may need, we???ll make the conversion calculation
                                for you. Time is saved and errors are
                                eliminated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
