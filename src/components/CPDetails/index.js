import React from "react";

import "./index.css";

const CPDetails = ({ currentCPDetails }) => (
  <div className="concepts-list cp-details-container">
    <img src={currentCPDetails.gif_url} alt="gif" width="300" />
    <h1 className="cp-title">{currentCPDetails.name}</h1>
    <a href={currentCPDetails.portal_url} target="_blank">
      Learning Portal Link
    </a>
  </div>
);

export default CPDetails;
