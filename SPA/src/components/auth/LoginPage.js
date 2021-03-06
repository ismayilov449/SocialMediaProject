// *
// *
// *
// *
//  LOGIN WITH HOOKS
// *
// *
// *
// *

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";

import { userActions } from "../../redux/actions/userActions";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;
  const loggingIn = useSelector(
    (state) => state.authenticationReducer.loggingIn
  );
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col sm={7}>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={7}>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <Button color="primary">
          {loggingIn && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Login
        </Button>
        <Link to="/register" color="secondary">
          Register
        </Link>
      </Form>

    </div>
  );
}

export default LoginPage;
