import React from "react";
import Navbar from "../Navbar/Navbar";
import "../ContactUs/ContactUs.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      <Navbar />
      <div className="main-banner">
        <div className="container">
          <div className="row">
            {/* Left Section */}
            <div className="col-lg-6">
              <h2 className="contact-heading">Get in Touch</h2>
              <p className="contact-description">
                Have questions about OAuth2 integration or need help with our services? 
                Fill out the form below, and we'll get back to you promptly!
              </p>
              <ul className="contact-details">
                <li>
                  <strong>Email:</strong> support@example.com
                </li>
                <li>
                  <strong>Phone:</strong> +91 123-456-7890
                </li>
                <li>
                  <strong>Address:</strong> Pune
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="col-lg-6">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message Here"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
