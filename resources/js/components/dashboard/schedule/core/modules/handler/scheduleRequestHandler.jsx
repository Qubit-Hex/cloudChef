/**
 *
 *  @file: scheduleRequestHandler.jsx
 *
 *  @purpose: this component is responsible for handling the schedule requests
 *
 */


import React from "react";
import ReactDOM from 'react-dom';
import FetchServiceProvider from "../../../../../../lib/fetchServiceProvider";

export class ScheduleRequestHandler extends FetchServiceProvider {

    constructor(data, id) {

        super();
        this.shiftID = id;
        this.data = data;
    }

    /**
     *
     *  @method: sendSwapRequest
     *
     *
     *  @purpose: to send the swap request to the server
     */

    sendSwapRequest = () => {

    }

    /**
     *
     * @method: declineRequest()
     *
     * @purpose: to decline the request
     *
     */

    denyRequest = () => {
        console.log(this.shiftID);
        console.log('decline request');

        // run a parl   
    }


    /**
     *
     * @method: acceptRequest()
     *
     *
     * @purpose: to accept the request
     *
     */


    acceptRequest = () => {
        console.log(this.shiftID);
        console.log('accept request');

    }



}
