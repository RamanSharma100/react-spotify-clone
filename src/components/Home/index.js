import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

const Home = ({ spotify }) => {
  return (
    <Container fluid className=" mx-0">
      <Row>
        {/* side bar  */}
        <SideBar />
        {/* right bar */}
        <Col
          xs={12}
          md={10}
          sm={12}
          className="position-fixed offset-md-2 left-0 bg-secondary text-white h-100"
          style={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {/* header  */}
          <Header />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
