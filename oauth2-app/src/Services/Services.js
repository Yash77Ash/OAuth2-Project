import React from 'react';
import Navbar from '../Navbar/Navbar'; 
import '../Home/home.css'; // Reusing the same CSS for consistency
import './Services.css'; // Add a new CSS file for Service-specific styling
import googleLogo from '../assets/google.png'; 
const Services = () => {
  const services = [
    {
      name: 'Google',
      description:
        'Secure login using Google accounts, providing seamless authentication without sharing passwords.',
      url: 'https://developers.google.com/identity/protocols/oauth2',
      icon: googleLogo
    },
    {
      name: 'Facebook',
      description:
        'Easily log in to applications using Facebook credentials, ensuring fast and secure access.',
      url: 'https://developers.facebook.com/docs/facebook-login/',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    },
    {
      name: 'GitHub',
      description:
        'Authenticate and authorize apps securely with your GitHub account, ideal for developers.',
      url: 'https://docs.github.com/en/developers/apps/building-oauth-apps',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    },
    {
      name: 'Microsoft',
      description:
        'Log in with Microsoft accounts to access enterprise apps and services securely.',
      url: 'https://learn.microsoft.com/en-us/azure/active-directory/develop/',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="main-banner">
    
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h6 className="subheading">Our Services</h6>
              <h2 className="heading">OAuth2 Integration Services</h2>
              <p className="description">
                Discover the OAuth2 providers we support, offering secure and seamless 
                authentication for your applications. Click "Learn More" to explore detailed documentation.
              </p>
            </div>
          </div>

          <div className="row service-list">
            {services.map((service, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <div className="service-card">
                  <img src={service.icon} alt={service.name} className="service-icon" />
                  <h4 className="service-name">{service.name}</h4>
                  <p className="service-description">{service.description}</p>
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </div>
    </>
  );
};

export default Services;
