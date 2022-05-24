import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-address-card"></i>
            </div>
            <h5>Events Venue</h5>
            <p>Events at this place</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-calendar"></i>
            </div>
            <h5>Events Organized</h5>
            <p>You are invited on this events</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-bookmark"></i>
            </div>
            <h5>Reserved Events</h5>
            <p>Reserved for your events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
