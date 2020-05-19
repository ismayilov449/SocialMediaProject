import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import { Switch, Route, Router } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import RegisterPage from "../auth/RegisterPage";
import { PrivateRoute } from "../root/PrivateRoot";
import Profile from "../profile/Profile";
import Timeline from "../posts/Timeline";
import { history } from "../../redux/services/helper/history";
import NotFound from "../common/NotFound";

function App() {
  return (
    <div>
      <Container>
        <Navi></Navi>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Timeline} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              path="/profile/:username?"
              // component={Profile}
              render={(props) => (
                <Profile username={props.match.params.username} {...props} />
              )}
            />
            {/* <Redirect from="*" to="/" /> */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
