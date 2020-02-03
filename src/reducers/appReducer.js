const initialState = {
  name: "niv"
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };

    default:
      return state;
  }
}
