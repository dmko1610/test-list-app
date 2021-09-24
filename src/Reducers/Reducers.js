import { combineReducers } from "redux";

const INITIAL_STATE = {
  isDetailsOpened: false,
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_DETAILS":
      return {
        ...state,
        isDetailsOpened: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  main: mainReducer,
});
