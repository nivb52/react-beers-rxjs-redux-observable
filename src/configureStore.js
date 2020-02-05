import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appReducer } from "./reducers/appReducer";
import { beersReducer } from "./reducers/beersReducers";
// import reducer from './reducers'

import { combineEpics, createEpicMiddleware } from "redux-observable";

import { fetchBeerEpic, searchBeerEpic, resetBeerEpic, perPageBeerEpic } from "./epics/fetchBeers";

export function configureStore() {
  const rootEpic = combineEpics(fetchBeerEpic, searchBeerEpic, resetBeerEpic, perPageBeerEpic);

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
}
