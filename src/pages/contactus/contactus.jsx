import React from "react";
import "./contactus.scss";

const ContactUs = () => {
  return (
    <div className="contactus">
      <div className="contact-header">
        <div className="header-text">
          <h1>Get in touch</h1>
          <p>
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us.
          </p>
        </div>
        <div className="header-image">
        </div>
      </div>
      <div className="contact-options">
        <div className="option">
          <div className="icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h2>Talk to Sales</h2>
          <p>
            Interested in our software? Just pick up the phone to chat with a
            member of our sales team.
          </p>
          <a href="tel:+60172836307">+60172836307</a>
        </div>
        <div className="option">
          <div className="icon">
            <i className="fas fa-comments"></i>
          </div>
          <h2>Contact Customer Support</h2>
          <p>
            Sometimes you need a little help from your friends. Or a support
            rep. Don’t worry… we’re here for you.
          </p>
          <button>Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
