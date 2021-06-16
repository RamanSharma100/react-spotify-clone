import React, { useEffect } from "react";
import { getTokenFromResponse } from "./spotify";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { loginUser, tokenSet, userReset } from "./redux/actions/authAction";

import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home";
import {
  getCurrentlyPlayingPlaylist,
  getPlaylists,
  resetPlaylist,
} from "./redux/actions/playlistsAction";
import {
  getRecentTracks,
  setCurrentPlayingTrack,
  unsetRecentTracks,
} from "./redux/actions/tracksAction";
import Footer from "./components/Footer/Footer";

const s = new SpotifyWebApi();

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (localStorage.getItem("tokn") && !token) {
      s.setAccessToken(JSON.parse(localStorage.getItem("tokn")).access_token);
      dispatch(tokenSet(JSON.parse(localStorage.getItem("tokn"))));

      s.getMe()
        .then((user) => {
          dispatch(loginUser(user));
          s.getUserPlaylists().then((playlists) => {
            dispatch(getPlaylists(playlists));
            s.getMyRecentlyPlayedTracks().then((tracks) => {
              dispatch(getRecentTracks(tracks));
              const recentTrack = tracks.items.filter(
                (track) => track.track.preview_url
              )[0];
              dispatch(setCurrentPlayingTrack(recentTrack));
              dispatch(
                getCurrentlyPlayingPlaylist(
                  tracks.items.filter((track) => track.track.preview_url)
                )
              );
            });
          });
        })
        .catch((err) => {
          if (err.status === 401) {
            localStorage.removeItem("tokn");
            dispatch(userReset());
            dispatch(resetPlaylist());
            dispatch(unsetRecentTracks());
          }
        });
    }
    if (_token && !token) {
      s.setAccessToken(_token);

      localStorage.setItem("tokn", JSON.stringify(hash));
      dispatch(tokenSet(hash));

      s.getMe().then((user) => {
        dispatch(loginUser(user));
        s.getUserPlaylists().then((playlists) => {
          dispatch(getPlaylists(playlists));

          s.getMyRecentlyPlayedTracks().then((tracks) => {
            dispatch(getRecentTracks(tracks));
            const recentTrack = tracks.items.filter(
              (track) => track.track.preview_url
            )[0];
            dispatch(setCurrentPlayingTrack(recentTrack));
            dispatch(
              getCurrentlyPlayingPlaylist(
                tracks.items.filter((track) => track.track.preview_url)
              )
            );
          });
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="Home">
      {!token ? (
        <Login />
      ) : (
        <>
          <Home spotify={s} />
          <Footer spotify={s} />
        </>
      )}
    </div>
  );
};

export default App;
