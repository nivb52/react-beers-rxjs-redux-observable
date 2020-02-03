import {
  FECTH_FULFILLED,
  SEARCH,
  FECTH_DATA,
  SET_STATUS
} from "./beersActions";

const initialState = {
  data: [],
  status: "idle" // "idle", "pending" , "succes" , "failure"
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case FECTH_FULFILLED:
      return {
        ...state,
        data: action.payload,
        status: "success"
      };

    case SET_STATUS:
      return {
        ...state,
        status: state.status
      };

    case FECTH_DATA:
      return {
        ...state,
        status: "pending"
      };

    case SEARCH:
      return {
        ...state,
      };

    default:
      return state;
  }
}
