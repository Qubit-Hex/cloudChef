/**
 * 
 *  @file  chatbox.chatMessages 
 * 
 *  @purpose: to render the chat bubble of the active converstation 
 * 
 */




import react from "react";



import FetchServiceProvider from "../../../lib/fetchServiceProvider";

export class ChatboxMessageBubble extends react.Component {

    constructor(props)
    {

        super(props);


        this.state = {
            name: this.props.name,
            message: this.props.message,
            time: this.props.time,
            color: this.props.color,
            profileImg: this.props.profileImg
        }

    }

    render()
    {
        return (
            <div className="chat-buble-container">

                <div className="row mt-2">
                
                 
                    <div className="convo-user m-1" style={{backgroundColor: this.state.color}}>
                      <i className="fa fa-user-circle-o fa-2x mr-2" aria-hidden="true"></i>   
                       <span> {this.state.message } </span> <br />
                        <small className="text-muted covo-sent-msg">
                           Sent:  {this.state.time}
                        </small>
                    </div>   
                    </div>
                   
            </div>
        );
    }
}