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
