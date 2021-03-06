import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Alert, FloatingLabel, Button } from "react-bootstrap";
import AppContext from "../../Context/AppContext";

function ProfileForm() {
  const { userToken, userInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormData((prevState) => {
      const copy = { ...prevState };
      copy[e.target.id] = e.target.value;
      return copy;
    });
  };

  useEffect(() => {
    error ? setErrorDisplay(true) : setErrorDisplay(false);
  }, [error]);

  const handleSubmit = async () => {
    try {
      const result = await fetch(
        `https://pet-project-itc.herokuapp.com/api/user/${userInfo._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ dataToUpdate: formData }),
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const body = await result.json();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="email"
              type="email"
              placeholder="name@example.com"
              onChange={handleOnChange}
              defaultValue={userInfo && userInfo.email}
            />
            <label htmlFor="email">Email address</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <label htmlFor="password">Password</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleOnChange}
              defaultValue={userInfo && userInfo.firstName}
            />
            <label htmlFor="firstName">First Name</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleOnChange}
              defaultValue={userInfo && userInfo.lastName}
            />
            <label htmlFor="lastName">Last Name</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              onChange={handleOnChange}
              defaultValue={userInfo && userInfo.phoneNumber}
            />
            <label htmlFor="phone">Phone Number</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="bio" className="mb-3" label="Short Bio">
            <Form.Control
              as="textarea"
              name="bio"
              placeholder="Short Bio"
              style={{ height: "100px" }}
              onChange={handleOnChange}
              defaultValue={userInfo && userInfo.bio}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="float-end">
        <Col>
          <Button type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </Col>
      </Row>
      <Row className="float-end">
        <Col>{errorDisplay && <Alert variant="danger">{error}</Alert>}</Col>
      </Row>
    </>
  );
}

export default ProfileForm;
