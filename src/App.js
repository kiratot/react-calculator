import React, { useState } from "react";
import "./App.scss";
import Display from "./components/Display";
import CalcButton from "./components/CalcButton";
import { calcUI } from "./calcUI";
function App() {
  // Initial States
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("0");
  const [firstClick, setFirstClick] = useState(false);
  const [firstDecimal, setFirstDecimal] = useState(false);
  const [isNumberAfterOp, setIsNumberAfterOp] = useState(false);

  const isOp = (button) => {
    return button === "+" || button === "-" || button === "x" || button === "/";
  };
  const isDigit = (button) => {
    return !isNaN(button);
  };
  const isEqual = (button) => {
    return button === "=";
  };

  const handleDigitPress = (button) => {
    if (!firstClick) {
      //prevents chains of "0"s at begining of the interaction
      if (button === "0") setDisplay1("0");
      else {
        setDisplay1(button);
        setDisplay2(button);
        //we know that the user is no longer on his first interaction
        setFirstClick(true);
      }
    } else {
      setDisplay1((prevState) => {
        if (
          isOp(prevState.slice(-2, -1)) &&
          prevState.slice(-1) === "0" &&
          button === "0"
        ) {
          setDisplay2("0");
          return prevState;
        } else if (
          isOp(prevState.slice(-2, -1)) &&
          prevState.slice(-1) === "0" &&
          button !== "0"
        ) {
          setDisplay2(button);
          return prevState.slice(0, -1) + button;
        } else {
          setDisplay2((prevState) => {
            //if the last clicked button is an op we return the op's symbol
            if (isOp(prevState.slice(-1))) return button;
            else return prevState + button;
          });
          return prevState + button;
        }
      });
    }
  };
  const handleOpPress = (button) => {
    setFirstDecimal(false);
    if (!firstClick) {
      setDisplay1(button);
      setDisplay2(button);
      setFirstClick(true);
    } else {
      setDisplay1((prevState) => {
        if (isOp(prevState.slice(-1))) return prevState.slice(0, -1) + button;
        else return prevState + button;
      });
      setDisplay2(button);
    }
  };
  const handleDecimalPress = (button) => {
    if (!firstClick) {
      setDisplay1("0.");
      setDisplay2("0.");
      setFirstClick(true);
    } else {
      if (!firstDecimal) {
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
    if (firstClick) {
      let finalResult = "Can't process that, sorry...";
      try {
        finalResult = eval(
          display1.replace(/x/g, "*").replace(/[+*-\/]$/g, "")
        );
      } catch (error) {}
      setDisplay2(finalResult);
      setDisplay1(finalResult);
      setFirstClick(false);
    }
  };
  const handleClearPress = (button) => {
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
