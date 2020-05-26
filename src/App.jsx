//import React
import React from "react";
//import router components for page redirection and endpoint creation
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import stylesheet
import "./App.css";
//import components
import {
  Header,
  TacoRecipe,
  FullTacoRecipe,
  ErrorPage,
  Contributors,
  Contributions,
} from "./components";

class App extends React.Component {
  //state constructor
  constructor(props) {
    super(props);
    this.state = {
      tacoJSON: {},
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <div className="content" role="main">
            <Switch>
              <Route path="/" exact component={TacoRecipe} />
              <Route
                path="/:base_layers/:mixins/:seasonings/:condiments/:shells"
                exact
                component={FullTacoRecipe}
              />
              <Route path="/contributors" exact component={Contributors} />
              <Route
                path="/contributors/:user"
                exact
                component={Contributions}
              />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
