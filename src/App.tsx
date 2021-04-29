import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Contributors from "./pages/Contributors";
import SingleContributor from "./pages/SingleContributor";
import AppHeader from "./components/AppHeader";
import "./styles/index.scss";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/:organization" component={Contributors} />
        <Route exact path="/contributors/:loginName" component={SingleContributor} />
      </Switch>
    </div>
  );
}

export default App;
