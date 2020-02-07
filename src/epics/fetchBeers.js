import {
  fetchFulfilled,
  FETCH_DATA,
  SEARCH,
  PENDING,
  CANCEL,
  setStatus,
  fetchFailed
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
  delay,
  takeUntil,
} from "rxjs/operators";
import { ofType } from "redux-observable";
// API :
const API = `https://api.punkapi.com/v2/beers`;
const API_SEARCH = term => `${API}?beer_name=${encodeURIComponent(term)}`;
const pending$ = of(setStatus(PENDING));

// ::::::::::::::::
// stream of action functions :
// each function get action$, state$
// ::::::::::::::::

export function fetchBeerEpic(action$) {
  return action$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => {
      return concat(
        pending$,
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
        delay(3000),
        // define CANCEL option:
        takeUntil(CANCEL),
        map(res => fetchFulfilled(res)),
        catchError(error => {
          return of(fetchFailed(error.response));
        })
      );

      // get together : setStatus and the Ajax call
      return race(ajax$) // complete the chain immediately
    })
  );
}


export function resetBeerEpic(action$) {
  return action$.pipe(
    ofType(CANCEL),
    switchMap(() =>
    of(setStatus('IDLE'))
    ))
  }