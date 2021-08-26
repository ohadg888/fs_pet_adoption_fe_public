import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";

function Profile() {
  const { setCurrentPage } = useContext(AppContext);
  let location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <h1>My Profile</h1>
            <h4 className="mb-4">Update your Profile</h4>
            <ProfileForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
