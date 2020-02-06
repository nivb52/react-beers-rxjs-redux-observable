import { SET_CONFIG, OPTIONS_CACHE_KEY } from "./optionsActions";

const initialState = {
  params: { perPage: "&per_page=10" } // default
  // beerAPI ...
};
//   const keyString = OPT[key].split("=");
//   console.log("keyString: ", keyString);
export function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG:
      let [optKey, value] = action.payload;
      if (!action.payload || !action.payload[0]) return { ...state };
      return {
        params: {
          ...state.params,
          [optKey]: value
        }
      };

    default:
      return state;
  }
}
