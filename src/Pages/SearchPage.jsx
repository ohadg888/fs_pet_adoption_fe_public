import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../Components/SearchBar";
import PetCard from "../Components/PetCard/PetCard";
import Loader from "../Components/Loader";

function SearchPage() {
  const { setCurrentPage, petsList, setPetsList } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState(null);
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8000/api/pet", {
        method: "GET",
      });
      const body = await result.json();
      setPetsList(body.result);
    };
    fetchData();
    setCurrentPage(location.pathname);
  }, []);

  useEffect(() => {
    petsList && setSearchResults(petsList);
  }, [petsList]);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mb-3">
          <Col xs={7}>
            <h1>Search Page</h1>
            <h4>Find any pet</h4>
            <SearchBar setSearchResults={setSearchResults} />
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col xs={8} style={{ "flexWrap": "wrap" }}>
            <div className="list-wrap">
              {searchResults ? (
                Object.keys(searchResults).map((key) => {
                  return (
                    <PetCard
                      petInfo={searchResults[key]}
                      key={searchResults[key]._id}
                    />
                  );
                })
              ) : (
                <Loader />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchPage;
