import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect, useHistory } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader";
import {
  Container,
  Row,
  Modal,
  Table,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AddPetForm from "../Components/AddPetForm";
import UserModal from "../Components/UserModal";

function Dashboard() {
  const { petsList, setPetsList, userToken, setCurrentPage } =
    useContext(AppContext);
  const [usersList, setUsersList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [userModalInfo, setUserModalInfo] = useState({});
  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchPets = async () => {
      const result = await fetch("http://localhost:8000/api/pet", {
        method: "GET",
      });
      const body = await result.json();
      console.log(body.result);
      setPetsList(body.result);
    };

    fetchPets();
    const fetchData = async () => {
      const result = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const body = await result.json();
      setUsersList(body.result);
    };
    fetchData();
    setCurrentPage(location.pathname);
  }, []);

  useEffect(() => {
    console.log(userModalInfo);
  }, [userModalInfo]);

  const handleOnClick = (e) => {
    console.log(e.target.parentElement.id);
    setUserModalInfo({
      user: usersList.filter(
        (user) => user._id == e.target.parentElement.id
      )[0],
      ownedPets: petsList.filter(
        (pet) => pet.ownerID == e.target.parentElement.id
      ),
    });
    setModalShow(true);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <h3>Users</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>role</th>
                <th>email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Short Bio</th>
              </tr>
            </thead>
            <tbody>
              {usersList ? (
                usersList.map((user, index) => {
                  return (
                    <tr
                      className="table-row"
                      id={user._id}
                      key={index}
                      onClick={handleOnClick}
                    >
                      <td>{index + 1}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.bio}</td>
                    </tr>
                  );
                })
              ) : (
                <Loader />
              )}
            </tbody>
          </Table>
          <h3>
            Pets {"   "}
            <Link to="/AddPet">
              <Button>
                <FontAwesomeIcon icon={faPlus} /> Add Pet
              </Button>
            </Link>
          </h3>
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
              {petsList ? (
                petsList.map((pet, index) => {
                  return (
                    <tr
                      className="table-row"
                      id={pet._id}
                      key={index}
                      onClick={() => {
                        console.log(333);
                        history.push(`/PetPage/${pet._id}`);
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{pet.type}</td>
                      <td>{pet.name}</td>
                      <td>{pet.status}</td>
                    </tr>
                  );
                })
              ) : (
                <Loader />
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        userModalInfo={userModalInfo}
      />
    </>
  );
}

export default Dashboard;
