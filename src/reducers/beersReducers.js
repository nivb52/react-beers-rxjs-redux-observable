import {FECTH_FULFILLED} from './beersActions'


const initialState = {
  data: [],
  loading: true
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case FECTH_FULFILLED:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    default:
      return state;
  }
}
