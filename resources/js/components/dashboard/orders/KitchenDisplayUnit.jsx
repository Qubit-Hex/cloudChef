/**
 *
 *
 *  @file: KitchenDisplayContainer.jsx
 *
 *
 *
 *  @purpose:  container for the kitchen display component
 */

import React from "react";
import ReactDOM from "react-dom";

/**
 *
 * @component: TicketItem
 *
 *
 *  @purpose: inorder to render the ticket item
 */

const TicketItem = (props) => {
    // loop through our object and each internal object

    const order = props.order;

    const orderItems = Object.keys(order).map((key, index) => {
        // return all the elements of the array
        return (
            <li className="list-group-item">
                <h1>
                    {" "}
                    <span style={{
                        color: "black",
                        fontWeight: "bold",
                    }}> {order[key].amount}</span>
                    <span style={{
                        color: "dodgerblue",
                        fontWeight: "600"
                    }}> {order[key].item} </span>
                </h1>
                <ul className="kitchen-ticket-body-list-sub">
                     {
                        order[key].subItems.map((subItem, index) => {

                            return (
                                <li style={{
                                    fontWeight: "300",
                                    fontStyle: "italic",
                                }}>
                                   { order[key].subItems[index] }
                                </li>)
                        })}
                </ul>
            </li>
        );
    });

    return <ul className="list-group kitchen-order">{orderItems}</ul>;
};

/**
 *
 * @component: OrderType
 *
 *  @purpose: inorder to display the order type, and the order status
 */
const OrderType = (props) => {
    if (props.type === "dinein") {
        return (
            <div className="kitchen-ticket-type">
                <div className='kitchen-order-stripe'></div>
                <h1> Dine In </h1>
                <div className='kitchen-order-stripe'></div>
            </div>
        );
    } else if (props.type === "takeout") {
        return (
            <div className="kitchen-ticket-type takeout">
                <div className='kitchen-order-stripe'></div>
                <h1> Take Out </h1>
                <div className='kitchen-order-stripe'></div>
            </div>
        );
    } else if (props.type === "delivery") {
        return (
            <div className="kitchen-ticket-type">
                <div className='kitchen-order-stripe'></div>
                <h1> Delivery </h1>
                <div className='kitchen-order-stripe'></div>
            </div>
        );
    }
};

/**
 *
 * @component: TicketTime
 *
 *
 *  @purpose: inorder to render the ticket time, get the time elapsed since ticket was placed
 */
const TicketTime = (props) => {
    const [timeElapsed, setTimeElapsed] = React.useState(0);

    return (
        <div className="kitchen-ticket-time">
            <h1> {timeElapsed} </h1>
        </div>
    );
};

/**
 *
 * @component: TableSettings
 *
 *  @purpose: inorder to display the table name, and the number of people in the table, and the number of items in the table and server name
 */
const TableSettings = (props) => {

    // set the time object
    const [time, setTime] = React.useState(new Date().getHours()
    + ":" + new Date().getMinutes() +
    ":" + new Date().getSeconds());


    // update the time server second that the ticket was placed
    React.useEffect(() => {
        // update the time every second
        const interval = setInterval(() => {
            setTime(new Date().getHours()
                + ":" + new Date().getMinutes() +
                ":" + new Date().getSeconds())
        }, 1000);
    }, []);


    return (
        <div className="kitchen-ticket-settings">
            <div className='seperate d-flex'>
                <p className='m-1'> Table# {props.tableID} </p>
                <p className='m-1'> Seats {props.Guests} </p>
            </div>

            <div classNAme='seperate d-flex'>
                 <p className='m-1'> Server: {props.serverName} </p>
                 <p className='m-1'> { time }</p>
            </div>

        </div>
    );
};

/**
 *
 *  @component: KitchenTicket
 *
 *
 *  @purpose: inorder to display the ticket, and the order type, and the time elapsed since ticket was placed
 *
 */

