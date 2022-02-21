/***
 *
 *  @file: printer.dash.jsx
 *
 *
 *
 *  @purpose: inorder to handle kitchen orders and print them out to the screen or a thermal printer
 *
 */





export const KitchenOrders = (props) => {

    return (
        <div className="container dashboard-content">
        <div className="row blackout-effect">
            <div className="kitchen-orders-container">
                {/** make a card system inorder to hold kitchen orders into the system */}
                <div className="card-container col">
                    <div className="card-header">
                        <p> Table 22</p>
                        <p> #Order0 2430-43</p>
                        <p> Order Type: Take Out</p>
                    </div>


                    <div className="card-body">
                        <div className="card-body-content">
                            {/** display each seat at the table  on the kitchen ticket */}
                            <div className="card-body-content-left">
                                <div className="card-body-content-left-header">
                                    <p>Seat 1</p>
                                </div>

                                <div className="card-body-content-left-body">
                                    <div className="card-body-content-left-body-item">
                                        <p>Chicken</p>
                                        <p>1</p>
                                    </div>

                                    <div className="card-body-content-left-body-item">
                                        <p>Chicken</p>
                                        <p>1</p>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}
