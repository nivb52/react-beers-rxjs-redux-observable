import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import{ajax} from 'rxjs/ajax';
// import reducer:
import { appReducer } from "./reducers/appReducer";
import { beersReducer } from "./reducers/beersReducer";
import { optionsReducer } from "./reducers/optionsReducer";

// EPICS :
import {
  fetchBeerEpic,
  fetchRandomBeerEpic,
  searchBeerEpic,
  resetBeerEpic
} from "./epics/fetchBeers";
import { presistEpic, hydrateEpic } from "./epics/optionsEpic";

export function configureStore(dependencies = {}) {

  
  const rootEpic = combineEpics(
    fetchBeerEpic,
    searchBeerEpic,
    resetBeerEpic,
    fetchRandomBeerEpic,
    presistEpic,
    hydrateEpic
  );

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      getJSON: ajax.getJSON,
      ...dependencies
    }
  });

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer,
    OPTIONS: optionsReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    }) || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
}
