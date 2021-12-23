/**
 *
 *  @file: chatbox.messages.jsx
 *
 *
 *
 *  @purpose: to render the chatbox messages in our messages pannel
 */

import react from "react";

import { ChatboxMessageBubble } from "./chatbox.chatBubble";
import FetchServiceProvider from "../../../lib/fetchServiceProvider";
import ReactDOM from "react-dom";

export class ChatboxMessages extends react.Component {
    constructor(props) {
        super(props);

        /**
         *   @blueprint
         *  
         *  user -> userID
         * 
         *  profileImg -> profileImg
         * 
         *  sharedState -> the parents state 
         *
         */

        this.state = {
            user: this.props.user,
            profileImg: this.props.profileImg,
            sharedState: this.props.sharedState,
            userID: this.props.userID,
            token: this.props.token,
            // thos will be used to map the message styling of the user of the message bubbles 
            messageMap: this.props.messageMap,
        };
    }


    /**
     *  
     * @method: getCookie 
     * 
     * 
     * 
     *  @purpose: to get the cookie value via name in a string  
     * 
     *
     */

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * 
     *  @method: componentDidMount
     *  
     * 
     * 
     *  @purpose: to call the fetchChatMessages function to get the messages from the database and update the state 
     * 
     */

    componentDidMount() {
        let API_CALL = this.fetchChatMessages();

        
    }


    /**
     * 
     * @method: generateUniqueColors  
     * 
     * @purpose: to generate a unique color for each unique user in coverstion
     * 
     */

    generateUniqueColors() {

        // modern ui color with some transparency rgb

        const uiColors = [
            "rgba(52, 152, 219,0.7)", // peter river 
            "rgba(41, 128, 185,0.7)", // belize hole
            "rgba(39, 174, 96,0.7)", // nephritis
            "rgba(241, 196, 15,0.7)", // sun flower
            "rgba(231, 76, 60,0.7)", // alizarin
            "rgba(192, 57, 43,0.7)", // pomegranate
            "rgba(0, 98, 102,0.7)", // wisteria
            "rgba(27, 20, 100,0.7)", // midnight blue
        ];

        // generate a random number between 0 and the length of the list of colors
        let randomNumber = Math.floor(Math.random() * uiColors.length - 1);

        let color = uiColors[randomNumber];

        return color;
    }


    /**
     *
     *
     *   @method: fetchChatMessages
     *
     *   @purpose: inorder to fectch our chat messages and render them using our bubble
     *             component
     *
     */

    fetchChatMessages() {
      // change this to use web sockets instead of fetch

        let fetchService = new FetchServiceProvider();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };


        const request = {
            storeID: 1,
            token: this.getCookie('accessToken'), // users token that is logged in  
            userID: this.state.userID,
            requestTime: Date.now(),
        };

      

        /// build the query for our api inorder to get the messages from the database
        let url = `/api/messages/get?storeID=${request.storeID}&token=${request.token}&userID=${request.userID}&requestTime=${request.requestTime}`;
        

        return fetchService.$get(url, headers, (response) => {
            let container = document.getElementById("chatbubble-container");


            // proccess error messages
            if (response.error) {
              return  ReactDOM.render(
                    <div className="col"> 
                        <img src='/img/something_wrong.png' className="img-fluid" width={150}  height={150}  />
                        <b style={{fontWeight: 600}}>Error</b> 
                        <b className='h4'> { response.error }</b>
                       
                    </div>,
                    container
                );
            }

            if (response.message.length === 0) {
                return ReactDOM.hydrate(
                    <div className="col">        
                        <b style={{fontWeight: 700}}> No Messages </b>
                        <img src='/img/SVG/empty_inbox.svg' className="img-fluid" width={100}  height={100}  />
                       
                    </div>,
                    container
                );

            }


            // render the chat bubble of the message component
            if (response.message) {
                // parse out messages boxes
                let chatBubbles = [];

                // maps the user and unique colors in  a map
                let uniqueUserID = [];
                let uniqueUserColor = [];

                for (let i = 0; i < response.message.length; i++) {

                    if (uniqueUserID.includes(response.message[i].userID)) {
                        const index = uniqueUserID.indexOf(response.message[i].userID);

                        chatBubbles.push( <ChatboxMessageBubble
                            key={i}
                            message={response.message[i].message}
                            user={this.state.user}
                            profileImg={this.state.profileImg}
                            sharedState={this.state.sharedState}
                            color={uniqueUserColor[index]}
                            token={this.state.token}
                        />);


                    } else {
                        // map the user ID to the array 
                        uniqueUserID.push(response.message[i].userID);
                        uniqueUserColor.push(this.generateUniqueColors());

                        chatBubbles.push( <ChatboxMessageBubble
                            key={i}
                            message={response.message[i].message}
                            user={this.state.user}
                            profileImg={this.state.profileImg}
                            sharedState={this.state.sharedState}
                            color={uniqueUserColor[uniqueUserColor.length - 1]}
                            token={this.state.token}
                        />);
                    }
                    
                }

                ReactDOM.render(chatBubbles, container);
            }
            });
    }

    render() {
        return (
            <div className="container-chatbox-messages">
                <div className="container-chat-log">
                    <div
                        className="container-fluid chat-bubble"
                        id="chatbubble-container">
                        {this.fetchChatMessages()}
                    </div>

                    {/* end of the chat container section  */}
                </div>
            </div>
        );
    }
}
