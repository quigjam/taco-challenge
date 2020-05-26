//import react
import React, { useEffect, useState } from "react";
//import for page redirection
import { Link } from "react-router-dom";
//import for user display
import { Card } from "react-bootstrap";

//url to pull the list of users
const CONTRIBUTOR_URL = "http://taco-randomizer.herokuapp.com/contributions/";
export default function Contributor() {
  //on effect, get the list of contributors
  useEffect(() => {
    getUsers();
  }, []);
  //initalize states
  const [usersJSON, setUserJSON] = useState([]);
  const [user, setUser] = useState([]);

  //get the current list of tacofancy contributors
  const getUsers = async () => {
    //pull data from url
    const usersData = await fetch(CONTRIBUTOR_URL);
    //convert data to JSON
    const usersJSON = await usersData.json();
    //sort contributors alphabetically
    usersJSON.sort(function (a, b) {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
    //set states
    setUserJSON(usersJSON);
  };

  //update search value when it changes
  const updateName = (event) => {
    setUser(event.target.value);
  };

  let currentList = [];
  let newList = [];

  //if there is a search value and userJSON is not undefined
  //https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j
  if (user && usersJSON.length !== 0) {
    // Assign the original list to currentList
    currentList = usersJSON;
    // Use .filter() to determine which items should be displayed
    // based on the search terms
    newList = currentList.filter((userObj) => {
      // change current item to lowercase
      const lc = userObj.username.toLowerCase();
      console.log(lc);
      // change search term to lowercase
      const filter = JSON.stringify(user).toLowerCase();
      // check to see if the current list item includes the search term
      // If it does, it will be added to newList. Using lowercase eliminates
      // issues with capitalization in search terms and search content
      console.log(lc);
      console.log(filter);
      console.log("they equal?", lc === filter);
      //console.log(lc.match(filter));

      return lc.includes(filter);
    });
    console.log(newList);
  } else {
    // If the search bar is empty, set newList to original task list
    newList = usersJSON;
  }

  return (
    <div>
      <div className="md-form mt-0">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={user}
          onChange={updateName}
        />
      </div>
      <br></br>
      <div>
        {usersJSON.map((user) => (
          <div className="row">
            <Link to={"/contributors/" + user.username}>{user.username}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
