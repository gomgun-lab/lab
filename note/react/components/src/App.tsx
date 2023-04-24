import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { IconCameraPurple, IconHome, IconTone } from "jjan-icon";
import { FaBeer } from "react-icons/fa";

import CustomScrollbar from "./components/CustomScroller/CustomScroller";
import DUMMY from "./components/dummy";

function App() {
  return (
    <div>
      <IconCameraPurple />
      <IconHome />
      <IconTone />
      <FaBeer />
      <div
        style={{
          backgroundColor: "yellow",
        }}
      >
        <div className="circle"></div>
        <div className="circle v2"></div>
      </div>
    </div>
  );
}

export default App;
