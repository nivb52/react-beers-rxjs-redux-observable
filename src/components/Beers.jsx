import "./beers.css";

import React from "react";
import { connect } from "react-redux";
import { BeerList } from "./BeerList";
import { fetchData, fetchCancel, search } from "../reducers/beersActions";

export function Beers({
  data,
  status,
  fetchData,
  fetchCancel,
  search,
  errors
}) {
  //::::::::::
  const doSearch = e => {
    search(e.target.value);
  };

  const cancel = () => {
    fetchCancel();
  };

  return (
    <>
      <div className="App-inputs centered">
        
        <input
          type="text"
          placeholder="Search beer"
          onChange={e => doSearch(e)}
        />
        <button type="button" onClick={() => cancel()}>
          cancel
        </button>
        <button
          type="button"
          onClick={fetchData}
          disabled={status === "pending"}
        >
          get all beers!
        </button>
      </div>
      {status === "pending" && (
        <span className="App-spinner centered">
          <img src={"/loader.gif"} width="100" alt="loading" />
        </span>
      )}
      {status === "success" && (
        <div className="App-content">{data && <BeerList beers={data} />}</div>
      )}
      {status === "failure" && (
        <div className="App-content centered">
          <p> Oops! {errors && errors[0].text} </p>
        </div>
      )}
    </>
  );
}

export default connect(state => state.beers, {
  fetchData,
  fetchCancel,
  search
})(Beers);
