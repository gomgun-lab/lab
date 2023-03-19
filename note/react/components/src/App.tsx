import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import CustomScrollbar from "./components/CustomScroller/CustomScroller";
import DUMMY from "./components/dummy";

function App() {
  return (
    <div>
      <CustomScrollbar>
        <DUMMY />
      </CustomScrollbar>
    </div>
  );
}

export default App;