const KitchenTicket = (props) => {



    // check to see if the order is complete.

    const [Error, setError] = React.useState(false);
    const [orderState, setOrderState] = React.useState(false);

    const randomUIColour = () => {
        // give me some modern ui colours
        const colors = [
            // dark blue, dark red, dark green, dark yellow, dark purple, dark orange, dark pink, dark grey
            "#2c3e50",
            "#c0392b",
            "#27ae60",
            "#f39c12",
            "#8e44ad",
            "#d35400",
            "#e74c3c",
            "#3498db",
            "#7f8c8d"
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    React.useEffect( () => {

            // canceled order
            let errorElements = document.getElementsByClassName("kitchen-ticket");



            if (errorElements.length > 0) {

                for (let i = 0; i < errorElements.length; i++) {

                    if (errorElements[i].getAttribute('data-error') == "error") {
                        // start blinking red and blue change the background color
                    } else {
                            setError("The bill has been canceled");
                            // destory the element

                            // trigger modal destroy the animation
                        }
                    }
                }
    }, []);




    return (
        <div className="kitchen-ticket" onKeyDownCapture={
            (e) => {
               console.log(e.key);
            }
        } data-error={true}>
            <div
                className="kitchen-ticket-header"
                style={{ backgroundColor: randomUIColour() }}
            >
                <TableSettings
                    tableID={props.tableID}
                    Guests={props.Guests}
                    serverName={props.serverName}
                />
            </div>
            <div className="kitchen-order-type">
                <OrderType type={props.type} />
            </div>

            <div className="kitchen-ticket-body">
                <TicketItem order={props.order} />
            </div>


            <div className='kitchen-ticket-footer'>
                <h1 className='text-danger'> { Error } </h1>
            </div>
        </div>
    );
};

export const KitchenDisplayUnit = (props) => {
    // choose random colours for the header

    const tableOrder = {
        0: {
            item: "Chicken",
            subItems: ["HALF FRYS HALF SALAD NO DRESSING", "Fries", "Ceaser Salad"],
            amount: "1",
        },
        // GENERATE SOME FAKE ORDERS FOR TESTING
        1: {
            item: "60Z STEAK",
            subItems: ["COOK MEDIUM", "FRIES", "ALASKA SALAD"],
            amount: "1",
        },

        2: {
            item: "60Z STEAK",
            subItems: ["ALASKA SALAD"],
            amount: "1",
        }
    };

    // make three fake orders and varrying sizes

    const fakeOrder2 = {
        0: {
            item: "Chicken",
            subItems: ["HALF FRYS HALF SALAD NO DRESSING", "Fries", "Ceaser Salad"],
            amount: "1",
        },
    };

    const fakeOrder3 = {

        0: {
            item: "Chicken",
            subItems: ["HALF FRYS HALF SALAD NO DRESSING", "Fries", "Ceaser Salad"],
            amount: "1",
        },
        1: {
            item: "60Z STEAK",
            subItems: ["COOK MEDIUM", "FRIES", "ALASKA SALAD", "ALASKA SALAD"],
            amount: "1",
        },

        2: {
            item: "60Z STEAK",
            subItems: ["ALASKA SALAD"],
            amount: "1",
        }
    };


    return (
        <div className="kitchen-display-unit">
            <div className="kitchen-ticket-container">

            <KitchenTicket
                    order={tableOrder}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />

<KitchenTicket
                    order={fakeOrder3}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />

<KitchenTicket
                    order={fakeOrder2}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />


<KitchenTicket
                    order={fakeOrder3}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />

            <KitchenTicket
                    order={tableOrder}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />

<KitchenTicket
                    order={fakeOrder3}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />

<KitchenTicket
                    order={fakeOrder2}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />


<KitchenTicket
                    order={fakeOrder3}
                    type={"dinein"}
                    tableID={"#D22"}
                    Guests={"4"}
                    serverName={"John DOE"}
                />
                <KitchenTicket
                        order={tableOrder}
                        type={"dinein"}
                        tableID={"#D22"}
                        Guests={"4"}
                        serverName={"John DOE"}
                    />

    <KitchenTicket
                        order={fakeOrder3}
                        type={"dinein"}
                        tableID={"#D22"}
                        Guests={"4"}
                        serverName={"John DOE"}
                    />

    <KitchenTicket
                        order={fakeOrder2}
                        type={"dinein"}
                        tableID={"#D22"}
                        Guests={"4"}
                        serverName={"John DOE"}
                    />


    <KitchenTicket
                        order={fakeOrder3}
                        type={"dinein"}
                        tableID={"#D22"}
                        Guests={"4"}
                        serverName={"John DOE"}
                    />
            </div>

            <nav className="kitchen-bump-bar">


                <button className="btn btn-message w-auto" onClick={() => {
                    console.log("bump up");
                }}>
                    Bump Up
                </button>

                <button className="btn btn-danger w-auto" onClick={() => {
                    console.log("bump down");
                }}>
                    Bump Down
                </button>

                <button className='bump-bar-button w-auto'>
                    <i className="fas fa-angle-left"></i>
                </button>

                <button className='bump-bar-button w-auto'>
                    <i className="fas fa-angle-right"></i>
                </button>

                <button className='bump-bar-button w-auto'>
                    <i className="fas fa-angle-up"></i>
                </button>

                <button className='bump-bar-button w-auto'>
                    <i className="fas fa-angle-down"></i>
                </button>

                <button className='bump-bar-button w-auto'>
                    <i className="fas fa-angle-double-up"></i>
                </button>


            </nav>

            {/** put control bar here */}
        </div>
    );
};
