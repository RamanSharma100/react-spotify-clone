import * as types from "../types/tracksTypes";

const setLoading = (data) => ({
  type: types.LOADING_TRACKS,
  payload: data,
});

const setRecentTracks = (data) => ({
  type: types.SET_RECENT_TRACKS,
  payload: data,
});
const resetRecentTracks = () => ({
  type: types.RESET_RECENT_TRACKS,
});

export const getRecentTracks = (data) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setRecentTracks(data));
  dispatch(setLoading(false));
};

export const unsetRecentTracks = () => (dispatch) => {
  dispatch(resetRecentTracks());
};
