import "./beers.css";

import React from "react";
import { connect } from "react-redux";
import { BeerList } from "./BeerList";
import { fetchData, search } from "../reducers/beersActions";

export function Beers({ data, status, fetchData, search, errors }) {
  return (
    <>
      <div className="App-inputs centered">
        <input
          type="text"
          placeholder="Search beer"
          onChange={e => search(e.target.value)}
        />
        <button
          type="button"
          onClick={fetchData}
          disabled={status === "pending"}
        >
          Get All Beers!
        </button>
      </div>
      {status === "pending" && (
        <span className="App-spinner centered">
          <img src={"/loader.gif"} width="100" alt="loading" />
        </span>
      )}
      {status === "success" && (
        <div className="App-content">
          <BeerList beers={data} />
        </div>
      )}
      {status === "failure" && (
        <div className="App-content centered">
          <p> Oops! {errors && errors[0].text} </p>
        </div>
      )}
    </>
  );
}

export default connect(state => state.beers, { fetchData, search })(Beers);
