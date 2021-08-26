import React, { useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AddPetForm from "../Components/AddPetForm";

function AddPet() {
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
            <h1>Add Pet</h1>
            <h3>this Pet is a Pet</h3>
            <AddPetForm update={false} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddPet;
