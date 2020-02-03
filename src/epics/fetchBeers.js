import { ajax } from "rxjs/ajax";
import { catchError, map, switchMap } from "rxjs/operators";
import { of, concat } from "rxjs";
import { fetchFulfilled, FECTH_DATA, setStatus } from "../reducers/beersActions";
import { ofType } from "redux-observable";
const API = `https://api.punkapi.com/v2/beers`;

// stream of action
export function fetchBeersEpic(action$) {
  return action$.pipe(
    ofType(FECTH_DATA),
    switchMap( () => {
      return concat(
        of (setStatus("pending")),
        ajax.getJSON(API).pipe(
          map( beers  => fetchFulfilled(beers)),
          catchError(error => {
            console.log('error: ', error.message);            
            return of (setStatus("failure"))
          })
        )
      )
    })
  )
}
