import * as types from "../types/tracksTypes";

const initialState = {
  isLoading: true,
  recentlyPlayed: null,
  currentlyPlaying: null,
  playing: false,
};

const tracksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOADING_TRACKS:
      state = { ...state, isLoading: payload };
      return state;
    case types.SET_RECENT_TRACKS:
      state = { ...state, recentlyPlayed: payload };
      return state;
    case types.RESET_TRACKS:
      state = initialState;
      return state;
    case types.CURRENT_PLAYING_TRACK:
      state = { ...state, currentlyPlaying: payload };
      return state;
    case types.SET_PLAYING:
      state = { ...state, playing: payload };
      return state;
    default:
      return state;
  }
};

export default tracksReducer;
