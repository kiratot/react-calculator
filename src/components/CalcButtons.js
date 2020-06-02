import React from "react";

const CalcButtons = ({ calcUI }) => {
  return (
    <div className="grid-container">
      {calcUI.map((e) => {
        return (
          <div
            key={e}
            className={e === "=" ? `grid-equal` : `grid-${e}`}
            onClick={() => console.log("clicked")}
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default CalcButtons;
