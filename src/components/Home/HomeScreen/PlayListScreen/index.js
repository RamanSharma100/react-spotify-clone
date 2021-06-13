import React from "react";
import { useSelector } from "react-redux";

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
  return <div className="d-flex w-100">{JSON.stringify(playlists.items)}</div>;
};

export default PlayListScreen;
