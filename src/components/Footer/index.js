import React from "react";

import "./index.css";

const Footer = ({ onClickPrevious, onSubmitCodingPractice, onClickNext }) => (
  <div className="footer-container">
    {/* <button className="button footer-btn" onClick={() => localStorage.clear()}>
      Clear
    </button> */}
    <button className="button footer-btn" onClick={onClickPrevious}>
      Previous
    </button>
    <button className="button footer-btn" onClick={onSubmitCodingPractice}>
      Submit Coding Practice
    </button>
    <button className="button footer-btn" onClick={onClickNext}>
      Next
    </button>
  </div>
);

export default Footer;
