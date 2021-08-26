import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Card, Button, Badge } from "react-bootstrap";
import SaveButton from "../SaveButton";
import { Link, useParams } from "react-router-dom";

function PetCard(props) {
  const { userInfo, setPetPageInfo } = useContext(AppContext);
  const { petInfo } = props;
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
      <Card className="list-card">
        <Card.Img
          variant="top"
          style={{ height: "190px" }}
          src={`http://localhost:8000/${petInfo.picture}`}
        />
        <Card.Body>
          <Card.Title>
            {petInfo.name} <Badge bg={statusColor}>{petInfo.status}</Badge>
            <SaveButton petID={petInfo._id} />
          </Card.Title>
          <Card.Text>{petInfo.bio}</Card.Text>
          <Link to={`/PetPage/${petInfo._id}`}>
            <Button variant="primary">See More</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default PetCard;
