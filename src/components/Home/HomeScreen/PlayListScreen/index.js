import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./style.css";

const PlayListScreen = () => {
  const { isLoading, playlists } = useSelector((state) => ({
    isLoading: state.playlists.isLoading,
    playlists: state.playlists.playlists,
  }));

  if (isLoading) {
    return (
      <div className="px-5 w-100">
        <h1 className="text-center my-5">Fetching....</h1>
      </div>
    );
  }

  if (playlists.items.length < 1) {
    return null;
  }
  return (
    <div
      className="col-md-12 playlistsscreen mt-3 pt-2 px-5 w-100"
      style={{ overflow: "hidden", height: "350px" }}
    >
      <h3 className="display-5 py-3">
        {new Date().getHours() >= 12
          ? new Date().getHours() > 16
            ? new Date().getHours() > 21
              ? "Good Night"
              : "Good Evening"
            : "Good Afternoon"
          : "Good Morning"}
      </h3>
      <div
        className="playlists w-100 d-flex"
        style={{ height: "100px", flexWrap: "wrap" }}
      >
        {playlists.items.map((itm, index) => (
          <div
            className="shadow-sm gap-2 playlist d-flex border-secondary border mx-1 my-1 col-sm-5 col-xs-12 h-100 rounded-1"
            style={{
              overflow: "hidden",
              width: "32%",
              background: "rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
            }}
            key={index}
          >
            <Image
              className="shadow-lg mr-3"
              src={itm.images[0].url}
              alt={itm.name}
              height="100%"
              width="30%"
            />
            <p className=" font-weight-bold h-100 d-flex ml-3 align-items-center">
              {itm.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayListScreen;
