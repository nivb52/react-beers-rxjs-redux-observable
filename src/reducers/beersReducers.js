import {
  FETCH_FULFILLED,
  FETCH_FAILED,
  SEARCH,
  FETCH_DATA,
  SET_STATUS,
  CANCEL,
  CONFIG,
  OPTIONS
} from "./beersActions";


/// :::::::::::::::::::::::::::::::
// initialState
/// :::::::::::::::::::::::::::::::
const initialState = {
  data: [],
  errors: [], // {text , code}
  [OPTIONS.perPage]: 10,
  status: "idle" // "idle", "pending" , "succes" , "failure", "cancel"
};

/// :::::::::::::::::::::::::::::::
// beersReducer
/// :::::::::::::::::::::::::::::::
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
          : { message: "unknown error, check your connection", code: "000" };
      return {
        ...state,
        errors: [{ text: message, code }],
        status: "failure"
      };

    case SEARCH:
      return {
        ...state
      };

    case CONFIG:
      const [key , value] = action.payload
      return {
        ...state,
        [key]: value
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
