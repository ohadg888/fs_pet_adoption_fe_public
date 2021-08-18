import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Container, ButtonGroup, Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Data from "../../Data.json";
import PetCard from "../../Components/PetCard/PetCard";

function MyPets() {
  const { setCurrentPage } = useContext(AppContext);
  const [savedPets, setSavedPets] = useState(false);
  const [selectedPets, setSelectedPets] = useState(Data.pets);
  let location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
    console.log(selectedPets);
  }, []);

  return (
    <>
      <Container>
        <Row className="float-end">
          <Col xs={8}>
            <ButtonGroup aria-label="Basic example">
              <Button
                onClick={() => setSavedPets(false)}
                variant={savedPets ? "secondary" : "warning"}
              >
                All
              </Button>
              <Button
                variant={savedPets ? "warning" : "secondary"}
                onClick={() => setSavedPets(true)}
              >
                Saved
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <h1>My Pets</h1>
            <h3>this Pets is a Pets</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={8} style={{ "flex-wrap": "wrap" }}>
            <div className="list-wrap">
              {Object.keys(selectedPets).map((key) => {
                return <PetCard petInfo={selectedPets[key]} petID={key} />;
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyPets;
