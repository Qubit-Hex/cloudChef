/***
 *
 *
 *  @file: schedule.delete.jsx
 *
 *  @purpose: inorder to delete current schedules in the system  and delete the details of the schedules '
 *
 */



 import React from "react";
 import ReactDOM from "react-dom";


 import * as Alerts from "../../../base/notification";
 import { ScheduleTable } from "./core/ScheduleTable";
 import FetchServiceProvider from "../../../lib/fetchServiceProvider";
 import { ModalDeleteSchedule } from "./core/Modal.deleteSchedule";

 export const DeleteSchedules = (props) => {

     const [schedules, setSchedules] = React.useState([]);
     const [employee, setEmployee] = React.useState([]);

     const request = async() => {
         const api = new FetchServiceProvider();
         const route = '/api/store/schedule/get';

         const headers = {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'accessToken': api.getCookie('accessToken')
         };

         return await api.get(route, headers);
     }

     // format a date range by providing a week number and year
     const formatDateRange = (week, year) => {
         const date = new Date(year, 0, 1 + (week - 1) * 7);
         const date2 = new Date(year, 0, 1 + week * 7);
         const month = date.toLocaleString('default', { month: 'long' });
         const month2 = date2.toLocaleString('default', { month: 'long' });
         const day = date.toLocaleString('default', { day: 'numeric' });
         const day2 = date2.toLocaleString('default', { day: 'numeric' });
         const dateRange = `${month} ${day} - ${month2} ${day2}`;
         return dateRange;
     }




     // PREFORM the api call to get the schedules
     React.useEffect(() => {
         request().then(response => {
             console.log(response);
             if (response.status === 200 || response.status === 'success') {
                 setSchedules(response.data);
                 setEmployee(response.employee);
             } else {
                 const container = document.getElementById('schedule-table');
             }
         });

     }, []);


     return (
         <div className="container-fluid mt-4">

         <div className="row">
             <h2 className='header-subtitle text-center'>Delete Schedule</h2>
             <img src='/img/SVG/schedule_icon.svg' width={250} height={250} />
             <p className="text-center text-muted">Edit the current schedule for your store</p>
         </div>

         <div className='col-md-6 mx-auto'>
             {/** select schedule */}
             <div className='col-sm mx-auto'>
                 <select className='form-select' id='datePicker'>
                     <option> Please Select a Schedule</option>
                     {
                         schedules.map((schedule, index) => {
                             return (
                                 <option key={index} value={schedule.id} style={{
                                     fontWeight: 500,
                                 }}>{ schedule.year + "  " + formatDateRange(schedule.week, schedule.year) }</option>
                             )
                         })
                     }
                 </select>

                 <button className='btn header-action btn-lg w-100' onClick={
                     (e) => {
                         const scheduleId = document.getElementById('datePicker').value;
                         const container = document.getElementById('modal-container');
                         const employeeID = employee.id;

                         // SENDS THE SCHEDULE ID TO THE MODAL
                         return ReactDOM.render(<ModalDeleteSchedule scheduleId={scheduleId} employeeID={employeeID} />, container);
                     }
                 }>
                        <i className="fas fa-trash-alt"></i>
                        <span className='ml-2'>Delete Schedule</span>
                 </button>
             </div>
         </div>

         <div className='row mt-4 mx-auto' id='schedule-table-container'>
             {/** container to view the schedules inside of the system */}
         </div>

         </div>

     )
 }

