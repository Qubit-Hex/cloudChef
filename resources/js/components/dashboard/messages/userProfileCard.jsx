/**
 *
 *  @class: UserProfile
 *
 *
 *  @purpose: to render the contact card for the messages page
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import { ChatBoxContainer } from "./chatbox.container";


export class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // inheritanted state from the parent component 
            profileID: this.props.profileID,
            userID: this.props.userID,
            name: this.props.name,
            image: this.props.image,
            role: this.props.role,
            date: this.props.date,
            isActive: this.props.isActive,
            storeID: this.props.storeID,
            
            // state for the component
            token: "my super secret token",
        };
    }

    /**
     * 
     *  @method: renderMessagesPannel
     * 
     *  @purpose: inorder to render the conversation pannel between you and the user.. 
     * 
     * 
     *  
     */

    renderMessagesPannel(e)
    {
        let container = document.getElementById('messagePannel-container');

        if (ReactDOM.unmountComponentAtNode(container)) {
             ReactDOM.hydrate(<ChatBoxContainer 
            user={this.state.name}
            profileImg={this.state.image}
            sharedState={this.state}
            userID={this.state.userID} // this is the hook to the parent component
            token={this.state.token} />, container);
        } else {
            ReactDOM.render(<ChatBoxContainer 
            user={this.state.name}
            sharedState={this.state} // this is the hook to the parent component
            profileImg={this.state.image}
            userID={this.state.userID}
            token={this.state.token} />, container);
        }
       
    }

    
    render() {
        return (
            <div className="card no-margin row p-0" onClick={ (e) => {this.renderMessagesPannel() }}>
                <div className="card-body">
                    <div className="container-fluid contact-hover-action" 
                     onClick={  (e) => {
                             this.renderMessagesPannel
                     }
                     }>
                        <div className="row">
                            <div className="col">
                                
                                <img
                                    src={this.state.image}
                                    alt="employee-icon"
                                    className="profile-img-sm ml-2"
                                />

                                <p>
                                <p className="card-title m-">
                                    {this.state.name}
                                </p>
                                
                                <small className="m-1 text-muted font-italic">
                                    {this.state.role}
                                </small>

                            </p>
                            </div>

                            <div className="col-lg-8 mt-4">
                               
                                {/** is the user Active or is not ? */}
                                <span className="role-badge btn-success ml-lg-4">
                                    {this.state.isActive }
                                </span>

                              

                            </div>

                            
                        </div>

                        {/** Last Message display*/}

                        <div className="row mt-4">

                            <div  className="col ">
                                <small className='text-muted font-italic'> 
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ipsum magnam quaerat eum sunt inventore qui veritatis non commodi temporibus veniam soluta odio, reiciendis consequuntur amet eligendi molestias facilis ea.                                
                                </small>
                            </div>

                        </div>

                      
                    </div>
                </div>

                <div className="card-footer modal-footer">
                    <div className="col">
                        {/** font awesome clock */}
                        <i className="far fa-clock fa-lg"></i>
                        <b className="text-muted h6">
                            {" "}
                            Last Active: {this.state.date}{" "}
                        </b>
                    </div>
                </div>
            </div>

            
        );
    }
}
