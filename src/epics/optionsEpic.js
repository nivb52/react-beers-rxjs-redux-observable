import {
  SET_CONFIG,
  OPTIONS,
  OPT
} from "../reducers/optionsActions";
import { withLatestFrom, pluck, tap, ignoreElements } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, EMPTY } from "rxjs";
import {saveConfig} from '../reducers/optionsActions'
const CACHE_KEY = "ajax-configs";


export function presistEpic(action$, state$) {
  return action$.pipe(
    ofType(SET_CONFIG),
    //   [OPTIONS] -> use the options name:
    withLatestFrom(state$.pipe(pluck([OPTIONS], [OPT.perPage]))),
    tap(([a, options]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(options));
    }),
    ignoreElements()
  );
}

// LOAD OPTIONS :
export function hydrateEpic() {
  const maybeConfig = localStorage.getItem(CACHE_KEY);
  if (typeof maybeConfig === "string") {
    try {
      const parsed = JSON.parse(maybeConfig);
      return of(saveConfig(parsed));
    } catch (e) {
      return EMPTY;
    }
  }
  return EMPTY;
}
