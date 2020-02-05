import {
  FETCH_FULFILLED,
  FETCH_FAILED,
  SEARCH,
  FETCH_DATA,
  SET_STATUS,
  CANCEL,
  RESULT_PER_PAGE,
} from "./beersActions";

const initialState = {
  data: [],
  errors: [], // {text , code}
  resultPerPage: 10,
  status: "idle" // "idle", "pending" , "succes" , "failure"
};

export function beersReducer(state = initialState, action) {
  console.log(action)
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

    case RESULT_PER_PAGE:
      return {
        ...state,
        resultPerPage: action.payload
      };

    case CANCEL:
      return {
        ...state,
        errors: [],
        status: "cancel",
      };
      
    default:
      return state;
  }
}
