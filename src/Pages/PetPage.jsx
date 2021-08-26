import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import {
  Container,
  Row,
  Button,
  Modal,
  Col,
  Image,
  Card,
  Badge,
} from "react-bootstrap";
import { useLocation, Link, useParams } from "react-router-dom";
import AddPetForm from "../Components/AddPetForm";

function PetPage() {
  const { userInfo, userToken } = useContext(AppContext);
  let { id } = useParams();
  const [petInfo, setPetInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [petStatus, setPetStatus] = useState(false);
  const [statusColor, setStatusColor] = useState("success");
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://pet-project-itc.herokuapp.com/api/pet/${id}`,
        {
          method: "GET",
        }
      );
      const body = await result.json();
      setPetInfo(body.result);
    };
    fetchData();
  }, [petStatus]);

  useEffect(() => {
    if (petInfo && petInfo.status === "adopted") {
      setStatusColor("danger");
    } else if (petInfo && petInfo.status === "foster") {
      setStatusColor("warning");
    } else {
      setStatusColor("success");
    }
  }, [petInfo]);

  const handleAdopt = async (type) => {
    const result = await fetch(
      `https://pet-project-itc.herokuapp.com/api/pet/${petInfo._id}/adopt`,
      {
        method: "POST",
        body: JSON.stringify({ type: type }),
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const body = await result.json();
    petStatus ? setPetStatus(false) : setPetStatus(true);
  };

  const handleReturn = async () => {
    console.log(petInfo._id);
    const result = await fetch(
      `https://pet-project-itc.herokuapp.com/api/pet/${petInfo._id}/return`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const body = await result.json();
    console.log(body);
    petStatus ? setPetStatus(false) : setPetStatus(true);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6} md={4}>
            <Image
              src={`https://pet-project-itc.herokuapp.com/${
                petInfo && petInfo.picture
              }`}
              thumbnail
            />
          </Col>
          <Col>
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Subtitle className="mb-2 text-muted">
                      Type
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.type}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Name
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      status
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      <Badge bg={statusColor}>
                        {petInfo && petInfo.status}
                      </Badge>
                    </Card.Title>
                  </Col>
                  <Col>
                    <Card.Subtitle className="mb-2 text-muted">
                      breed
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.breed}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      color
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.color}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      height & weight
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.height}
                      {" & "}
                      {petInfo && petInfo.weight}
                    </Card.Title>
                  </Col>
                  <Col>
                    <Card.Subtitle className="mb-2 text-muted">
                      Hypoallergenic
                    </Card.Subtitle>
                    <Card.Title className="mb-4">
                      {petInfo && petInfo.hypoallergenic ? "Yes" : "No"}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Diet restriction
                    </Card.Subtitle>
                    <h6 className="mb-4">{petInfo && petInfo.diet}</h6>
                    <Card.Subtitle className="mb-2 text-muted">
                      Short Bio
                    </Card.Subtitle>
                    <h6 className="mb-4">{petInfo && petInfo.bio}</h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {userInfo && userInfo.role === "admin" && (
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Update Info
          </Button>
        )}{" "}
        {userToken && petInfo && petInfo.status === "available" && (
          <>
            <Button variant="warning" onClick={() => handleAdopt("foster")}>
              Foster
            </Button>{" "}
            <Button variant="success" onClick={() => handleAdopt("adopted")}>
              Adopt
            </Button>
          </>
        )}{" "}
        {userToken && petInfo && petInfo.status !== "available" && (
          <>
            <Button variant="danger" onClick={handleReturn}>
              Return
            </Button>
          </>
        )}{" "}
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>update Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPetForm update={true} petInfo={petInfo} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PetPage;
