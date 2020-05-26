//import react
import React, { useState, useEffect } from "react";
//convert markdown to html
import showdown from "showdown";
//page redirection
import { Link, Redirect } from "react-router-dom";

//url to pull random tacos from
const RANDOM_TACO_URL = "http://taco-randomizer.herokuapp.com//random/";

function TacoRecipe() {
  //when we render get a new random taco
  useEffect(() => {
    getRandomTaco();
  }, []);

  //setstate for getting a random taco JSON
  const [tacoJSON, setTacoJSON] = useState([]);

  //function to get a random taco JSON
  const getRandomTaco = async () => {
    const data = await fetch(RANDOM_TACO_URL);
    const tacoJSON = await data.json();
    setTacoJSON(tacoJSON);
  };

  console.log("tacoJSON:", tacoJSON);
  //create converter for markdown conversion
  var converter = showdown.Converter();

  //get Recipe
  //convert the Recipe from markdown to raw HTML
  //get Slug for page redirection

  var baseLayerRecipe = ((tacoJSON || {}).base_layer || {}).recipe;
  var baseLayerSlug = ((tacoJSON || {}).base_layer || {}).slug;

  var mixinRecipe = ((tacoJSON || {}).mixin || {}).recipe;
  var mixinSlug = ((tacoJSON || {}).mixin || {}).slug;

  var seasoningRecipe = ((tacoJSON || {}).seasoning || {}).recipe;
  var seasoningSlug = ((tacoJSON || {}).seasoning || {}).slug;

  var condimentRecipe = ((tacoJSON || {}).condiment || {}).recipe;
  var condimentSlug = ((tacoJSON || {}).condiment || {}).slug;

  var shellRecipe = ((tacoJSON || {}).shell || {}).recipe;
  var shellSlug = ((tacoJSON || {}).shell || {}).slug;

  //create a permalink
  var permalink =
    "/" +
    baseLayerSlug +
    "/" +
    mixinSlug +
    "/" +
    seasoningSlug +
    "/" +
    condimentSlug +
    "/" +
    shellSlug;

  //using the permalink and tacoJSON to test for undefined values
  var undefinedCheck = false;
  if (tacoJSON.length !== 0) {
    permalink.split("/").forEach(function (item) {
      if (item === "undefined") {
        undefinedCheck = true;
      }
    });
  }

  //debug log for undefined check
  console.log("undefinedCheck:", undefinedCheck);

  // final check to see if we grabbed undefined data
  if (!undefinedCheck) {
    return (
      <div className="tacoRecipe">
        <h1>Taco Recipe</h1>
        <div className="row">
          <div className="col-12">
            <Link to={permalink}>Permalink</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <pre>{baseLayerRecipe}</pre>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <pre>{mixinRecipe}</pre>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <pre>{seasoningRecipe}</pre>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <pre>{condimentRecipe}</pre>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <pre>{shellRecipe}</pre>
          </div>
        </div>
      </div>
    );
  } else {
    // if we catch a problem, take us to the error pages
    return <Redirect to="/error" />;
  }
}

//export the pages
export default TacoRecipe;
