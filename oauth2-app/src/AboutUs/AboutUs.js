import React from 'react';
import Navbar from '../Navbar/Navbar'; 
import '../Home/home.css'; // Reusing the same CSS for consistency
import Oauth2_image from "../assets/img/Oauth_logo.png"
const AboutUs = () => {
  return (
    <>
      <Navbar />
      
      <div className="main-banner">
        <div className="container ">
          <div className="row">
            {/* Left Section */}
            <div className="col-lg-6 align-self-center">
              <div className="caption header-text">
                <h6>About Us</h6>
                <h2>Understanding OAuth2</h2>
                <p>
                  OAuth 2.0 is an industry-standard protocol for authorization. 
                  It enables applications to gain limited access to user accounts on an HTTP service, 
                  such as Google, GitHub, or Facebook. It works by delegating user authentication to the service 
                  that hosts the user account and authorizing third-party applications to access the user's account.
                </p>
                <p>
                  With OAuth2, users can grant applications access to their information without sharing credentials. 
                  This makes OAuth2 a popular choice for implementing secure authentication in web and mobile applications.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-4 offset-lg-2">
              <div className="right-image">
                {/* You can add an image here, e.g., an OAuth2 diagram */}
                {/* Example: */}
                <img src={Oauth2_image} alt="OAuth2 Diagram" />
              </div>
            </div>
          </div>
        </div>
      </div>    
    </>
  );
};

export default AboutUs;
