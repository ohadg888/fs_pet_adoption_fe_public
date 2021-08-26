import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import {
  Container,
  Row,
  Modal,
  Table,
  Badge,
  Card,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

function UserModal(props) {
  const { show, onHide, userModalInfo } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col>
                <Card.Subtitle className="mb-2 text-muted">
                  Full Name
                </Card.Subtitle>
                <Card.Title className="mb-4">
                  {userModalInfo.user && userModalInfo.user.firstName}{" "}
                  {userModalInfo.user && userModalInfo.user.firstName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Email Address
                </Card.Subtitle>
                <Card.Title>
                  {userModalInfo.user && userModalInfo.user.email}
                </Card.Title>
              </Col>
              <Col>
                <Card.Subtitle className="mb-2 text-muted">
                  Phone Number
                </Card.Subtitle>
                <Card.Title className="mb-4">
                  {userModalInfo.user && userModalInfo.user.phoneNumber}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Role Type
                </Card.Subtitle>
                <Card.Title>
                  {userModalInfo.user && (
                    <Badge
                      bg={
                        userModalInfo.user.role === "admin"
                          ? "primary"
                          : "secondary"
                      }
                    >
                      {userModalInfo.user.role}
                    </Badge>
                  )}
                </Card.Title>
              </Col>
              <Col>
                <Card.Subtitle className="mb-2 text-muted">
                  Short Bio
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  {userModalInfo.user && userModalInfo.user.bio}
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {userModalInfo.user &&
        userModalInfo.ownedPets &&
        userModalInfo.ownedPets.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>type</th>
                <th>name</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {userModalInfo.ownedPets.map((pet, index) => {
                return (
                  <tr
                    className="table-row"
                    id={pet._id}
                    key={index}
                    onClick={() => {}}
                  >
                    <td>{index + 1}</td>
                    <td>{pet.type}</td>
                    <td>{pet.name}</td>
                    <td>{pet.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h3 style={{ "text-align": "center" }}>
            <Badge bg="warning" text="dark">
              User Have No Pet
            </Badge>
          </h3>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default UserModal;
