import {
  fetchFulfilled,
  FETCH_DATA,
  SEARCH,
  CANCEL,
  setStatus,
  fetchFailed,
} from "../reducers/beersActions";
import { of, concat, race } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  map,
  switchMap,
  debounceTime,
  filter, 
  timeout,
} from "rxjs/operators";
import { ofType } from "redux-observable";
// API :
const API = `https://api.punkapi.com/v2/beers`;
const API_SEARCH = term => `${API}?beer_name=${encodeURIComponent(term)}`;

// ::::::::::::::::
// stream of action functions : 
// each function get action$, state$
// ::::::::::::::::


export function fetchBeersEpic(action$) {
  return action$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => {
      return concat(
        of(setStatus("pending")),
        ajax.getJSON(API).pipe(
          map(res => fetchFulfilled(res)),
          timeout(5000),
          catchError(err => {
            return of(fetchFailed(err.response));
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
    filter(({ payload }) => payload.trim() !== ""),
    // free bonus with switchMap : cancel on the fly
    switchMap(({ payload }) => {
      //define Ajax:
      const ajax$ = ajax.getJSON(API_SEARCH(payload)).pipe(
        timeout(5000),
        map(res => fetchFulfilled(res)),
        catchError(error => {
          return of(fetchFailed(error.response));
        })
      );
      // define CANCEL option:
      const blocker$ =  
        action$.pipe(ofType(CANCEL)
      );

      //get together : setStatus and the Ajax call
      return concat(
        of(setStatus("pending")),
        race(ajax$, blocker$)
      )
    })
  );
}
