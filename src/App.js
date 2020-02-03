import React from "react";
import "./css/App.css";

import { connect } from "react-redux";
import Beers from "./components/Beers";

function App(props) {
  return (
    <div className="App">
      <div className="centered">
      <h1> Beers App </h1>
      <span className="subtitle">by {props.app.name}</span>
      </div>
      <Beers />
    </div>
  );
}

export default connect(state => state)(App);
