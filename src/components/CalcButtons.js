import React from "react";

const CalcButtons = ({ id, className, button, setCount }) => {
  return (
    <div className={className} id={id} onClick={setCount(button)}>
      {button}
    </div>
  );
};

export default CalcButtons;
