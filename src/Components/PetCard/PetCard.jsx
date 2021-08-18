import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Card, Button, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import dogpic from "../../Assets/dogpic.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function PetCard(props) {
  const { petInfo, petID, saved, setSaved } = props;
  const [statusColor, setStatusColor] = useState("success");

  useEffect(() => {
    if (petInfo.status === "adopted") {
      setStatusColor("danger");
    } else if (petInfo.status === "foster") {
      setStatusColor("warning");
    }
  }, []);

  const handleLike = (e) => {
    saved ? setSaved(false) : setSaved(true);
  };

  return (
    <>
      <Card className="list-card" id={petID}>
        <Card.Img
          variant="top"
          style={{ height: "190px" }}
          src={`http://localhost:8000/${petInfo.picture}`}
        />
        <Card.Body>
          <Card.Title>
            {petInfo.name} <Badge bg={statusColor}>{petInfo.status}</Badge>
            <FontAwesomeIcon
              icon={faStar}
              className={`save-btn ${saved ? "saved" : ""}`}
              onClick={handleLike}
            />
          </Card.Title>
          <Card.Text>{petInfo.bio}</Card.Text>
          <Button variant="primary">See More</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default PetCard;
