import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import profileIcon from "../../Assets/profileIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import AuthModal from "../../Components/AuthModal/AuthModal";

function Navbar() {
  const { currentPage, userID, setUserID } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState(profileIcon);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  const handleSignout = () => {
    setUserID(null);
  };
  return (
    <div className="Navbar">
      <ul className="navbar-pages">
        <li
          className={
            currentPage === "/Home" || currentPage === "/"
              ? "navbar-link-active"
              : "navbar-link"
          }
        >
          <Link to="/Home">Home</Link>
        </li>
        <li
          className={
            currentPage === "/Profile" ? "navbar-link-active" : "navbar-link"
          }
        >
          <Link to="/Profile">Profile</Link>
        </li>
      </ul>
      <div className="navbar-rightside">
        {profilePic && (
          <div className="profile-image-wrap">
            <img src={profilePic} alt="profile pic" />
          </div>
        )}
        {userID ? (
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
            <AuthModal setShowModal={setShowModal} showModal={showModal} />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
