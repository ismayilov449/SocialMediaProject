import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

export default class Login extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            <Col sm={5}>
              <Input type="email" name="email" id="email" placeholder="Email" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={5}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </Col>
          </FormGroup>

          <Button>Login</Button>
        </Form>
      </div>
    );
  }
}
