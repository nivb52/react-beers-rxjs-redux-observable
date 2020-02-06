import {
  SET_CONFIG,
  OPTIONS,
} from "../reducers/optionsActions";
import { withLatestFrom, pluck, tap, ignoreElements } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of, EMPTY } from "rxjs";
import {saveConfig, OPTIONS_CACHE_KEY} from '../reducers/optionsActions'


export function presistEpic(action$, state$) {
  return action$.pipe(
    ofType(SET_CONFIG),
    //   [OPTIONS] -> use the options name:
    withLatestFrom(state$.pipe(pluck([OPTIONS]))),
    tap(([a, opts]) => {
        const options ={ ...opts[OPTIONS_CACHE_KEY]}
      localStorage.setItem(OPTIONS_CACHE_KEY, JSON.stringify(options));
    }),
    ignoreElements()
  );
}

// LOAD OPTIONS : RUN ONLY ONCE
export function hydrateEpic() {
  const maybeConfig = localStorage.getItem(OPTIONS_CACHE_KEY);
  if (typeof maybeConfig === "string") {
    try {
      const parsed = JSON.parse(maybeConfig);
      return of(saveConfig(...parsed));
    } catch (e) {
      return EMPTY;
    }
  }
  return EMPTY;
}
