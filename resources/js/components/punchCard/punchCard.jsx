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
    const [punch, setPunch] = React.useState(false);


    // update that value so that the time is updated every second
    const updatePunchCode = (value) =>
    {

        if (punch === false)  {
            setPunch(value);
        } else{
            setPunch(String(String(punch) + value));
        }
    }


    React.useEffect(() => {
        // update the time in rr every second
        const interval = setInterval(() => {
            setTime(String(new Date().toString()));
        }, 1000);

    }, []);

    return (
        <div className='container-fluid rm-pm dashboard-content'>
            <div className='row'>
                <div className='punch-card-container'>

                    <div className='punch-card-header'>
                        <div className='punch-card-header-text mt-4'>
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}> Please Clock In / Out </h1>
                            <h3 style={{
                                fontSize: '1rem',
                                padding: '20px',
                                border: '1px solid #ccc',
                            }}>{time}</h3>
                        </div>
                    </div>

                    <div className='punch-card-body'>
                        {/** we are now going to display the numbers of the punch card system */}
                        {/** make a clock in keypad69+ */}
                        <div className='punch-card-body-clock-in'>
                            {/** we need to display button for employee to clock in their shift  */}
                            {/** we need buttons from 0 - 9 */}
                            <div className='container-fluid'>
                                <div className='row'>
                                    {/** place holder for the punch in number being entered */}
                                    <div className='col-md-12'>
                                        <div className='punch-card-body-clock-in-number text-center'>
                                            <h1 style={{
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#ccc',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                maxWidth: '100%'
                                            }}>{punch}</h1>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button onClick={
                                                (e) => {
                                                    return updatePunchCode(1);
                                                }
                                            } className='btn btn-primary btn-lg btn-block' >
                                                <h1>1</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button   className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(2);
                                                }
                                            }>
                                                <h1>2</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(3);
                                                }
                                            }>
                                                <h1>3</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(4);
                                                }
                                            }>
                                                <h1>4</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button  className='btn btn-primary btn-lg btn-block'onClick={
                                                (e) => {
                                                    return updatePunchCode(5);
                                                }
                                            }>
                                                <h1>5</h1>
                                            </button>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='punch-card-body-clock-in-button'>
                                                <button className='btn btn-primary btn-lg btn-block' onClick={
                                                    (e) => {
                                                        return updatePunchCode(6);
                                                    }
                                                }>
                                                    <h1>6</h1>
                                                </button>
                                            </div>
                                        </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(7);
                                                }
                                            }>
                                                <h1>7</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(8);
                                                }
                                            }>
                                                <h1>8</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button  className='btn btn-primary btn-lg btn-block' onClick={
                                                (e) => {
                                                    return updatePunchCode(9);
                                                }
                                            }>
                                                <h1>9</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button value={-1} className='btn btn-primary btn-lg btn-block'>
                                                {/** icon to clear input  */}
                                                <h1>
                                                    <i className="fas fa-backspace"></i>
                                                </h1>
                                             </button>

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button value={0} className='btn btn-primary btn-lg btn-block'>
                                                <h1>0</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button value={-2} className='btn btn-primary btn-lg btn-block'>
                                                <h1>
                                                {/** circle x font awesome icon */}
                                                    <i className="fas fa-times"></i>
                                                </h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/** punch in and punch out buttons  */}
                                <div className='row mt-4 '>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block'>
                                                <h1>In</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='punch-card-body-clock-in-button'>
                                            <button className='btn btn-primary btn-lg btn-block'>
                                                <h1> Out </h1>
                                            </button>
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
