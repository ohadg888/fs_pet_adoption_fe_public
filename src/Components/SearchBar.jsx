import React, { useState, useEffect } from "react";
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

function SearchBar() {
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedSearchToggle, setAdvancedSearchToggle] = useState(false);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOnClick = (e) => {};

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
            <Form.Control
              type="text"
              onChange={handleOnChange}
              placeholder="Search Pets"
              className="me-3"
            />
            <Button variant="primary" onClick={handleOnClick} className="me-3">
              Search
            </Button>{" "}
            <CustomToggle eventKey="0">
              <FontAwesomeIcon icon={faTasks} />
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default SearchBar;
