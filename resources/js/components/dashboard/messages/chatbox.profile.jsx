/**
 * 
 *  #file: chatbox.profile
 * 
 * 
 *  @purpose: display the profile information of the user your are contacting 
 */



import react from "react";

export class ChatboxProfile extends react.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: this.props.name,
            status: this.props.status,
            profileImg: this.props.profileImg

        }
    }

    /**
     * 
     * method: isUserActive 
     * 
     * @purpose: inorder to check if the user is active and display the respective color code bases on the input given 
     * 
     * 
     * 
     */

    isUserActive()
    {
        let activityStatus = this.state.status;

        if (activityStatus === true) {
            return "fa fa-circle online text-success fa-beat";
        }
            return "fa fa-circle online text-danger fa-beat"
        
    }


    /**
     *   
     *  @method: showProfileModal
     * 
     * 
     *  @purpose: inorder to show the profile Modal of the user 
     */

    showProfileModal()
    {

    }


    /**
     *  
     *   @method: showPhoneModal
     *  
     *  
     *  @purpose; inorder to show the phone modal of the specific user 
     * 
     */



    showPhoneModal()
    {

    }


    render()
    {

    return (
        <div className='messagebox-profile-nav'>
            <div className='col-8 m-2'>

                <img
                    src={this.state.profileImg}
                    className="img-fluid profile-img-sm m-4"
                />
                <b> {this.state.name} </b>

                <i className={this.isUserActive()}></i>

            </div>


            <div className='row'>
                <div className='col m-4'>

                    {/**  add a modal window for view the users profile 
 *    when click event happens on the button 
 */}
                    <button
                        className="btn btn-message"
                        onMouseEnter={(e) => {
                            let container =
                                document.getElementsByClassName(
                                    "button-text"
                                )[0];

                            container.innerHTML = "Profile";
                        }}
                        onMouseLeave={(e) => {
                            let container =
                                document.getElementsByClassName(
                                    "button-text"
                                )[1];
                            // the text of the container in order make the text dis apear

                            container.innerHTML = "";
                        }}


                        onClick={this.showProfileModal()}
                    >
                        <i className="fa fa-user-circle">
                            {" "}
                        </i>

                        <div className="hidden-label">
                            <b className="button-text"> </b>
                        </div>
                    </button>
                </div>
                {/* cal, the user button */}

                <div className='col m-4'>

                    {/**
 * @event  -> phone link if the user clicks the phone buttton 
 * 
 */}

                    <button
                        className="btn btn-message"
                        onMouseEnter={(e) => {
                            let container =
                                document.getElementsByClassName(
                                    "button-text"
                                )[1];

                            container.innerHTML = "Phone";
                        }}
                        onMouseLeave={(e) => {
                            let container =
                                document.getElementsByClassName(
                                    "button-text"
                                )[1];
                            // the text of the container in order make the text dis apear

                            container.innerHTML = "";
                        }}

                        onClick={this.showPhoneModal()}
                    >
                        <i className="fas fa-phone"> </i>
                        <div className="hidden-label">
                            <b class="button-text"></b>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    )

}
}