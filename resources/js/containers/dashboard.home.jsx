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

                    <div classNAme='row'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">This Weeks schedule</h5>
                                <p className="card-text">
                                    {/* current employees goes here */}
                                </p>
                            </div>
                        </div>
                    </div>



                    <div className='row'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Current Employees</h5>
                                <p className="card-text">
                                    {/* current employees goes here */}
                                </p>
                            </div>
                        </div>
                    </div>


                <div className='row'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Drop shifts </h5>
                            <p className="card-text">
                                {/* drop shifts goes here */}
                            </p>
                            </div>
                        </div>
                </div>


                <div className='row'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Pick up shift store</h5>
                            <p className="card-text">
                                {/* pick up shifts goes here */}
                            </p>
                            </div>
                        </div>
                </div>

                <div className='row'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Notification center</h5>
                            <p className="card-text">
                                {/* notification center goes here */}
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
