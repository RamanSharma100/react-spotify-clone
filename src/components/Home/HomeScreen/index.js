import React from "react";
import { Col } from "react-bootstrap";
import PlayListScreen from "./PlayListScreen";
import RecentTracksScreen from "./RecentTracksScreen";

const HomeScreen = ({ setRoot }) => {
  return (
    <Col md={12} style={{ height: "78vh", overflowY: "auto" }}>
      <PlayListScreen setRoot={setRoot} />

      {/* recently played tracks  */}
      <RecentTracksScreen />
    </Col>
  );
};

export default HomeScreen;
