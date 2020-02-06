import {
  fetchFulfilled,
  FETCH_DATA,
  SEARCH,
  PENDING,
  CANCEL,
  fetchFailed,
  setStatus,
  fetchCancel
} from "../reducers/beersActions";
import {OPT} from '../reducers/optionsActions'
// RXJS + REDUX
import { of, concat, race } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  map,
  switchMap,
  debounceTime,
  filter,
  timeout,
  mapTo,
  take,
  withLatestFrom,
  pluck,
  delay
} from "rxjs/operators";
import { ofType } from "redux-observable";
// API :
const API = `https://api.punkapi.com/v2/beers?`;
const API_SEARCH = term => `${API}&beer_name=${encodeURIComponent(term)}`;

// CONST STREAMS
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
export function searchBeerEpic(action$, state$) {
  return action$.pipe(
    ofType(SEARCH),
    // waiting user stop type :
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(pluck("OPTIONS", [OPT.perPage]))),
    // we get action and state and we destructre action to payload
    switchMap(([{ payload }, options]) => {
      //define Ajax:
      const ajax$ = ajax.getJSON(API_SEARCH(payload) + options).pipe(
        // define CANCEL option:
        map(res => fetchFulfilled(res)),
        catchError(error => {
          return of(fetchFailed(error.response));
        })
      );
      const blocker$ = action$.pipe(
        ofType(CANCEL),
        take(1),
        mapTo(fetchCancel())
      );
      // get together : setStatus and the Ajax call
      return race(ajax$, blocker$); // complete the chain immediately
    })
  );
}

export function resetBeerEpic(action$) {
  return action$.pipe(
    ofType(CANCEL),
    delay(3000),
    switchMap(() => of(setStatus("idle")))
  );
}