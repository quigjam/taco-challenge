//import React
import React from "react";
//import for page redirection
import { Link } from "react-router-dom";
export default function ErrorPage() {
  //load this page and display when an error or unexpected endpoint is encountered
  return (
    <div className="alert alert-danger">
      <h1>Error</h1>
      <p> We are sorry an error has occured</p>
      <Link to="/">Return to Taco Central</Link>
    </div>
  );
}
