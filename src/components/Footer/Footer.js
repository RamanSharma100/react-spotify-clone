import {
  faFastBackward,
  faFastForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  playingTrack,
  setCurrentPlayingTrack,
} from "../../redux/actions/tracksAction";

const Footer = () => {
  const { currentlyPlaying, playing, currentlyPlayingPlaylist } = useSelector(
    (state) => ({
      currentlyPlaying: state.tracks.currentlyPlaying,
      playing: state.tracks.playing,
      currentlyPlayingPlaylist: state.playlists.currentlyPlaying,
    })
  );

  const audioRef = useRef();
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();

  const play = () => {
    audioRef.current.play();
    dispatch(playingTrack(true));
  };
  const pause = () => {
    audioRef.current.pause();
    dispatch(playingTrack(false));
  };

  const skipNext = () => {
    if (currentlyPlayingIndex === currentlyPlayingPlaylist.length - 1) {
      dispatch(setCurrentPlayingTrack(currentlyPlayingPlaylist[0]));
      audioRef.current.src = currentlyPlayingPlaylist[0].track.preview_url;
    } else {
      dispatch(
        setCurrentPlayingTrack(
          currentlyPlayingPlaylist[currentlyPlayingIndex + 1]
        )
      );
      audioRef.current.src =
        currentlyPlayingPlaylist[currentlyPlayingIndex + 1].track.preview_url;
    }
  };

  const skipPrevious = () => {
    if (currentlyPlayingIndex === 0) {
      dispatch(
        setCurrentPlayingTrack(
          currentlyPlayingPlaylist[currentlyPlayingPlaylist.length - 1]
        )
      );
      audioRef.current.src =
        currentlyPlayingPlaylist[
          currentlyPlayingPlaylist.length - 1
        ].track.preview_url;
    } else {
      dispatch(
        setCurrentPlayingTrack(
          currentlyPlayingPlaylist[currentlyPlayingIndex - 1]
        )
      );
      audioRef.current.src =
        currentlyPlayingPlaylist[currentlyPlayingIndex - 1].track.preview_url;
    }
  };

  const onSongEnd = () => {
    skipNext();
    dispatch(playingTrack(true));
  };

  useEffect(() => {
    if (currentlyPlaying && currentlyPlayingPlaylist) {
      setCurrentlyPlayingIndex(
        currentlyPlayingPlaylist.indexOf(currentlyPlaying)
      );
      if (playing) {
        play();
      }
    }
  }, [currentlyPlaying, audioRef.current?.src, dispatch]);

  return (
    <Col
      md={12}
      className="bg-dark position-fixed d-flex align-items-center justify-content-between text-white px-5 mx-0 py-2 bottom-0"
      style={{ height: "80px", overflow: "hidden" }}
    >
      {!currentlyPlaying ? (
        <h1 className="text-center w-100">Not Playing</h1>
      ) : (
        <>
          <div
            className=" d-flex align-items-center gap-3 justify-content-start position-relative col-md-4"
            style={{ overflow: "hidden" }}
          >
            <img
              src={currentlyPlaying.track.album.images[1].url}
              alt={currentlyPlaying.track.name}
              className="card-img-top"
              style={{ width: "60px" }}
            />
            <div className="trackInfo text-white w-100">
              <p
                className="my-0 px-3 "
                style={{ overflow: "hidden", wordWrap: "no-wrap" }}
              >
                {currentlyPlaying.track.name}
              </p>
              <p className="small text-secondary px-3 my-0">
                {currentlyPlaying.track.album.artists
                  .map((artist) => artist.name)
                  .join(",")}
              </p>
            </div>
          </div>
          <div className="d-flex col-md-4 align-items-center justify-content-center">
            <button
              type="button"
              className="btn text-white"
              style={{ outline: "none", boxShadow: "none" }}
              onClick={() => skipPrevious()}
            >
              <FontAwesomeIcon
                icon={faFastBackward}
                style={{ fontSize: "0.89rem" }}
              />
            </button>
            <button
              type="button"
              className="btn text-white border-white rounded-circle border-1"
              style={{ outline: "none", boxShadow: "none" }}
              onClick={() => (playing ? pause() : play())}
            >
              <FontAwesomeIcon
                icon={playing ? faPause : faPlay}
                style={{ fontSize: "0.89rem" }}
              />
            </button>
            <button
              type="button"
              className="btn text-white "
              style={{ outline: "none", boxShadow: "none" }}
              onClick={() => skipNext()}
            >
              <FontAwesomeIcon
                icon={faFastForward}
                style={{ fontSize: "0.89rem" }}
              />
            </button>
          </div>
          <audio
            style={{ display: "none" }}
            ref={audioRef}
            src={currentlyPlaying.track.preview_url}
            onEnded={() => onSongEnd()}
            onPause={() => pause()}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime / 100)}
            playsInline={true}
          ></audio>
          <div className="d-flex col-md-4 align-items-center justify-content-end">
            {currentlyPlaying && audioRef.current && (
              <p className="my-0">
                {currentTime.toFixed(2)} /
                {(audioRef.current.duration / 100).toFixed(2)}
              </p>
            )}
            &nbsp;&nbsp;&nbsp;
            <p className="bg-primary my-0 py-1 px-2 mr-4 small">Preview</p>
            &nbsp;&nbsp;&nbsp;
            <a
              href={currentlyPlaying.track.external_urls.spotify}
              target="_blank"
              className="btn btn-success ml-3 btn-sm"
            >
              Listen Full Song On Spotify
            </a>
          </div>
        </>
      )}
    </Col>
  );
};

export default Footer;
