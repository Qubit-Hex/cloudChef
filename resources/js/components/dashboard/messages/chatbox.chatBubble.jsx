/**
 *
 *  @file  chatbox.chatMessages
 *
 *  @purpose: to render the chat bubble of the active converstation
 *
 */




import react from "react";

export class ChatboxMessageBubble extends react.Component {

    constructor(props)
    {

        super(props);
        this.state = {
            read: false,
            name: '',
        }



    }

    /**
     *   @method: componentDidMount
     *
     *   @purpose: to get the user name of the user who sent the message
     */

    componentDidMount() {
        let user = this.props.user;

        user.then(response => {
            return this.setState({ name: response.data});
        });
    }

    render()
    {
        return (
            <div className="chat-buble-container">

                <div className="row mt-2">


                    <div className="convo-user m-1" style={{backgroundColor: this.props.color}}>
                      <img width={50} height={50} src={this.props.profileImg} alt={this.props.user}/>
                      <span className='text-muted'> {
                          this.state.name
                      }</span> <br/><br/>
                       <span> {this.props.message } </span> <br /><br/>

                    </div>
                    </div>
            </div>
        );
    }
}
