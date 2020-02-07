import { SET_CONFIG, OPTIONS_CACHE_KEY } from "./optionsActions";

export const initialState = {
  beerAPI : `https://api.punkapi.com/v2/beers`,
  [OPTIONS_CACHE_KEY]: {page:"&page=1" ,perPage: "&per_page=10" } // default
};


export function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG:
      if (!action.payload || !action.payload[0]) return { ...state };
      let [optKey, value] = action.payload;
      return {
        ...state,
        [OPTIONS_CACHE_KEY]: {
          ...state[OPTIONS_CACHE_KEY],
          [optKey]: value // override
        }
      };

    default:
      return state;
  }
}
