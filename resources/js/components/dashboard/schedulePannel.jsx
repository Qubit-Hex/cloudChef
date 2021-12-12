/**
 * 
 * 
 *  @file: schedulePannel.jsx
 * 
 * 
 *  @purpose: This component is used to display the schedule of the user.
 * 
 */


import React, { Component } from 'react';


export class SchedulePannel extends Component {
    constructor(props) {

        super(props);

        this.state = {
            user: this.props.user,

            // WE WILL USE THESE TWO TOKENS TO DISPLAY THE SCHEDULE OF THE USER

            // @BEARER_TOKEN: this is the token that is used to authenticate the user for every request that is made to the database
            // @JWT THIS TOKEN IS USED TO AUTHORIZE THE USER WHAT THEY CAN AND CANNOT DO
            $bearToken: this.props.$bearToken,
            $JWT: this.props.$JWT,
            
            schedule: {
                "Monday": {
                    position: "",
                    start: "",
                    end: "",
                },
                "Tuesday": {
                    position: "",
                    start: "",
                    end: ""
                },
                "Wednesday": {
                    position: "",
                    start: "",
                    end: ""
                },
                "Thursday": {
                    position: "",
                    start: "",
                    end: ""
                },
                "Friday": {
                    position: "",
                    start: "",
                    end: ""
                },
                "Saturday": {
                    position: "",
                    start: "",
                    end: ""
                },
                "Sunday": {
                    position: "",
                    start: "",
                    end: ""
                }
            }
        };
    }


    /**
     * 
     * @fetchScheduleData 
     * 
     * @purpose: This function is used to fetch the schedule data from the database.
     *  
     */

    // we will be using an api key to authenticate the user for every request that is made to the database 
    fetchScheduleData($APIKEY) {


    }


    /**
     * 
     * @method: parseScheduleData 
     * 
     *  @purpose: this function is used to parse the schedule data from the database. and display our views to the user 
     * 
     */

    parseScheduleData(...args) {

    }




    render() {
        return (
            <div className="schedule-pannel">

            </div>

        );

    }
}