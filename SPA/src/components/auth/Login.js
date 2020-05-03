// *
// *
// *
// *
//  LOGIN WITHOUT HOOKS
// *
// *
// *
// *

import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../redux/actions/userActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <div className="col-lg-8 offset-lg-2">
        <h2>Login</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.actions.login(this.state.username, this.state.password);
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
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
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <Button color="primary">Login</Button>
          <Link to="/register" color="secondary">
            Register
          </Link>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(userActions.login_success, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
