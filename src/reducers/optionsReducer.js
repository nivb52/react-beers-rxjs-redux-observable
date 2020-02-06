import { SET_CONFIG, OPTIONS_CACHE_KEY } from "./optionsActions";

const initialState = {
  [OPTIONS_CACHE_KEY]: { perPage: "&per_page=10" } // default
  // beerAPI ...
};
//   const keyString = OPT[key].split("=");
//   console.log("keyString: ", keyString);
export function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG:
      if (!action.payload || !action.payload[0]) return { ...state };
      let [optKey, value] = action.payload;
      return {
        params: {
          ...state[OPTIONS_CACHE_KEY],
          [optKey]: value
        }
      };

    default:
      return state;
  }
}
