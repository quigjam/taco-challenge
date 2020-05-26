//import react
import React, { useState, useEffect } from "react";
//urls to get user contributions and bypass cors
const CONTRIBUTOR_URL = "http://taco-randomizer.herokuapp.com/contributions/";
const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const Contributions = (props) => {
  //on effect, get the user's contributions
  useEffect(() => {
    getContributions();
  }, []);
  {
  }
  //set state for contribution
  const [contributions, setContributions] = useState([]);

  //pull the users's contributions
  const getContributions = async () => {
    //make sure nothing funny is going on
    var url = window.location.href;
    if (typeof url != undefined) {
      //get the username from the url
      var splitURL = url.split("/");
      //fetch the data from tacofancy api
      const contrData = await fetch(
        CORS_ANYWHERE + CONTRIBUTOR_URL + splitURL[4]
      );
      //convert data to an object
      const contrJSON = await contrData.json();
      //set state
      setContributions(contrJSON);
    }
  };

  //initalize values outside of conditional for scope
  var user = "";
  var baseLayer = [];
  var condiment = [];
  var mixin = [];
  var seasoning = [];
  var shell = [];

  //if we did not pull an undefined value
  if (contributions.length !== 0) {
    //log for error checking
    console.log(contributions);
    //set the values
    user = contributions.username;
    baseLayer = contributions.base_layers;
    condiment = contributions.condiments;
    mixin = contributions.mixins;
    seasoning = contributions.seasonings;
    shell = contributions.shells;
  }

  return (
    <div>
      <div className="row">
        <h1>{user}</h1>
      </div>
      <br></br>
      <div className="row">
        <h3>Base Layers: </h3>
      </div>
      <div className="row">{baseLayer.map((item) => item + ", ")}</div>
      <br></br>
      <div className="row">
        <h3>Mixins: </h3>
      </div>
      <div className="row">{mixin.map((item) => item + ", ")}</div>
      <br></br>
      <div className="row">
        <h3>Condiments: </h3>
      </div>
      <div className="row">{condiment.map((item) => item + ", ")}</div>
      <br></br>
      <div className="row">
        <h3>Seasoning: </h3>
      </div>
      <div className="row">{seasoning.map((item) => item + ", ")}</div>
      <br></br>
      <div className="row">
        <h3>Shell: </h3>
      </div>
      <div className="row">{shell.map((item) => item + ", ")}</div>
    </div>
  );
};

//export Contributions
export default Contributions;
