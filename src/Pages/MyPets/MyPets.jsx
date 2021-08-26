import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Container, ButtonGroup, Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import PetCard from "../../Components/PetCard/PetCard";

function MyPets() {
  const { setCurrentPage, userInfo, petsList, setPetsList } =
    useContext(AppContext);
  const [showSavedPets, setShowSavedPets] = useState(false);

  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://pet-project-itc.herokuapp.com/api/pet/user/${userInfo._id}`,
        {
          method: "GET",
        }
      );
      const body = await result.json();
      showSavedPets
        ? setPetsList(body.result.savedPets)
        : setPetsList(body.result.myPets);
    };
    if (userInfo) {
      fetchData();
    }
  }, [showSavedPets, userInfo]);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <Container>
        <Row className="float-end">
          <Col xs={8}>
            <ButtonGroup aria-label="Basic example">
              <Button
                onClick={() => setShowSavedPets(false)}
                variant={showSavedPets ? "secondary" : "warning"}
              >
                Mine
              </Button>
              <Button
                variant={showSavedPets ? "warning" : "secondary"}
                onClick={() => setShowSavedPets(true)}
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
          <Col xs={8} style={{ "flexWrap": "wrap" }}>
            <div className="list-wrap">
              {showSavedPets
                ? Object.keys(petsList).map((key) => {
                    return (
                      <PetCard
                        key={petsList[key]._id}
                        petInfo={petsList[key]}
                      />
                    );
                  })
                : Object.keys(petsList).map((key) => {
                    return (
                      <PetCard
                        key={petsList[key]._id}
                        petInfo={petsList[key]}
                      />
                    );
                  })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyPets;
