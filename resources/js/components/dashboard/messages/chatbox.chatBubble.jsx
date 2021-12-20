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
            message: this.props.message,
            time: this.props.time,
            status: this.props.status,
            profileImg: this.props.profileImg
        }

    }
    
    /**
     * 
     * @method: verifiyMessages
     * 
     *  @purpose: to align the message box wether the user is a senders 
     *            or reciver of the messsages 
     */

    verifyMessages()
    {
        if (this.state.status === 'to') {
            return "convo-user ";
        } else if (this.state.status === 'from') {
            return "convo-recipient ";
        }
    }

    render()
    {
        return (
            <div className="chat-buble-container">

                <div className="row mt-2">
                
                 
                    <div className={this.verifyMessages() + "m-1"}>
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