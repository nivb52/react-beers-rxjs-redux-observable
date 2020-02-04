import { ajax } from "rxjs/ajax";
import {
  catchError,
  map,
  switchMap,
  debounceTime,
  filter
} from "rxjs/operators";
import { of, concat } from "rxjs";
import {
  fetchFulfilled,
  FECTH_DATA,
  SEARCH,
  setStatus,
  fetchFailed
} from "../reducers/beersActions";

import { ofType } from "redux-observable";
const API = `https://api.punkapi.com/v2/beers`;
const searchBeer = term => `${API}?beer_name=${encodeURIComponent(term)}`;

// stream of action
export function fetchBeersEpic(action$) {
  return action$.pipe(
    ofType(FECTH_DATA),
    switchMap(() => {
      return concat(
        of(setStatus("pending")),
        ajax.getJSON(API).pipe(
          map(res => fetchFulfilled(res)),
          catchError(error => {
            console.log("error: ", error.response.message);
            return of(setStatus("failure"), fetchFailed( error.response));
          })
        )
      );
    })
  ); 
}

//added comments for others : but it just same logic as above
export function searchBeerEpic(action$) {
  return action$.pipe(
    ofType(SEARCH),
    // waiting user stop type : 
    debounceTime(500),
    // prevent it from be null :
    filter(({ payload }) => payload.trim() !== ""),
    // free bonus with switchMap : cancel on the fly
    switchMap(({ payload }) => {
      //get together : setStatus and the Ajax call
      return concat(
        of(setStatus("pending")),
        ajax
          .getJSON(searchBeer(payload))
          .pipe(map(res => fetchFulfilled(res)),
          // error handle : 
          catchError(error => {
            return of(setStatus("failure"), fetchFailed( error.response));
          }))
      );
    })
  );
}
