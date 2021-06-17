import { faAngleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Image, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = ({ root, setRoot }) => {
  const user = useSelector((state) => state.auth.user);
  const openedPlaylist = useSelector((state) => state.playlists.openedPlaylist);

  return (
    <Col
      md={12}
      xl={12}
      xs={12}
      sm={12}
      className="d-flex w-100 px-5 mt-3 bg-secondary position-sticky top-0 align-items-center justify-content-between"
      style={{ height: "70px", zIndex: 9999 }}
    >
      {root === "search" && (
        <Form className={"col-md-6"}>
          <Form.Group controlId={"formBasicSearch"}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="border-0 rounded-0 bg-white w-100 h-100">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Search..."
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
                className="border-0 rounded-0"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      )}
      {root === "home" && <h3 className="col-md-6 my-0">Home</h3>}
      {root === "album" && (
        <div className="col-md-6 d-flex align-items-center">
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={() => setRoot("home")}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <h3 className="my-0">{openedPlaylist.name}</h3>
        </div>
      )}
      <div
        className="profile d-flex col-md-2 col-sm-4 ml-auto align-items-center justify-content-between"
        style={{ cursor: "pointer" }}
      >
        <Image
          src={user?.images[0].url}
          alt={"profile"}
          className="rounded-circle col-md-2"
          fluid
        />
        <p className="my-0 h-100 small">{user?.display_name}</p>
      </div>
    </Col>
  );
};

export default Header;
