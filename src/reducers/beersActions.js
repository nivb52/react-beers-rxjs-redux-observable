export const FETCH_FULFILLED = "FETCH_FULIFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const FETCH_DATA = "FECTH_DATA";
export const SET_STATUS = "SET_STATUS";
// STATUS :
export const SEARCH = "SEARCH";
export const CANCEL = "CANCEL";
export const RESET = "RESET";
export const PENDING = "PENDING";
// CONFIG :
export const CONFIG = "CONFIG";
export const OPTIONS = {};
OPTIONS.perPage = "perPage";

// :::::::::::::::::::::::::::::::::::
// action creator :
export function search(term) {
  return {
    type: SEARCH,
    payload: term
  };
}

export function presistConfig(key,value = null) {
  return {
    type: CONFIG,
    payload: [key,value]
  };
}

export function fetchFulfilled(beers) {
  return {
    type: FETCH_FULFILLED,
    payload: beers
  };
}

export function fetchFailed(error) {
  return {
    type: FETCH_FAILED,
    payload: error
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function fetchCancel() {
  return {
    type: CANCEL
  };
}

export function fetchData() {
  return {
    type: FETCH_DATA
  };
}
