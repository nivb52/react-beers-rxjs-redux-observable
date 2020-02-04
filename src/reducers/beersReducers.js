import {
  FECTH_FULFILLED,
  FECTH_FAILED,
  SEARCH,
  FECTH_DATA,
  SET_STATUS
} from "./beersActions";

const initialState = {
  data: [],
  errors: [],
  status: "idle" // "idle", "pending" , "succes" , "failure"
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
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

    case FECTH_FULFILLED:
      return {
        ...state,
        data: action.payload,
        errors: [],
        status: "success"
      };

    case FECTH_FAILED:
      return {
        ...state,
        errors: [{ text: action.payload.message, code: action.payload.code }],
        status: "failure"
      };

    case SEARCH:
      return {
        ...state
      };

    default:
      return state;
  }
}
