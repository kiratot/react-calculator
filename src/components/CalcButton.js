import React from "react";

const CalcButton = ({ className, id, handleDisplay, button }) => {
  return (
    <div className={className} id={id} onClick={() => handleDisplay(button)}>
      {button}
    </div>
  );
};

export default CalcButton;
