import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import profileIcon from "../../Assets/profileIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AuthModal from "../AuthModal/AuthModal";
import {
  Nav,
  Container,
  NavDropdown,
  FormControl,
  Button,
  Form,
  Navbar,
} from "react-bootstrap";

function TopNavbar() {
  const { currentPage, userToken, setUserToken, setUserID } =
    useContext(AppContext);
  const [profilePic, setProfilePic] = useState(profileIcon);
  const [showModal, setShowModal] = useState(false);

  const handleSignout = () => {
    setUserToken(null);
    setUserID(null);
  };
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand href="#">Adopet</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/Home">Home</Nav.Link>
              {userToken ? (
                <>
                  <Nav.Link href="/Profile">Profile</Nav.Link>
                  <Nav.Link href="/MyPets">My Pets</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link disabled href="/Profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link disabled href="/MyPets">
                    My Pets
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {userToken && (
            <Nav.Link href="/SearchPage">
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
          )}
          {profilePic && (
            <div className="profile-image-wrap">
              <img src={profilePic} alt="profile pic" />
            </div>
          )}
          {userToken ? (
            <button
              className="navbar-handle-user navbar-handle-signout"
              onClick={handleSignout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="navbar-handle-user"
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Log In
              </button>
            </>
          )}
        </Container>
      </Navbar>
      <AuthModal setShowModal={setShowModal} showModal={showModal} />
    </>
  );
}

export default TopNavbar;
