import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPlayingTrack,
  playingTrack,
} from "../../../../redux/actions/tracksAction";
import { getCurrentlyPlayingPlaylist } from "../../../../redux/actions/playlistsAction";

import "./style.css";

const RecentTracksScreen = () => {
  const { isLoading, recentTracks } = useSelector((state) => ({
    isLoading: state.tracks.isLoading,
    recentTracks: state.tracks.recentlyPlayed,
  }));

  const dispatch = useDispatch();

  const playSong = (track) => {
    dispatch(setCurrentPlayingTrack(track));
    dispatch(
      getCurrentlyPlayingPlaylist(
        recentTracks.items.filter((trk) => trk.track.preview_url)
      )
    );
    dispatch(playingTrack(true));
  };

  if (isLoading) {
    return (
      <div className="px-5 w-100">
        <h1 className="text-center my-5">Fetching....</h1>
      </div>
    );
  }

  if (recentTracks.items.length < 1) {
    return null;
  }
  return (
    <div
      className="col-md-12 recenttracksscreen position-relative mt-3 pt-2 px-5 w-100"
      style={{ height: "auto" }}
    >
      <h3 className="display-5 py-3">Recently Played</h3>
      <div
        className="recenttracks w-100 d-flex  mb-5 "
        style={{ height: "100px", flexWrap: "wrap" }}
      >
        {recentTracks.items.map((track, index) => (
          <div
            key={index}
            className={`card track mb-3 mx-1 px-0 border-0 ${
              track.track.preview_url ? "preview" : "noPreview"
            }`}
            onClick={() => (track.track.preview_url ? playSong(track) : null)}
          >
            <div className="noPreview position-absolute">
              <h1>No Preview Availaible</h1>
              <a
                href={track.track.preview_url}
                rel="noreferer"
                target="_blank"
                className="btn btn-success"
              >
                Listen On Spotify
              </a>
            </div>
            <img
              className="card-img-top"
              src={track.track.album.images[1].url}
              alt={track.track.name}
            />
            <div className="card-body">
              <h5 className="card-title text-center">{track.track.name}</h5>
              <p className="card-title text-center">
                {track.track.artists.map((artist) => artist.name).join(",")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTracksScreen;
