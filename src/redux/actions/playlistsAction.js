import * as types from "../types/playlistTypes";

const setLoading = (data) => ({
  type: types.IS_LOADING,
  payload: data,
});
const setPlaylists = (data) => ({
  type: types.SET_PLAYLISTS,
  payload: data,
});
const resetPlaylists = () => ({
  type: types.RESET_PLAYLISTS,
});

export const getPlaylists = (data) => (dispatch) => {
  dispatch(setPlaylists(data));
  dispatch(setLoading(false));
};
export const resetPlaylist = () => (dispatch) => {
  dispatch(resetPlaylists());
  dispatch(setLoading(true));
};

const setCurrentlyPlayingPlaylist = (data) => ({
  type: types.CURRENTLY_PLAYING,
  payload: data,
});
export const getCurrentlyPlayingPlaylist = (data) => (dispatch) => {
  dispatch(setCurrentlyPlayingPlaylist(data));
};

const setSelectedPlaylist = (data) => ({
  type: types.SET_OPENED_PLAYLIST,
  payload: data,
});

export const resetSelectedPlaylist = () => (dispatch) => {
  dispatch({
    type: types.RESET_OPENED_PLAYLIST,
  });
};

export const getSelectedPlaylist = (data) => (dispatch) => {
  dispatch(setSelectedPlaylist(data));
};
