import React, { useState } from "react";
import "./App.scss";
import Display from "./components/Display";
import CalcButton from "./components/CalcButton";
import { calcUI } from "./calcUI";
import { isOp, isDigit, isEqual } from "./functions";

function App() {
  // Initial States
  const [display1, setDisplay1] = useState(""); //top display state
  const [display2, setDisplay2] = useState("0"); // bottom display state
  const [firstClick, setFirstClick] = useState(false); // state to grab first interaction or after clearing the displays
  const [firstDecimal, setFirstDecimal] = useState(false); // state to use when the decimal is pressed, resets when the display is cleared or after another op
  const [equalIsPressed, setEqualIsPressed] = useState(false); // state to grap when the user has pressed "="

  const handleDigitPress = (button) => {
    if (!firstClick || equalIsPressed) {
      //prevents chains of "0"s at begining of the interaction
      if (button === "0") setDisplay1("0");
      else {
        setDisplay1(button);
        setDisplay2(button);
        //we know that the user is no longer on his first interaction
        setFirstClick(true);
        setEqualIsPressed(false);
      }
    } else {
      setDisplay1((prevState) => {
        if (
          // prevent chaining of 0's
          isOp(prevState.slice(-2, -1)) &&
          prevState.slice(-1) === "0" &&
          button === "0"
        ) {
          //we want to do the same in our second display
          setDisplay2("0");
          return prevState;
        } else if (
          // [op][0][digit from 1 to 9] we want to delete the 0 and insert the digit
          isOp(prevState.slice(-2, -1)) &&
          prevState.slice(-1) === "0" &&
          button !== "0"
        ) {
          // we also want to set the number in our second display
          setDisplay2(button);
          return prevState.slice(0, -1) + button;
        } else {
          setDisplay2((prevState) => {
            //if the last clicked button is an op we return the op's symbol
            if (isOp(prevState.slice(-1))) return button;
            // else we just want to chain the digits 93471294...
            else return prevState + button;
          });
          // we do the same (chaining digits) for the display1
          return prevState + button;
        }
      });
    }
  };

  const handleOpPress = (button) => {
    setFirstDecimal(false); // we reset the decimal state since a new op is triggered
    if (!firstClick) {
      // we know that the user haven't pressed any digit before so we assume that we should use the 0 as the first operand
      setDisplay1("0" + button);
      setDisplay2("0" + button);
      setFirstClick(true);
    } else {
      // we know that there is a valid number before the current op

      //we use the result of the previous operation and we stop the function execution.
      if (equalIsPressed) {
        setDisplay1(display2 + button);
        setDisplay2(button);
        setEqualIsPressed(false);
        return;
      }
      setDisplay1((prevState) => {
        // we want to check if an op button was pressed before the current one
        if (isOp(prevState.slice(-1))) {
          // we allow minus sign after a multiplication or a division
          if (
            button === "-" &&
            (prevState.slice(-1) === "/" || prevState.slice(-1) === "x")
          )
            return prevState + "-";
          // if the user choose to change to another type of op after chaining "[x or /][-][new op]"
          else if (isOp(prevState.slice(-2, -1)))
            return prevState.slice(0, -2) + button;
          // else we just extract the previous op and insert the new one "[pevOp][newOp]"
          else return prevState.slice(0, -1) + button;
        }
        // if no op was choosen by the user we just append the new op symbol to the string
        else return prevState + button;
      });
      setDisplay2(button);
    }
  };

  const handleDecimalPress = (button) => {
    if (!firstClick || equalIsPressed) {
      setDisplay1("0.");
      setDisplay2("0.");
      setFirstClick(true);
      setEqualIsPressed(false);
    } else {
      // We check if we already pressed the decimal point
      if (!firstDecimal) {
        // We assume thate the user wanted to insert a "0." after the op else we just insert the .
        setDisplay1((prevState) => {
          if (isOp(prevState.slice(-1))) return prevState + "0" + button;
          else return prevState + button;
        });
        setDisplay2((prevState) => {
          if (isOp(prevState.slice(-1))) return "0" + button;
          else return prevState + button;
        });
        setFirstDecimal(true);
      }
    }
  };

  const handleEqualPress = () => {
    setEqualIsPressed(true);
    // We make sure the user has already made an interaction else pressing "=" shouldn't trigger any unecessary calculation.
    if (firstClick) {
      // in case there is any unhandled case in our logic we show a nice message to the user...
      let finalResult = "Can't process that, sorry...";
      try {
        finalResult = eval(
          display1.replace(/x/g, "*").replace(/[+*-\/]$/g, "")
        );
      } catch (error) {}
      setDisplay2(finalResult);
      setDisplay1(display1 + "=" + finalResult);
    }
  };
  const handleClearPress = (button) => {
    // reset every state on clear press
    setEqualIsPressed(false);
    setFirstDecimal(false);
    setFirstClick(false);
    setDisplay1("");
    setDisplay2("0");
  };
  const handleDisplay = (button) => {
    if (button === ".") handleDecimalPress(button);
    if (isDigit(button)) {
      handleDigitPress(button);
    } else if (isOp(button)) {
      handleOpPress(button);
    } else if (isEqual(button)) {
      handleEqualPress();
    } else if (button === "AC") handleClearPress(button);
  };

  return (
    <main>
      <div className="calc-container">
        <Display display1={display1} display2={display2} />
        <div className="grid-container">
          {calcUI.map(({ button, id }) => {
            return (
              <CalcButton
                key={id}
                className={`grid-${id}`}
                id={id}
                button={button}
                handleDisplay={handleDisplay}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
