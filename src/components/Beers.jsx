import "./beers.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { BeerList } from "./BeerList";
// STORE :
import { fetchRandom, search, fetchCancel } from "../reducers/beersActions";
import { saveConfig } from "../reducers/optionsActions";
const urlFix = window.location.hostname === 'localhost' ?
'' : '/'+ document.location.href.split('/')[3] + '/'


// ::::::::::::::::::::
// THE COMPONENT  :
export function Beers({
  data,
  status,
  fetchRandom,
  fetchCancel,
  saveConfig,
  search,
  errors,
  OPTIONS
}) {
  //::::::::::
  const { perPage } = OPTIONS.params && OPTIONS.params;
  const itemsPerPage = perPage.split("=")[1] || 10;

  const [termSearching, setTermSearching] = useState(false);
  const [currPage, setPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(itemsPerPage);

  const onSearch = e => {
    search(e.target.value);
    setTermSearching(e.target.value.trim());
  };

  const cancel = () => {
    fetchCancel();
    setTermSearching(false);
  };

  const onSelect = number => {
    setResPerPage(number);
    saveConfig("perPage", number);
  };

  const onChangePage = diff => {
    if (currPage < 2 && diff < 0) return;
    if (resPerPage > data.length && diff > 0) return;

    setPage(page => page + diff);
    saveConfig("page", currPage);
    if (termSearching) search(termSearching);
    else fetchRandom()
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
          hidden={
            status !== "SUCCESS" && status !== "FAILURE" && !termSearching
          }
        >
          { status === "SUCCESS" ? 'reset' :'cancel'}  
        </button>
        <button
          type="button"
          onClick={fetchRandom}
          disabled={status === "PENDING"}
        >
          get rendom beers!
        </button>
      </div>
      {status === "SUCCESS" && (
        <div className="App-content">
          {data && <BeerList beers={data} />}
          <div className="list-pagination">
            <div
              className="change-page"
              onClick={() => onChangePage(-1)}
              hidden={currPage < 2}
            >
              Previous
            </div>
            <div
              className="change-page"
              onClick={() => onChangePage(1)}
              hidden={resPerPage > data.length}
            >
              Next
            </div>
          </div>
        </div>
      )}

      {status === "PENDING" && (
        <span className="App-spinner centered">
          <img src={urlFix+"/beer-loader.gif"} className="beer-loader" alt="loading" />
        </span>
      )}

      {status === "FAILURE" && (
        <div className="App-content centered">
          <p> Oops! {errors && errors[0] && errors[0].message} </p>
        </div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    OPTIONS: state.OPTIONS
  };
}

export default connect(mapState, {
  fetchRandom,
  search,
  fetchCancel,
  saveConfig
})(Beers);
