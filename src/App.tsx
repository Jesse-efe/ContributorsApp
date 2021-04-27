import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Contributors from "./pages/Contributors";
import "./styles/index.scss";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/contributors" component={Contributors} />
      </Switch>
    </div>
  );
}

export default App;
