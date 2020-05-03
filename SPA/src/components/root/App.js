import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import Login from '../auth/Login'
import { PrivateRoute } from "../root/PrivateRoot";
import Timeline from "../posts/Timeline";
import { history } from "../../redux/services/helper/history";

function App() {
  return (
    <div>
      <Container>
        <Navi></Navi>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Timeline} />
            <Route path="/login" component={LoginPage} />
            {/* <Route path="/register" component={RegisterPage} /> */}
            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
