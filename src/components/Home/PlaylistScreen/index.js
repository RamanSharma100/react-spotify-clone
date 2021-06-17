import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Col, Image } from "react-bootstrap";
import {
  getCurrentlyPlayingPlaylist,
  getSelectedPlaylist,
} from "../../../redux/actions/playlistsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import {
  setCurrentPlayingTrack,
  playingTrack,
} from "../../../redux/actions/tracksAction";

const PlaylistScreen = ({ setRoot, spotify }) => {
  const { selectedPlaylist, currentlyPlaying } = useSelector(
    (state) => ({
      selectedPlaylist: state.playlists.openedPlaylist,
      currentlyPlaying: state.tracks.currentlyPlaying,
    }),
    shallowEqual
  );

  const [playlist, setPlaylist] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    spotify
      .getPlaylist(selectedPlaylist.id)
      .then((r) => setPlaylist(r))
      .catch(() => window.location.reload());
    return () => {
      dispatch(getSelectedPlaylist(selectedPlaylist));
    };
  }, []);

  const playPlaylist = () => {
    const availaiblePlaylists = playlist.tracks.items.filter(
      (itm) => itm.track.preview_url
    );
    dispatch(setCurrentPlayingTrack(availaiblePlaylists[0]));
    dispatch(getCurrentlyPlayingPlaylist(availaiblePlaylists));
    dispatch(playingTrack(true));
  };

  const playSong = (song) => {
    const availaiblePlaylists = playlist.tracks.items.filter(
      (itm) => itm.track.preview_url
    );
    dispatch(setCurrentPlayingTrack(song));
    dispatch(getCurrentlyPlayingPlaylist(availaiblePlaylists));
    dispatch(playingTrack(true));
  };

  if (!playlist)
    return (
      <Col md={12}>
        <h1 className="text-centr my-5">Fetching...</h1>
      </Col>
    );

  return (
    <Col md={12} className="my-5 px-5">
      <div
        className="w-100 d-flex position-relative"
        style={{ height: "250px" }}
      >
        <Image
          src={playlist.images[0].url}
          height={"100%"}
          width={250}
          alt={playlist.name}
          fluid
        />
        <div className="col-md-1"></div>
        <div className="info d-flex flex-column justify-content-end">
          <p className="small">PLAYLIST</p>
          <h1>{playlist.name}</h1>
          <div className="d-flex">
            <p>{playlist.owner.display_name}</p> |
            <p>{playlist.followers.total} Likes</p> |
            <p>{playlist.tracks.total} Songs</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faPlayCircle}
          className="position-absolute bg-success shadow rounded-circle"
          style={{
            fontSize: "4.5rem",
            right: "25%",
            top: "15%",
            cursor: "pointer",
          }}
          onClick={() => playPlaylist()}
        />
      </div>
      <table className="w-100 text-center text-white my-5 table table-hover bg-transparent">
        <thead className="border-top border-bottom">
          <tr>
            <th scope="col" className=" py-3 text-center">
              #
            </th>
            <th scope="col" className=" py-3 text-center">
              Title
            </th>
            <th scope="col" className=" py-3 text-center">
              Album
            </th>
            <th scope="col" className=" py-3 text-center">
              Date Added
            </th>
            <th
              scope="col"
              className=" py-3 text-center"
              style={{ width: "250px" }}
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {playlist.tracks.items.map((itm, index) => (
            <tr
              onDoubleClick={() => playSong(itm)}
              key={index}
              className={`${
                (!itm.track.preview_url || currentlyPlaying === itm) &&
                "bg-dark text-secondary"
              } `}
            >
              <td>{currentlyPlaying === itm ? "Playing" : index + 1}</td>
              <td className="small">{itm.track.name}</td>
              <td className="small">{itm.track.album.name}</td>
              <td className="small">{new Date(itm.added_at).toDateString()}</td>
              <td className="small d-flex align-items-center justify-content-center">
                <p className="my-0 bg-primary py-1 px-2 text-white">
                  {itm.track.preview_url ? "Preview" : "No preview availiable"}
                </p>
                &nbsp;&nbsp;
                <a
                  href={itm.track.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="my-0 btn-success btn-sm btn ml-2 text-white"
                >
                  Listen On Spotify
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Col>
  );
};

export default PlaylistScreen;
