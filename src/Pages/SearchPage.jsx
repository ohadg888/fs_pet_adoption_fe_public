import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../Components/SearchBar";
import PetCard from "../Components/PetCard/PetCard";

function SearchPage() {
  const [selectedPets, setSelectedPets] = useState([]);
  const { setCurrentPage } = useContext(AppContext);
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8000/api/pet", {
        method: "GET",
      });
      const body = await result.json();
      setSelectedPets(body.result);
    };
    fetchData();
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mb-3">
          <Col xs={7}>
            <h1>Search Page</h1>
            <h3>this Search is a Search</h3>
            <SearchBar />
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
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

export default SearchPage;
