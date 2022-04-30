/***
 *
 *
 *  @file: menu,jsx
 *
 *
 *  @purpose : inorder to render the home splash screen for the   scheudle dashboard
 *
 *
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";

/**
 *
 * @component : CreateScheduleCard
 *
 *
 *
 *  @purrpose: inorder to render the create schedule card
 */

export const CreateScheduleCard = (props) => {
    return (
        <div className="col-md-4">
            {/** add schedule tile */}
            <div className="tile">
                <div className="tile-content">
                    <div className="mx-auto text-center">
                        <img
                            src="/img/SVG/time_flatline.svg"
                            className="mx-auto"
                            width={300}
                            height={300}
                        />
                    </div>
                    <h2 className="text-center m-2 header-subtitle">
                        {" "}
                        Add Schedule{" "}
                    </h2>
                    <p className="text-center text-muted">
                        {" "}
                        Add a new schedule to your store
                    </p>
                    <div className="tile-icon  text-center">
                        <a
                            className="btn header-action btn-lg m-4 mx-auto w-50"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            href="/dashboard/schedule/add/"
                        >
                            <span> Create Schedule</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 *
 *
 *  @component : ViewScheduleCard
 *
 *
 *  @purrpose: inorder to render the view schedule card
 *
 */

export const ViewScheduleCard = (props) => {
    return (
        <div className="col-md-4  mx-auto">
            <div className="tile">
                <div className="tile-content">
                    <div className="mx-auto text-center">
                        <img
                            src="/img/SVG/schedule_icon_alt.svg"
                            className="mx-auto"
                            width={300}
                            height={300}
                        />
                    </div>
                    <h2 className="text-center m-2 header-subtitle">
                        {" "}
                        View Schedule{" "}
                    </h2>
                    <p className="text-center text-muted">
                        {" "}
                        View the current schedule for your store
                    </p>
                    <div className="tile-icon  text-center">
                        <a
                            className="btn header-action btn-lg m-4 mx-auto w-50"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            href="/dashboard/schedule/view/"
                        >
                            <span> View Schedule</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 *
 *  @component : EditScheduleCard
 *
 *
 * @purpose: inorder to render the edit schedule card
 *
 */

export const EditScheduleCard = (props) => {
    return (
        <div className="col-md-4">
            <div className="tile">
                <div className="tile-content">
                    <div className="mx-auto text-center">
                        <img
                            src="/img/SVG/schedule_event.svg"
                            className="mx-auto"
                            width={300}
                            height={300}
                        />
                    </div>
                    <h2 className="text-center m-2 header-subtitle">
                        {" "}
                        Edit Schedule{" "}
                    </h2>
                    <p className="text-center text-muted">
                        {" "}
                        Edit existing schedule's for your store
                    </p>
                    <div className="tile-icon  text-center">
                        <a
                            className="btn header-action btn-lg m-4 mx-auto w-50"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            href="/dashboard/schedule/edit/"
                        >
                            <span> Edit Schedule</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 *
 *  @component: DeleteScheduleCard
 *
 *
 *
 *  @purpose: inorder to render the delete schedule card
 *
 */

export const DeleteScheduleCard = (props) => {
    return (
        <div className="col-md-4">
            <div className="tile">
                <div className="tile-content">
                    <div className="text-center mx-auto">
                        <img
                            src="/img/errors/empty_schedule.svg"
                            className="mx-auto"
                            width={300}
                            height={300}
                        />
                    </div>
                    <h2 className="text-center m-2 header-subtitle">
                        {" "}
                        Delete Schedule{" "}
                    </h2>
                    <p className="text-center text-muted">
                        {" "}
                        Delete the current schedule for your store
                    </p>
                    <div className="tile-icon  text-center">
                        <a
                            className="btn header-action btn-lg m-4 mx-auto w-50"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            href="/dashboard/schedule/delete/"
                        >
                            <span> Delete Schedule</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 *
 *  @component : LabourCostCard
 *
 * @purpose : inorder to render the labour cost card
 *
 */

export const LabourCostCard = (props) => {
    return (
        <div className="col-md-4">
            {/* add a labour cost tile */}
            <div className="tile">
                <div className="tile-content">
                    <div className="mx-auto text-center">
                        <img
                            src="/img/SVG/money.svg"
                            className="w-auto"
                            width={300}
                            height={300}
                        />
                    </div>

                    <h2 className="text-center m-2 header-subtitle">
                        {" "}
                        Labour Cost{" "}
                    </h2>
                    <p className="text-center text-muted">
                        {" "}
                        View your store's labour cost{" "}
                    </p>
                    <div className="tile-icon  text-center">
                        <a
                            className="btn header-action btn-lg m-4 mx-auto w-50"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                            href="/dashboard/schedule/labour/"
                        >
                            <span> Labour Cost</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
