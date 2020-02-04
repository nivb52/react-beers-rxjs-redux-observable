export const FECTH_FULFILLED = "FETCH_FULIFILLED";
export const FECTH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FECTH_DATA = "FECTH_DATA";
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
  return {
    type: CANCEL
  };
}

export function fetchData() {
  return {
    type: FECTH_DATA
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
    type: FECTH_FULFILLED,
    payload: beers
  };
}

export function fetchFailed(error) {
  return {
    type: FECTH_FAILED,
    payload: error
  };
}
