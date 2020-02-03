export const FECTH_FULFILLED = "FETCH_FULIFILLED";
export const SET_STATUS = "SET_STATUS";
export const FECTH_DATA = "FECTH_DATA";
export const SEARCH = "SEARCH";
export const SEARCH_FULFILLED = "SEARCH_FULFILLED";

// action creator :
export function fetchFulfilled(beers) {
  return {
    type: FECTH_FULFILLED,
    payload: beers
  };
}
export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
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
