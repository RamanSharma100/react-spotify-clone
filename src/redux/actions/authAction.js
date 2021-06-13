import * as types from "../types/authTypes";

const setUser = (data) => ({
  type: types.SET_USER,
  payload: data,
});

export const loginUser = (data) => (dispatch) => {
  dispatch(setUser(data));
};
const setToken = (data) => ({
  type: types.SET_TOKEN,
  payload: data,
});

export const tokenSet = (data) => (dispatch) => {
  dispatch(setToken(data));
};

const resetUser = () => ({
  type: types.RESET_USER,
});

export const userReset = () => (dispatch) => {
  dispatch(resetUser());
};
