import React from "react";
import "./App.css";

import { connect } from "react-redux";

function App(props) {

  return <div className="App">REACT - by {props.app.name}</div>;
}

export default connect(state => state)(App);
