import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

// import reducer:
import { appReducer } from "./reducers/appReducer";
import { beersReducer } from "./reducers/beersReducers";


import {
  fetchBeerEpic,
  searchBeerEpic,
  resetBeerEpic,
  presistConfigEpic
} from "./epics/fetchBeers";

export function configureStore() {
  const rootEpic = combineEpics(
    fetchBeerEpic,
    searchBeerEpic,
    resetBeerEpic,
    presistConfigEpic
  );

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer
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
