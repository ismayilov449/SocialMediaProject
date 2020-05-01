import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import NotFound from "../common/NotFound";

function App() {
  return (
    <div>
      <Container>
        <Navi></Navi>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/" component={Dashboard}></Route>
          <Route path="/home" component={Dashboard}></Route>

          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
