/**
 *
 *  class: ShiftRequestInterface
 *
 *  @purpose: inorder to provide a interface to interact with the shift requests
 *            in a more clean way, this class is used to provide a interface to
 *            interact with the shift requests
 *
 *            this class is use to interact with the various features that we will be using
 *            easily extendable and reusable. and all easy to remove if needed.
 *            that is the design goal of this interface.
 */


import React from "react";
import ReactDOM from 'react-dom';
import FetchServiceProvider from "../../../../../lib/fetchServiceProvider";

export class ShiftRequestInterface  {


    // our data that we will be passing on the object of choice
    constructor(data)
    {
        this.pickupShifts = data.pickup;
        this.dropShifts = data.drop;
        this.employees = data.employee;
        this.schedule = data.schedule;
        this.api = new FetchServiceProvider();

        // the shift request that we are going to be working with
        this.mem = data;

        // this a function that will run automatically when the class is called
        (function () {
            // check if the data is valid
            if (this.pickupShifts.length === 0 && this.dropShifts.length === 0) {
                throw new Error('no shifts were found');
            }
        })
    }

    debug = () => {
        return this.mem;
    }

    /**
     *
     *  @method: getEmployeeName
     *
     *  @purpose: to get the name of the employee
     *
     */
     getEmployeeName = (id, employeeList) => {
        for (const employee in employeeList) {
            if (employeeList[employee].id === id) {
                return employeeList[employee].first_name + ' ' + employeeList[employee].last_name;
            }
        }
    }

    /**
     *
     *  @method: convert24HoursTime
     *
     *  @purpose: to convert the time to 12 hours format
     *
     */

    convert24HourTime = (time) => {
        // convert our int into 24 hour time
        const hours = Math.floor(time);
        // first check if our number is less than 10
        if (hours < 10) {
            return '0' + hours + ':00' + "AM";
        } else {
            // check is hours more than 12 ?
            if (hours > 12 ) {
                  return (hours - 12) + ':00 PM';
            } else {
                  return hours + ':00 AM';
            }
          }
    }

    /**
    * @method: getShiftDate
    *
    *  @purpose: to get the date of the shift
    *
    */

    getShiftDate = (year, week, day) => {
        // use this closure to proccess the date and return it
        const getMonthDay = (year, week, day) => {
          // get the month and day based on the week and day
          const month = new Date(year, 0, 1).getDay() === 0 ? 1 : 0;
          // we need it to add the day + 2 to get the correct day not sure why
          // but i fixes it and all the tests run fine.
          const dayOfMonth = (week - 1) * 7 +  (day + 2);
          return new Date(year, month, dayOfMonth);
      }
      // covert this object into a date string
      // remove the time from the date
      const date = getMonthDay(year, week, day).toDateString();

      return date;
  }

    /**
     *
     *  @method: getShift
     *
     *  @purpose: to retrieve the shift object when provided with an id
     *
     */

    getShift = (id, shiftList = this.schedule) => {
        for (const shift in shiftList) {
            if (shiftList[shift].shiftID === id) {
                return {
                        shiftID: shiftList[shift].shiftID,
                        shiftDate: this.getShiftDate(shiftList[shift].year, shiftList[shift].week, shiftList[shift].day),
                        shiftTime: this.convert24HourTime(shiftList[shift].start),
                        shiftEndTime: this.convert24HourTime(shiftList[shift].end),
                }
            }
        }
        // something went wrong so handle the error
        return false;
    }

    /**
     *
     * @method: cleanShifts
     *
     * @purpose: to clean the shifts
     *
     */

    cleanDroppedShifts =  function(droppedShifts = this.dropShifts) {
        for (const shifts in  droppedShifts)
        {
            if (droppedShifts[shifts].length === 0) {
                droppedShifts.splice(shifts, 1);
            }
        }

        return droppedShifts;
    }


    /**
     *
     *  @method: cleanPickupShifts
     *
     *  @purpose: to clean the pickup shifts
     *
     */

    cleanPickupShifts = function (pickupShifts = this.pickupShifts) {
        for (const shift in pickupShifts) {
            if (pickupShifts[shift].length === 0) {
                pickupShifts.splice(shift, 1);
            }
        }
        return pickupShifts;
    }


    /**
     *
     *  @method: mapShiftsRequests
     *
     *  @purpose: to form our data structure that we use to render the shifts
     *
     */

    mapShiftRequests = () => {
        let map = {};
        let droppedShifts = this.cleanDroppedShifts(this.dropShifts);
        let pickupShifts = this.cleanPickupShifts(this.pickupShifts);

        for (const shifts in droppedShifts)
        {
            // requests structure for rendering the table of information.
            let employeeRequest = {

                reason: droppedShifts[shifts].reason,
                dateDropped: new Date(droppedShifts[shifts].date_dropped * 1000),
                shiftID: droppedShifts[shifts].employee_shift_id,
                employeeID: droppedShifts[shifts].employee_id,
                employeeName: this.getEmployeeName(droppedShifts[shifts].employee_id, this.employees),
                approved: droppedShifts[shifts].approved,
                type: 'drop',
                shiftTime: this.getShift(droppedShifts[shifts].employee_shift_id)
            }

            for (const employee in pickupShifts)
            {
                if (employeeRequest.pickupEmployeeID === undefined)
                {
                    employeeRequest.pickupEmployeeID = pickupShifts[employee].employee_id;
                    employeeRequest.pickupEmployeeName = this.getEmployeeName(pickupShifts[employee].employee_id, this.employees);
                    employeeRequest.pickupDate = new Date(pickupShifts[employee].date_picked_up * 1000);
                }
            }

            if (map[droppedShifts[shifts].employee_id] === undefined)
            {
                map[droppedShifts[shifts].employee_id] = [];
            }

            map[droppedShifts[shifts].employee_id].push(employeeRequest);

        }
        // is the map empty
        return Object.keys(map).length === 0 ? false : map;
    }

    /**
     *
     *
     *  @method: AcceptRequest
     *
     *
     *  @purpose: to accept a request
     *
     */
    acceptRequest = (id) => {

        // now lets interact with the request handlers

        let ROUTE = '/api/store/schedule/shift/accept';

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': this.api.getCookie('accessToken')
        }

        let data = {
            'shiftID': id
        }

       return this.api.post(ROUTE, data, headers)
    }


    /**
     * @method: DeclineRequest
     *
     * @purpose: to decline a request.acceptRequest()
     *
     */

    denyRequest = (id) => {

        let ROUTE = '/api/store/schedule/shift/decline';

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accessToken': this.api.getCookie('accessToken')
        }
        // the data we are going to send to the server

        let data = {
            'shiftID': id
        }

        return this.api.post(ROUTE, data, headers)
    }

}
