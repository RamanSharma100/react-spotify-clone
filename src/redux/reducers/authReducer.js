import * as types from "../types/authTypes";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_TOKEN:
      state = { ...state, token: payload };
      return state;
    case types.SET_USER:
      state = { ...state, isLoggedIn: true, user: payload };
      console.log(payload);
      return state;
    case types.RESET_USER:
      state = initialState;
      return state;

    default:
      return state;
  }
};

export default authReducer;
