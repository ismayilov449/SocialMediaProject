// *
// *
// *
// *
//  REGISTER WITHOUT HOOKS
// *
// *
// *
// *
import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { userActions } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  render() {
    return (
      <div className="col-lg-8 offset-lg-2">
        <h2>Register</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.actions.register(this.state);
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
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
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
          <Button color="primary">Register</Button>
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
      register: bindActionCreators(userActions.register, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
