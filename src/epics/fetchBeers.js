import { ajax } from "rxjs/ajax";
import { tap, ignoreElements, catchError } from "rxjs/operators";
import { of } from "rxjs";
const API = `https://api.punkapi.com/v2/beers`;

export function fetchBeersEpic() {
  return ajax.getJSON(API).pipe(
    tap(b => console.log('beers: ', b)),
    ignoreElements()
    // catchError(error => {
    //   console.log('error: ', error);
    //   return of(error);
    // })
  );
}
