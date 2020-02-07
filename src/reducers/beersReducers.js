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
  resulatPerPage: 10,
  status: "IDLE" // "idle", "pending" , "succes" , "failure"
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
        status: "PENDING"
      };

    case FETCH_FULFILLED:
      return {
        ...state,
        data: action.payload,
        errors: [],
        status: "SUCCESS"
      };

    case FETCH_FAILED:
      const { message, code } =
        action && action.payload
          ? action.payload
          : { message: "unknown error, check your connection", code: "#000" };
      return {
        ...state,
        errors: [{ text: message, code }],
        status: "FAILURE"
      };

    case SEARCH:
      return {
        ...state
      };

    case RESULT_PER_PAGE:
    console.log('select RESULT_PER_PAGE',action.payload,' results');
      return {
        ...state,
        resulatPerPage: action.payload
      };

    case CANCEL:
      return {
        ...state,
        errors: [],
        status: "CANCEL",
      };
      
    default:
      return state;
  }
}
