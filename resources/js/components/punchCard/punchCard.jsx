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
import { QRCode } from "../../lib/qrCode";


export const PunchCard = (props) => {

    // display date as day nonth and am or pm

    const [time, setTime] = React.useState(String(new Date()));
    const [punch, setPunch] = React.useState(false);
    const [punchError, setPunchError] = React.useState(false);

    // update that value so that the time is updated every second
    const updatePunchCode = (value) =>
    {

        if (punch === false)  {
            setPunch(value);
        } else{
            // check the length of the punch code
            if (punch.length === 4) {
                // trigger error message
                setPunchError("Punch code is not valid");
            } else {
                // reset the error message
                setPunchError(false);
                setPunch(String(String(punch) + value));
            }
        }
    }

    // clear the punch code
    const clearPunchCode = () => {
        setPunch(false);
    }


    // remove the last character from the punch code
    const removeLastCharacter = () => {
        let newPunch = String(punch);
        // does the punch code have a value ?
        if (newPunch.length > 0 && punch !== false) {


        newPunch = newPunch.substring(0, newPunch.length - 1);
        setPunch(newPunch);
        }
    }


    React.useEffect(() => {
        // update the time in rr every second
        const interval = setInterval(() => {
            setTime(String(new Date().toString()));
        },  35000);

    }, []);

    return (
        <div className="container dashboard-content">
            <div className="row blackout-effect">
                <div className="punch-card-container">
                    {/** have the company logo and such on left
                     *  and have the keypad on the right
                     */}

                    <div className="col-md-3">
                        <div className="punch-card-header">
                            <div className="blob image-badge">
                                <img
                                    className="img-fluid"
                                    src="/img/restaurant-outline.svg"
                                />
                                {/** company's saying  */}
                            </div>

                            <div className="company-name">
                                <span
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {" "}
                                    {
                                        "Cloud Chef let the cloud do the heavy lifting. "
                                    }
                                </span>
                            </div>

                            <div className="punch-card-header-text mt-4">
                                <h1
                                    className="text-center"
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {/** user tie */}
                                    <i className='fas fa-user-tie'></i>
                                    Sign In
                                </h1>

                            </div>

                            <div className="punch-card-body-clock-in-number text-center">
                                <h1
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        padding: "10px",
                                        borderRadius: "5px",

                                        maxWidth: "100%",
                                    }}
                                    className="fade-in"
                                ></h1>
                                    {" "}
                                    {/** keyboard icon */}

                                    {/** two buttons one is sign in with qr code */}
                                    <button onClick={
                                        (e) => {
                                            // push a qr code to the user
                                            let container = document.getElementById('qr-code-container');
                                            let punchCardContainer = document.getElementById('punch-code-container');

                                            // use the google api to get a qr  code
                                            ReactDOM.render(
                                                <div>
                                                    {
                                                        // this will just share a link that the client can to signin to the app
                                                        QRCode.generateTableToken('4', 'somestring', 'somestring')
                                                    }
                                                        <p className='qrcode-subtext'> SCAN TO LOGIN </p>
                                                </div>, container);
                                            // add a pop up animation to our container


                                            // is the punch card container visible ?

                                            if (punchCardContainer.classList.contains('show')) {
                                                punchCardContainer.classList.remove('show');
                                                punchCardContainer.classList.add('hide');
                                                punchCardContainer.classList.add('fade-out');
                                            }


                                            // does the container have the hide class ?
                                            if (container.classList.contains("hide")) {
                                                // remove the hide class
                                                container.classList.remove("hide");
                                                // add the show class
                                                container.classList.add("show", 'qrAnimation');
                                            } else {
                                                // remove the show class
                                                container.classList.remove("show");
                                                // add the hide class
                                                container.classList.add("hide");
                                            }



                                            container.classList.add('qrAnimation');

                                            

                                        }
                                    }>
                                        <i className="fas fa-qrcode"></i>
                                        QR CODE SIGN IN
                                    </button>

                                    <button onClick={
                                        (e) => {
                                            const container = document.getElementById('punch-code-container');
                                            const qrCodeContainer = document.getElementById('qr-code-container');

                                            //  check is qrCode container has the hide class
                                            if (qrCodeContainer.classList.contains("show")) {
                                                // remove the show class
                                                qrCodeContainer.classList.remove("show", 'qrAnimation');
                                                // add the hide class
                                                qrCodeContainer.classList.add("hide");
                                            }


                                           // does the container have the hide class ?
                                            if (container.classList.contains('hide')) {
                                                // remove the hide class
                                                container.classList.remove('hide');
                                                container.classList.add('show', 'fade-in');
                                            } else {
                                                // hide the element if the user click the button again
                                                container.classList.add('hide');
                                                container.classList.remove('show', 'fade-in');
                                            }
                                        }
                                    }>
                                        <i className="fas fa-keyboard"></i>
                                        PUNCH CODE SIGN IN
                                    </button>

                                    {/** next is sign in with code */}




                            </div>
                        </div>
                    </div>

                    {/*** qr code sign in  */}
                    <div className='punch-card-body hide' id='qr-code-container'></div>

                    <div className="punch-card-body hide" id='punch-code-container'>


                        <div className="employee-punch-code">
                            <p>
                                {/** BLINKING CURSOR FONT AWESOME */}
                                <i className="fa-solid fa-caret-right fa-beat"></i>
                                {punch}</p>
                            <p className='text-danger'> { punchError }</p>
                           </div>
                        {/** we are now going to display the numbers of the punch card system */}
                        {/** make a clock in keypad69+ */}
                        <div className="punch-card-body-clock-in fade-in">
                            {/** we need to display button for employee to clock in their shift  */}
                            {/** we need buttons from 0 - 9 */}
                            <div className="container-fluid mt-2">
                                <div className="row">
                                    {/** place holder for the punch in number being entered */}

                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button
                                                onClick={(e) => {
                                                    return updatePunchCode(1);
                                                }}

                                            >
                                                <h1>1</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(2);
                                                }}
                                            >
                                                <h1>2</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(3);
                                                }}
                                            >
                                                <h1>3</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(4);
                                                }}
                                            >
                                                <h1>4</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(5);
                                                }}
                                            >
                                                <h1>5</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(6);
                                                }}
                                            >
                                                <h1>6</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(7);
                                                }}
                                            >
                                                <h1>7</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(8);
                                                }}
                                            >
                                                <h1>8</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(9);
                                                }}
                                            >
                                                <h1>9</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return removeLastCharacter();
                                                }}
                                            >
                                                {/** icon to clear input  */}
                                                <h1>
                                                    <i className="fas fa-backspace"></i>
                                                </h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return updatePunchCode(0);
                                                }}
                                            >
                                                <h1>0</h1>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button

                                                onClick={(e) => {
                                                    return clearPunchCode()
                                                }}
                                            >

                                                <h1>
                                                    <i className="fas fa-times"></i>
                                                </h1>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/** punch in and punch out buttons  */}
                                <div className="row">
                                    <div className="col">
                                        <div className="punch-card-body-clock-in-button">
                                            <button className='btn-signin' onClick={(e) => {
                                            }}>
                                                <h1>IN</h1>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="punch-card-body-clock-in-button">
                                            <button className='btn-signout'  onClick={(e) => {
                                                return punchOut();
                                            }}>
                                                <h1>OUT</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/** large semi transparent loading screeen */}
            <div className="loading-screen-container">
                <div className="loading-screen">
                    <div className="loading-screen-text">
                        <h1>Loading...</h1>
                        {/** fa awesome loading icon */}
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            </div>
        </div>
    );

}
