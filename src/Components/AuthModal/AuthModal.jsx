import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AppContext from "../../Context/AppContext";

function AuthModal(props) {
  const { showModal, setShowModal } = props;
  const { setUserToken } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginFormData, setLoginFormData] = useState({});
  const [signupFormData, setSignupFormData] = useState({});

  const handleSubmit = async () => {
    let result, body;
    try {
      if (isLogin) {
        result = await fetch(
          "https://pet-project-itc.herokuapp.com/api/login",
          {
            method: "POST",
            body: JSON.stringify({ loginFormData: loginFormData }),
            headers: { "Content-Type": "application/json" },
          }
        );
        body = await result.json();
        if (body.loggedIn) {
          setUserToken(body.accessToken);
          setShowModal(false);
        }
      } else {
        result = await fetch(
          "https://pet-project-itc.herokuapp.com/api/signup",
          {
            method: "POST",
            body: JSON.stringify({ signupFormData: signupFormData }),
            headers: { "Content-Type": "application/json" },
          }
        );
        body = await result.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    if (isLogin) {
      setLoginFormData((prevState) => {
        const copy = { ...prevState };
        copy[e.target.id] = e.target.value;
        return copy;
      });
    } else {
      setSignupFormData((prevState) => {
        const copy = { ...prevState };
        copy[e.target.id] = e.target.value;
        return copy;
      });
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Button variant="secondary" onClick={() => setIsLogin(true)}>
          Log In
        </Button>
        <Button variant="primary" onClick={() => setIsLogin(false)}>
          Sign Up
        </Button>
      </Modal.Header>
      <Modal.Body>
        {isLogin ? (
          <Form>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  autoComplete="new-password"
                  type="password"
                  placeholder="Enter password"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  type="password"
                  placeholder="Re-enter password"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
