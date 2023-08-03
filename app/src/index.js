import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContainer from "./components/Auth/AuthContainer";
import './fonts/SofiaSans-VariableFont_wght.ttf';
import './fonts/Geologica-VariableFont_CRSV,SHRP,slnt,wght.ttf';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
