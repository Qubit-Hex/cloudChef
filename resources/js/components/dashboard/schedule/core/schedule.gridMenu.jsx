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




export const ScheduleGridMenu = (props) => {
    return (
        <div className='row'>
        {/** add three buttons one for adding a schedule, editing a current schedule and  on for viewing current schedule */}
        <div className='col-md-4'>
            {/** add schedule tile */}
            <div className='tile'>
                <div className='tile-content'>
                    <img src='/img/SVG/time_flatline.svg' width={300} height={300} />
                    <h2 className='text-center m-2 header-subtitle'> Add Schedule </h2>
                    <p className='text-center text-muted'> Add a new schedule to your store</p>
                        <div className='tile-icon  text-center'>
                                <a  className='btn btn-message btn-lg m-4 mx-auto w-50'
                                style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }}

                                href='/dashboard/schedule/add/'>

                                    <span> Create Schedule</span>
                                </a>
                        </div>
                </div>
            </div>
        </div>


        {/** view schedule button */}
        <div className='col-md-4'>
            <div className='tile'>
                <div className='tile-content'>
                    <img src='/img/SVG/schedule_icon_alt.svg' width={300} height={300} />
                    <h2 className='text-center m-2 header-subtitle'> View Schedule </h2>
                    <p className='text-center text-muted'> View the current schedule for your store</p>
                    <div className='tile-icon  text-center'>
                         <a  className='btn btn-message btn-lg m-4 mx-auto w-50'
                                style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }}

                                href='/dashboard/schedule/view/'>

                                    <span> View  Schedule</span>
                                </a>
                        </div>
                </div>
            </div>
        </div>

        {/** edit a schedule  */}
        <div className='col-md-4'>
            <div className='tile'>
                <div className='tile-content'>
                    <img src='/img/SVG/schedule_event.svg' width={300} height={300} />
                    <h2 className='text-center m-2 header-subtitle'> Edit Schedule </h2>
                    <p className='text-center text-muted'> Edit the current schedule for your store</p>
                    <div className='tile-icon  text-center'>
                    <a  className='btn btn-message btn-lg m-4 mx-auto w-50'
                                style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }}

                                href='/dashboard/schedule/edit/'>

                                    <span> Edit Schedule</span>
                                </a>
                        </div>
                </div>
            </div>
        </div>

        {/** delete a schedule  */}

        <div className='col-md-4'>
            <div className='tile'>
                <div className='tile-content'>
                    <img src='/img/errors/empty_schedule.svg' width={300} height={300} />
                    <h2 className='text-center m-2 header-subtitle'> Delete Schedule </h2>
                    <p className='text-center text-muted'> Delete the current schedule for your store</p>
                    <div className='tile-icon  text-center'>
                    <a  className='btn btn-message btn-lg m-4 mx-auto w-50'
                                style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }}

                                href='/dashboard/schedule/delete/'>

                                    <span> Delete Schedule</span>
                                </a>
                        </div>
                </div>
            </div>
        </div>


        <div className='col-md-4'>
            {/* add a labour cost tile */}
            <div className='tile'>
                <div className='tile-content'>
                    <img src='/img/SVG/money.svg' width={300} height={300} />
                    <h2 className='text-center m-2 header-subtitle'> Labour Cost </h2>
                    <p className='text-center text-muted'> View your store's labour cost </p>
                    <div className='tile-icon  text-center'>
                    <a  className='btn btn-message btn-lg m-4 mx-auto w-50'
                                style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }}

                                href='/dashboard/schedule/labour/'>

                                    <span> Labour Cost</span>
                                </a>
                        </div>
                </div>
            </div>


        </div>

    <div className='col-md-4'>
        <div className='tile'>
            <div className='tile-content'>
                <img src='/img/SVG/employee_card.svg' width={300} height={300} />
                <h2 className='text-center m-2 header-subtitle'> Schedule Requests </h2>
                <p className='text-center text-muted '> View employees schedule requests </p>
                        <div className='tile-icon  text-center'>
                                <a className='btn btn-message btn-lg m-4 mx-auto w-50' style={ {
                                    color: 'white',
                                    textDecoration: 'none'
                                }} href='/dashboard/schedule/request/'>
                                    <span> Schedule Requests</span>
                                </a>
                        </div>
            </div>
        </div>
    </div>

    </div>
    )
}
