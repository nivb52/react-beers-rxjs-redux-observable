import "./beers.css";

import React from "react";
import { connect } from "react-redux";
import { BeerList } from "./BeerList";
import { fetchData, search } from "../reducers/beersActions";

export function Beers({ data, status, fetchData, search }) {
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

        {status === "pending" && (
          <span className="App-spinner">
            <img src={"/loader.gif"} width="50" alt="loading" />
          </span>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeerList beers={data} />
        </div>
      )}
    </>
  );
}

export default connect(state => state.beers, { fetchData, search })(Beers);
