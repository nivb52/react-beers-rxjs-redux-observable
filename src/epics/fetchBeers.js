import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { fetchFulfilled } from "../reducers/beersActions";
const API = `https://api.punkapi.com/v2/beers`;

export function fetchBeersEpic() {
  return ajax.getJSON(API).pipe(
    map( beers => fetchFulfilled(beers)),
    catchError(error => {
      console.log('error: ', error);
      return of(error);
    })
  );
}
