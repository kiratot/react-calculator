import React from "react";

const Display = ({ display1, display2 }) => {
  return (
    <div id="display">
      <div className="display-container">
        <div>{display1} </div>
        <div> {display2}</div>
      </div>
    </div>
  );
};

export default Display;
