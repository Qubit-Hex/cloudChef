/**
 *
 *  @function scheduleGridMenu
 *
 *  @param {object} props - Component props
 *
 *
 */




import React from 'react';
import ReactDOM from 'react-dom';


import { AdminGuard, UserGuard } from '../core/guard';
import * as Menu from './base/menu';

/**
 *
 * @component : ScheduleGridMenu
 *
 * @purpose: inorder to render the home splash screen for the   scheudle dashboard
 *
 */

export const ScheduleGridMenu = (props) => {
    return (
        <div className='row  mx-auto'>

            <div className="row mb-4 mt-4">
                    <h1 className="ml-4 header-subtitle text-center" style={{ fontSize: "2em" }}>Schedule</h1>
                    <small className='text-muted text-center'>
                        Schedule your work, bring success to your team.
                    </small>

                    <div className='mx-auto d-block text-center'>
                        <img src='/img/SVG/time_line.svg' width={300} height={300}/>
                    </div>
                </div>
                <AdminGuard cargo={<Menu.CreateScheduleCard />} />

                <UserGuard cargo={ <Menu.ViewScheduleCard /> } />

                <AdminGuard cargo={<Menu.EditScheduleCard />} />

                <AdminGuard cargo={<Menu.DeleteScheduleCard />} />

                <AdminGuard cargo={<Menu.LabourCostCard /> } />
    </div>
    );
}
