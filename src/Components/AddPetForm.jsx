import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import AppContext from "../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function AddPetForm() {
  const { userToken } = useContext(AppContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleOnChange = (e) => {
    if (e.target.name !== "petPic") {
      setFormData((prevState) => {
        const copy = { ...prevState };
        copy[e.target.name] = e.target.value;
        return copy;
      });
    } else {
      setFormData((prevState) => {
        const copy = { ...prevState };
        copy[e.target.name] = e.target.files[0];
        return copy;
      });
    }
  };

  const handleSubmit = async () => {
    const newFormData = new FormData();

    for (let key in formData) {
      newFormData.append(key, formData[key]);
    }

    const result = await fetch("http://localhost:8000/api/pet", {
      method: "POST",
      body: newFormData,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const body = await result.json();
    console.log(body);
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Select
            onChange={handleOnChange}
            className="mb-3"
            name="type"
            aria-label="Pet Type"
          >
            <option>Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleOnChange}
            />
            <label htmlFor="name">Name</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Select
            onChange={handleOnChange}
            className="mb-3"
            name="status"
            aria-label="Pet Type"
          >
            <option>Aboption Status</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
            <option value="foster">Foster</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control onChange={handleOnChange} type="file" name="petPic" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              name="height"
              type="number"
              placeholder="Height"
              onChange={handleOnChange}
            />
            <label htmlFor="password">Height</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              name="weight"
              type="number"
              placeholder="Weight"
              onChange={handleOnChange}
            />
            <label htmlFor="password">Weight</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Form>
          <div className="mb-3">
            <Form.Label htmlFor="exampleColorInput">Hypoallergenic</Form.Label>{" "}
            <Form.Check
              onChange={handleOnChange}
              inline
              label="Yes"
              value={true}
              name="hypoallergenic"
              type="radio"
              id="inline-radio-1"
            />
            <Form.Check
              onChange={handleOnChange}
              inline
              label="No"
              value={false}
              name="hypoallergenic"
              type="radio"
              id="inline-radio-2"
            />
          </div>
        </Form>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              name="color"
              type="text"
              placeholder="Color"
              onChange={handleOnChange}
            />
            <label htmlFor="firstName">Color</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              name="breed"
              type="text"
              placeholder="breed"
              onChange={handleOnChange}
            />
            <label htmlFor="lastName">Breed</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel className="mb-3" label="Dietary Restrictions">
            <Form.Control
              as="textarea"
              name="diet"
              placeholder="Bio"
              style={{ height: "100px" }}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel name="bio" className="mb-3" label="Bio">
            <Form.Control
              as="textarea"
              name="bio"
              placeholder="Bio"
              style={{ height: "100px" }}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="float-end mb-3">
        <Col>
          <Button onClick={handleSubmit} type="submit">
            Add Pet
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default AddPetForm;
