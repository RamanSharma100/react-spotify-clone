import { faHome, faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./style.css";

const SideBar = () => {
  const { isLoading, playlists } = useSelector((state) => ({
    isLoading: state.playlists.isLoading,
    playlists: state.playlists.playlists,
  }));
  console.log(playlists);
  return (
    <Col
      xs={1}
      md={2}
      sm={1}
      className="position-fixed px-0 d-flex flex-column align-items-center sidebar left-0 text-white h-100"
      style={{ background: "#000" }}
    >
      <Image
        className="logo mt-4 mb-4"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="logo"
        fluid
      />
      <div className="btns w-100 px-3 mb-4 py-3">
        <Button variant="outline-light" className="my-2 w-100">
          <FontAwesomeIcon icon={faHome} /> Home
        </Button>
        <Button variant="outline-light" className="my-2 w-100">
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
        <Button variant="outline-light" className="my-2 w-100">
          <FontAwesomeIcon icon={faMusic} /> Library
        </Button>
      </div>
      {isLoading ? (
        "Fetching...."
      ) : playlists.items.length > 0 ? (
        <div className="playlists w-100 py-3" style={{ overflowY: "auto" }}>
          {playlists.items.map((itm, index) => (
            <p
              key={index}
              style={{ cursor: "pointer" }}
              className="playlistName my-0 px-3 py-1 small w-100"
            >
              {itm.name}
            </p>
          ))}
        </div>
      ) : (
        "no playlists found"
      )}
    </Col>
  );
};

export default SideBar;