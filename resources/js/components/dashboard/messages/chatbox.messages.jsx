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


//  OUR BROADCASTING CLASSES

import { BroadcastChatProvider } from "../../../lib/connection/BroadcastChatProvider";


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

        // dont know why this is here but it is needed for now 
        let API_CALL = this.fetchChatMessages();


        this.startChatBroadcast();

        
    }


    /**
     * 
     * @method: generateUniqueColors  
     * 
     * @purpose: to generate a unique color for each unique user in coverstion
     * 
     */

    generateUniqueColors() {

        // modern ui color with some transparency
        const uiColors = [
            "rgba(52, 152, 219,0.1)", // peter river 
            "rgba(41, 128, 185,0.1)", // belize hole
            "rgba(39, 174, 96,0.1)", // nephritis
            "rgba(241, 196, 15,0.1)", // sun flower
            "rgba(231, 76, 60,0.1)", // alizarin
            "rgba(192, 57, 43,0.1)", // pomegranate
            "rgba(0, 98, 102,0.1)", // wisteria
            "rgba(27, 20, 100,0.1)", // midnight blue
        ];

        // generate a random number between 0 and the length of the list of colors
        let randomNumber = Math.floor(Math.random() * uiColors.length - 1);

        let color = uiColors[randomNumber];

        return color;
    }

    /**
     * 
     * 
     *  @method: fetchProfileName
     * 
     * 
     * @returns string 
     * 
     *
     */


    fetchProfileName = (userID) => {

        let cookie = this.getCookie('accessToken');

        // use a promise to get the profile information 
        // that we so desire 

         function getValues(userID, cookie) {
            let fetchServiceProvider = new FetchServiceProvider();
            let data = [];

            let headers = {
                "Content-Type": "application/json",
                "accessToken": cookie,
            };

            // return a promise inorder for us to use the .then method
            // when we need to access the data

            // tried some other methods but this is simplest way that works looks hacky but works
            return new Promise((resolve, reject) => {
                fetchServiceProvider.$get(`/api/members/find/?id=${userID}`, headers, (response) => {
                   return resolve(response);
                });
            });

        }

        return getValues(userID, cookie);
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

                    /**
                     *  @important: please note that the user parm is a promise 
                     *              that will be resolved in the chat bubble component
                     *  
                     *              incase they is some cofusions with anyone that is reading this code
                     */

                    if (uniqueUserID.includes(response.message[i].userID)) {
                        const index = uniqueUserID.indexOf(response.message[i].userID);

                        chatBubbles.push( <ChatboxMessageBubble
                            key={i}
                            message={response.message[i].message}
                            user={this.fetchProfileName(response.message[i].userID)}
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
                            user={this.fetchProfileName(response.message[i].userID)}
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
    
    /**
     * 
     * @method: startChatBroadcast  
     * 
     *  @purpose: inorder to start the chat broadcast use long polling 
     *            to get the messages from the database and update the chat in real time 
     */

    startChatBroadcast() {

        // load our chat interface object 

        let BroadcastChat = new BroadcastChatProvider();

        // form our connection object 

        const requestObject = {
            url: `/api/messages/get?storeID=${this.state.storeID}&token=${this.state.token}&userID=${this.state.userID}&requestTime=${Date.now()}`,
            // no need to pass the headers as we are using the long polling method
        }

        // check our connection using the state of the provider 

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
