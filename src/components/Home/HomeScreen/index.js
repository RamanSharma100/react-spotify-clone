import React from "react";
import { Col } from "react-bootstrap";
import PlayListScreen from "./PlayListScreen";

const HomeScreen = () => {
  return (
    <Col md={12} style={{ height: "88.2vh", overflowY: "auto" }}>
      <PlayListScreen />
    </Col>
  );
};

export default HomeScreen;
