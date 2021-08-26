import React from "react";
import { Spinner } from "react-bootstrap";

function Loader(params) {
  return (
    <div className="loader-wrap">
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
    </div>
  );
}

export default Loader;
