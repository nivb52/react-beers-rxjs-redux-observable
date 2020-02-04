import {
  FECTH_FULFILLED,
  FECTH_FAILED,
  SEARCH,
  FECTH_DATA,
  SET_STATUS,
  CANCEL
} from "./beersActions";

const initialState = {
  data: [],
  errors: [], // {text , code}
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
      const {message, code} = action.payload
      return {
        ...state,
        errors: [{ text: message, code }],
        status: "failure"
      };

    case SEARCH:
      return {
        ...state
      };

    case CANCEL:
      return {
        ...state,
        status: "idle"
      };

    default:
      return state;
  }
}
