import React from "react";
import { connect } from "react-redux";
import {BeerList} from "./BeerList";
import { fetchData } from "../reducers/beersActions";
import './beers.css';

export function Beers({ data, status, fetchData}) {
  return (
    <>
      <div className="App-inputs">
        <button
          type="button"
          onClick={fetchData}
          disabled={status === "pending"}
        >
          Fetch Beers!
        </button>

        {status === "pending" && (
          <span className="App-spinner">
            <img src={"/loader.gif"} width="50" alt="loading" />
          </span>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeerList beers={data}/>
        </div>
      )}
    </>
  );
}

export default connect(state => state.beers, {fetchData})(Beers);