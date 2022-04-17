/**
 *
 *  @file: Dashboard.home.jsx
 *
 *
 *  @purpose : inorder to render the home splash screen for the dashboard
 *
 */



import react from "react";
import reactDOM from "react-dom";

import { ContactNavbar} from "../components/dashboard/contactsNavbar";
import { ContactsTable } from "../components/dashboard/contacts/contact.table";
import { ScheduleLabour } from "../components/dashboard/schedule/schedule.labour";


import { DisplaySchedule } from "../components/dashboard/schedule/core/schedule.viewSchedule";
import { TemplateModal } from "../components/dashboard/recipe/core/template.modal";

/**
 *
 *  @component : DashboardHome
 *
 *
 *  @purpose : inorder to render the dashboard home page. This is the first page that the user sees
 *
 */
export const DashboardHome = (props) => {

    return (
        <div className='container-fluid rm-pm dashboard-content'>
            <div className='row'>
            <div className="row">
                {/* contact navigation bar */}
                <div id='message-box-container'> </div>

                <div className='table-contacts-container'>
                    {/** the code for the splash screen starts here */}
                    {/** add tiles for weather forecast, current labour for today, and current employees in the store */}

                    {/** user welcome message goes here  */}

                    <h1 className="h3 text-center">
                     <span> Welcome </span>
                    <i className="fa fa-home ml-2"></i>
                    </h1>

                    <div className='row'>
                        <div className='col-md-6 mx-auto'>
                                        <ScheduleLabour />
                        </div>
                    </div>


                    <div classNAme='row'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Schedule</h5>
                                <p className="card-text">
                                    {/* current employees goes here */}
                                    <DisplaySchedule />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
    )
}
