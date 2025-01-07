import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <>
      <Spinner
        animation="border"
        role="status"
        style={{
          margin: "auto",
          display: "block",
          width: "100px",
          height: "100px",
        }}
      ></Spinner>
    </>
  );
}

export default Loader;
