import "./beers.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { BeerList } from "./BeerList";
// STORE :
import { fetchData, search, fetchCancel } from "../reducers/beersActions";
import { saveConfig } from "../reducers/optionsActions";

// ::::::::::::::::::::
// THE COMPONENT  : 
export function Beers({
  data,
  status,
  fetchData,
  fetchCancel,
  saveConfig,
  search,
  errors
}) {
  //::::::::::
  const [isSearching, setIsSearching] = useState(false);

  const onSearch = e => {
    search(e.target.value);
    setIsSearching(true);
  };

  const cancel = () => {
    fetchCancel();
    setIsSearching(false);
  };

  const onSelect = number => {
    saveConfig("perPage", number);
  };

  return (
    <>
      <div className="App-inputs centered">
        <select
          name="per-page"
          defaultValue={10}
          onChange={e => onSelect(e.target.value)}
        >
          {Array.from({ length: 10 }, (v, i) => (i + 1) * 5).map(value => {
            return (
              <option key={value} value={value}>
                {value} results
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Search beer"
          onChange={e => onSearch(e)}
        />
        <button
          type="button"
          onClick={() => cancel()}
          hidden={status !== "success" && status !== "failure" && !isSearching}
        >
          cancel
        </button>
        <button
          type="button"
          onClick={fetchData}
          disabled={status === "pending"}
        >
          get some beers!
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
          <p> Oops! {errors && errors[0] && errors[0].text} </p>
        </div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    presist: state.presist
  }
}

export default connect(mapState, {
  fetchData,
  search,
  fetchCancel,
  saveConfig
})(Beers);
