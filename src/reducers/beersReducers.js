import {
  FETCH_FULFILLED,
  FETCH_FAILED,
  SEARCH,
  FETCH_DATA,
  SET_STATUS,
  CANCEL,
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
        status: action.payload
      };

    case FETCH_DATA:
      return {
        ...state,
        status: "pending"
      };

    case FETCH_FULFILLED:
      return {
        ...state,
        data: action.payload,
        errors: [],
        status: "success"
      };

    case FETCH_FAILED:
      const { message, code } =
        action && action.payload
          ? action.payload
          : { message: "unknown error, check your connection", code: "#000" };
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
        status: "idle",
        errors: []
      };

    default:
      return state;
  }
}
