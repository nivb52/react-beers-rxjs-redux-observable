export const FETCH_FULFILLED = "FETCH_FULIFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FECTH_DATA";
export const SEARCH = "SEARCH";
export const CANCEL = "CANCEL";
export const RESET = "RESET";
export const PENDING = "PENDING";
export const RESULT_PER_PAGE = "RESULT_PER_PAGE";

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
    type: FETCH_DATA
  };
}

export function search(term) {
  return {
    type: SEARCH,
    payload: term
  };
}

export function selectResultPerPage(number) {
  console.log('select ',number,' results');
  return {
    type: RESULT_PER_PAGE,
    payload: number
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
