import React from "react";

import "./index.css";

const Header = ({ endGame }) => (
  <div className="header-container">
    <p className="title">Coding Practice Revision</p>
    <button className="end-revision button" onClick={endGame}>
      End Rivision
    </button>
  </div>
);

export default Header;
