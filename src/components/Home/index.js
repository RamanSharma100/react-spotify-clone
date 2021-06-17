import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Header from "./Header/Header";
import HomeScreen from "./HomeScreen";
import PlaylistScreen from "./PlaylistScreen";
import SideBar from "./SideBar/SideBar";

const Home = ({ spotify, setRoot, root }) => {
  return (
    <Container fluid className=" mx-0">
      <Row>
        {/* side bar  */}
        <SideBar setRoot={setRoot} root={root} />
        {/* right bar */}
        <Col
          xs={12}
          md={10}
          sm={12}
          className="position-fixed offset-md-2 left-0 bg-secondary text-white h-100"
          style={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {/* header  */}
          <Header root={root} setRoot={setRoot} />
          {/* homeScreen  */}
          {root === "home" && <HomeScreen setRoot={setRoot} />}
          {/* search screen */}
          {root === "search" && <h1>Search</h1>}
          {/* {library} */}
          {root === "library" && <h1>Library</h1>}
          {/* album */}
          {root === "album" && (
            <PlaylistScreen setRoot={setRoot} spotify={spotify} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
