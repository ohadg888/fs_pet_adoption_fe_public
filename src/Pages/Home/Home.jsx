import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import "./style.css";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CuteDog from "../../Components/CuteDog/CuteDog";

function Home() {
  const { setCurrentPage, userInfo } = useContext(AppContext);
  let location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <Container className="home">
        <Row className="justify-content-md-center">
          <h1>
            Welcome{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : "User"}
          </h1>
          <h3>Find & Adopt a Pet Today!</h3>
        </Row>
      </Container>
      <CuteDog />
    </>
  );
}

export default Home;
