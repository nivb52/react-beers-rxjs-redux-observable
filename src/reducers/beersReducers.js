const initialState = {
  data: [],
  loading: true
};

const FECTH_FULFILLED = 'FETCH_FULIFILLED'

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
