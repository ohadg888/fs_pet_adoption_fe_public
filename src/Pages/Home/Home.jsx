import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import "./style.css";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Home() {
  const { setCurrentPage } = useContext(AppContext);
  let location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <div className="Home">
      <h1>Welcome User</h1>
      <h3>this project is a project</h3>
    </div>
  );
}

export default Home;
