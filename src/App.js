import React, { useState } from "react";
import "./App.scss";
import Display from "./components/Display";
import CalcButtons from "./components/CalcButtons";
import { calcUI } from "./calcUI";
function App() {
  return (
    <main>
      <div className="calc-container">
        <Display />
        <CalcButtons calcUI={calcUI} />
      </div>
    </main>
  );
}

export default App;
