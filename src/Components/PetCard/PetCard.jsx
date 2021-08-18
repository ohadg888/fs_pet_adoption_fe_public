import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Card, Button, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import dogpic from "../../Assets/dogpic.jfif";

function PetCard(props) {
  const { petInfo, petID } = props;
  const [statusColor, setStatusColor] = useState("success");

  useEffect(() => {
    if (petInfo.status === "adopted") {
      setStatusColor("danger");
    } else if (petInfo.status === "foster") {
      setStatusColor("warning");
    }
  }, []);

  return (
    <>
      <Card className="list-card" id={petID}>
        <Card.Img variant="top" src={dogpic} />
        <Card.Body>
          <Card.Title>
            {petInfo.name} <Badge bg={statusColor}>{petInfo.status}</Badge>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">See More</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default PetCard;
