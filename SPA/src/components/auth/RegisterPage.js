// *
// *
// *
// *
//  REGISTER WITHOUT HOOKS
// *
// *
// *
// *

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { userActions } from "../../redux/actions/userActions";

function RegisterPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { username, password, email } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username && email && password) {
      dispatch(
        userActions.register({
          username: username,
          password: password,
          email: email,
        })
      );
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
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
              type="text"
              name="email"
              id="email"
              placeholder="Email"
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
        <Button color="primary">Register</Button>
      </Form>
    </div>
  );
}

export default RegisterPage;