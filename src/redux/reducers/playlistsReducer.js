import * as types from "../types/playlistTypes";

const initialState = {
  isLoading: true,
  playlists: [],
  discover_weekly: null,
  top_artists: null,
};

const playlistsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.IS_LOADING:
      state = { ...state, isLoading: payload };
      return state;
    case types.SET_PLAYLISTS:
      state = { ...state, playlists: payload };
      return state;
    case types.RESET_PLAYLISTS:
      state = initialState;
      return state;
    default:
      return state;
  }
};

export default playlistsReducer;
