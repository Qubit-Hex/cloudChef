/**
 *
 *  @component punchCard
 *
 *
 *  @purpose: to render the punch card component for employees to punch in and out
 *
 */


import React from "react";
import ReactDOM from "react-dom";



export const PunchCard = (props) => {

    const [time, setTime] = React.useState(String(new Date()));

    React.useEffect(() => {
        // update the time in rr every second
        const interval = setInterval(() => {
            setTime(String(new Date().toString()));
        }, 1000);

    }, []);

    return (
        <div className='container-fluid rm-pm dashboard-content'>
        <div className='row'>
          <div className="row">
            {/* contact navigation bar */}
            <div className='punchcard-container'>
                {/** card a punch card keypad for employees clocking */}
                <div className='card-punch-container'>
                    <div className='card-punch-container-header'>
                        <div className='card-punch-container-header-title'>
                            <h3 style={{
                                fontWeight: 600,
                                textAlign: 'center',
                            }}>Punch Card</h3>
                        </div>
                        <div className='card-punch-container-header-time'>
                            <p style={{
                                textAlign: 'center',
                            }}>{time}</p>
                        </div>

                        <div className='card-punch-container-code'>
                            <p style={{
                                textAlign: 'center',
                            }}>{props.code}</p>
                        </div>
                    </div>
                    <div className='card-punch-container-body'>
                        <div className='container'>
                            <div className='row center'>
                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 0</button>
                                    </div>
                                </div>

                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 1</button>
                                    </div>
                                </div>

                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 2</button>
                                    </div>
                                </div>
                            </div>

                            <div className='row center'>
                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 3</button>
                                    </div>
                                </div>

                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 4</button>
                                    </div>
                                </div>

                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 5</button>
                                    </div>
                                </div>
                            </div>

                            <div className='row center'>
                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 6</button>
                                    </div>
                                </div>

                                <div className='col-sm-2 punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 7</button>
                                    </div>
                                </div>

                                <div className='col-sm-2  punch-tile'>
                                    <div className='card-punch-container-body-clock-button'>
                                        <button> 9</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );

}
