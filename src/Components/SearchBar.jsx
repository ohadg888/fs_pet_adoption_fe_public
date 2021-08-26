import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import {
  Form,
  Accordion,
  Card,
  Row,
  Col,
  useAccordionButton,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const { setSearchResults, searchResults } = props;
  const { petsList } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    type: "",
    status: "",
  });
  const [advancedSearchToggle, setAdvancedSearchToggle] = useState(false);

  useEffect(() => {
    setSearchResults(() => {
      const copy = [...petsList];
      return copy.filter(
        (pet) =>
          pet.name.includes(searchQuery.name) &&
          pet.type.includes(searchQuery.type) &&
          pet.status.includes(searchQuery.status)
      );
    });
  }, [searchQuery]);

  useEffect(() => {
    // setPetWeights()
    console.log(234);
    console.log(searchResults);
  }, [searchResults]);

  const handleOnChange = (e) => {
    setSearchQuery((prevState) => {
      const copy = { ...prevState };
      copy[e.target.id] = e.target.value;
      return copy;
    });
  };

  const handleOnClick = async (e) => {};

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      advancedSearchToggle
        ? setAdvancedSearchToggle(false)
        : setAdvancedSearchToggle(true)
    );

    return (
      <>
        <Button
          variant={advancedSearchToggle ? "secondary" : "outline-secondary"}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>{" "}
      </>
    );
  };
  return (
    <>
      <Accordion>
        <Card>
          <Card.Header className="searchBar-wrap">
            <Form.Select
              aria-label="Default select example"
              className="search-main-select"
              onChange={handleOnChange}
              id="type"
            >
              <option value="">Search by Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </Form.Select>{" "}
            <CustomToggle eventKey="0">
              <FontAwesomeIcon icon={faTasks} />
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    id="name"
                    onChange={handleOnChange}
                    placeholder="Search by Name"
                    className="me-3"
                  />
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    className="search-select"
                    id="status"
                    onChange={handleOnChange}
                  >
                    <option value="">Status</option>
                    <option value="available">Available</option>
                    <option value="foster">Foster</option>
                    <option value="adopted">Adopted</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default SearchBar;
