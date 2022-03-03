/**
 *
 *  @file: dashboard.advertising.jsx
 *
 *
 *  @purpose:  container for the dashboard component
 *
 */



import { color } from "d3";
import react from "react";
import { ReactDOM } from "react";


export const  DashboardAdvertising = (props) => {

    return (
        <div className="container-fluid profile_card dashboard-content">
        <div className="row">
        <h1 className='header-title' > <b>Advertising</b> <small className='sub-caption ' > Welcome () <br /><span className='text-center'>Post to social media outlets</span> </small></h1>

                <img src='/img/SVG/socialFollowing.svg'  width={300} height={300} />

                <p className="'text-center text-muted" style={
                    {
                        fontSize: '1.5em',
                        marginTop: '1em',
                        color: 'dodgerblue',
                        textAlign: 'center'
                    }
                }>
                    {/** icon to sharing content */}
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                    Connect to all platforms  with just a click. </p>
        </div>
            <div className='row'>
                {/** advertising page to post to social media outlets  */}

                {/** large social icons facebook, tik tok, instagram */}
                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Facebook</h5>
                                    <p className='card-text'>
                                        <i className="fab fa-facebook-square" style={{
                                            fontSize: '3em',
                                            color: '#3b5998'
                                        }}></i>

                                    </p>
                                    <span style={{
                                        fontSize: '0.8em',
                                        color: '#3b5998'
                                    }}>
                                        Facebook is a social networking service where users can post, share, and comment on content.
                                        improve your brand and your business by posting to your page. and keep engagement with your audience high.
                                    </span>


                                    <button className='btn btn-message mt-4'>Post to Facebook</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'> Instagram </h5>
                                    <p className='card-text'>
                                        <i className="fab fa-instagram" style={{
                                            fontSize: '3em',
                                            color: '#3f729b'
                                        }}></i>
                                    </p>
                                    <span style={{
                                        fontSize: '0.8em',
                                        color: '#3f729b'
                                    }}>
                                    Instagram is a photo-sharing platform where you can share photos and videos with your friends.
                                    improve your image and your brand by sharing your photos and videos with your customer base.
                                    </span>

                                    {/** button to post  */}
                                    <button className='btn btn-message btn-sm mt-4'>
                                        <i className="fas fa-share-alt"></i>
                                        Post to Instagram
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'> Tik Tok </h5>
                                    <p className='card-text'>
                                        <i className="fab fa-tiktok" style={{
                                            fontSize: '3em',
                                            color: '#ff0000'
                                        }}></i>
                                        {/** say something about how tik tok will improve your market by connecting to users  */}
                                        <br />
                                    </p>

                                    <span style={{
                                            fontSize: '0.8em',
                                            color: '#ff003e',
                                            marginTop: '2em'
                                        }}>
                                            Tik Tok is a social media platform that allows users to share videos
                                            share videos of your specials, and get more followers. improve your brands image by sharing your products and services.

                                        </span>

                                        <button className='btn btn-message btn-sm mt-4'> Post to Tik Tok  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
