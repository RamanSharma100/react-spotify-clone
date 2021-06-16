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
  type: types.RESET_TRACKS,
});

export const getRecentTracks = (data) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setRecentTracks(data));
  dispatch(setLoading(false));
};

export const unsetRecentTracks = () => (dispatch) => {
  dispatch(resetRecentTracks());
};

const addCurrentPlayingTrack = (data) => ({
  type: types.CURRENT_PLAYING_TRACK,
  payload: data,
});

export const setCurrentPlayingTrack = (data) => (dispatch) => {
  dispatch(addCurrentPlayingTrack(data));
};

const setPlaying = (data) => ({
  type: types.SET_PLAYING,
  payload: data,
});

export const playingTrack = (data) => (dispatch) => {
  dispatch(setPlaying(data));
};
