import { SET_CONFIG, OPT, OPTIONS } from "./optionsActions";

const PER_PAGE = `&per_page=`;
const initialState = {
  // 'options' :
  [OPTIONS]: {[OPT.perPage]: `${PER_PAGE}10`} // default
};

export function optionsReducer(state = initialState, action) {
  switch (action.type) {

    case SET_CONFIG:
      let [key, value] = action.payload;
      return {
        ...state,
        [key]: value
      };

    default:
      return state;
  }
}
