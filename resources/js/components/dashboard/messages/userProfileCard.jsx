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
            // dont use state for this component since we are using props REFACTOR THI!!!
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
            render: false,
        };


        // refs

        this.renderMessagesPannel = this.renderMessagesPannel.bind(this);
    }

    /**
     *
     *  @method: renderMessagesPannel
     *
     *  @purpose: inorder to render the conversation pannel between you and the user..
     *
     *
     *   DONT KNOW WHY IT WORKS BUT IT DOES! THIS REMOVE THE ERROR MESSAGE
     */

    renderMessagesPannel(e)
    {
        let container = document.getElementById('messagePannel-container');

        if(container.hasChildNodes())
        {
            ReactDOM.unmountComponentAtNode(container);

            // render the new one
            ReactDOM.render(<div><ChatBoxContainer
                user={this.state.name}
                profileImg={this.state.image}
                sharedState={this.state}
                userID={this.state.userID} // this is the hook to the parent component
                token={this.state.token} /> </div>, container);
        } else {
            ReactDOM.render(<div><ChatBoxContainer
                user={this.state.name}
                profileImg={this.state.image}
                sharedState={this.state}
                userID={this.state.userID} // this is the hook to the parent component
                token={this.state.token} /> </div>, container);
        }
    }


    render() {
        return (
            <div className="card no-margin row p-0" onClick={ (e) => {
                const infoPannel = document.getElementById("mesage-info-node");
                if (infoPannel) {
                    // destroy the display of the info pannel
                    infoPannel.style.display = "none";
                }
                // call our method inorder to render the users conversation pannel
                this.renderMessagesPannel()
            }
                }>
                <div className="card-body">
                    <div className="container-fluid contact-hover-action">
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
                                </small>
                            </div>

                        </div>


                    </div>
                </div>

                <div className="card-footer modal-footer">
                    <div className="col">
                        {/** font awesome clock */}

                    </div>
                </div>
            </div>


        );
    }
}
