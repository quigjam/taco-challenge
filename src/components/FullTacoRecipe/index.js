//import React
import React, { useState, useEffect } from "react";
//import for page redirecting
import { Link, Redirect } from "react-router-dom";

//urls to pull specific recipes
const BASE_LAYER_URL = "http://taco-randomizer.herokuapp.com/base_layers/";
const MIXIN_URL = "http://taco-randomizer.herokuapp.com/mixins/";
const SEASONING_URL = "http://taco-randomizer.herokuapp.com/seasonings/";
const CONDIMENT_URL = "http://taco-randomizer.herokuapp.com/condiments/";
const SHELL_URL = "http://taco-randomizer.herokuapp.com/shells/";

function FullTacoRecipe() {
  //on effect, get taco
  useEffect(() => {
    getTaco();
  }, []);

  // initalize states
  const [tacoJSON, setTacoJSON] = useState([]);
  //const [statusCode, setStatusCode] = useState([]);

  //gets a taco based on the url
  const getTaco = async () => {
    //check for funny buisness
    var url = window.location.href;
    if (typeof url != undefined) {
      //split the url to get components for fetch
      var splitURL = url.split("/");

      //pull information on components
      const baseLayerData = await fetch(BASE_LAYER_URL + splitURL[3] + "/");
      const baseLayerJSON = await baseLayerData.json();
      console.log("BaseLayerJSon:", baseLayerJSON);

      const mixinData = await fetch(MIXIN_URL + splitURL[4] + "/");
      const mixinJSON = await mixinData.json();
      console.log("mixinJSON", mixinJSON);

      const seasonData = await fetch(SEASONING_URL + splitURL[5] + "/");
      const seasonJSON = await seasonData.json();
      console.log("SeasoningJSON", seasonJSON);

      const condData = await fetch(CONDIMENT_URL + splitURL[6] + "/");
      const condJSON = await condData.json();
      console.log("CondimentsJSON", condJSON);

      const shellData = await fetch(SHELL_URL + splitURL[7] + "/");
      const shellJSON = await shellData.json();

      //create a condensed object of information fetched
      const tacoJSON = {
        base_layer: baseLayerJSON,
        mixin: mixinJSON,
        seasoning: seasonJSON,
        condiment: condJSON,
        shell: shellJSON,
      };
      //set state
      setTacoJSON(tacoJSON);
    }
  };

  //log for debugging
  console.log("tacoJSON", tacoJSON);

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
            <Link to="/">Get Another Taco</Link>
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

//export FullTacoRecipe
export default FullTacoRecipe;
