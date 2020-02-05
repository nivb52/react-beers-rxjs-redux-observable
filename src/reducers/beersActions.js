export const FETCH_FULFILLED = "FETCH_FULIFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FECTH_DATA";
export const SEARCH = "SEARCH";
export const CANCEL = "CANCEL";

// action creator `:
export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function fetchCancel() {
  console.log('fetch cancel action');
  return {
    type: CANCEL
  };
}

export function fetchData() {
  return {
    type: FETCH_DATA
  };
}

export function search(term) {
  return {
    type: SEARCH,
    payload: term
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
