import React, { Component } from "react";
import { Col, Jumbotron, Container, Button } from "reactstrap";
import "./profileStyle.css";

export default class ProfileHeader extends Component {
  render() {
    return (
      <div className="mainDiv">
        <Jumbotron fluid style={{ background: "#272829" }}>
          <Container fluid>
            <h1 className="display-3" style={{ color: "white" }}>
              {this.props.username}
            </h1>

            <p className="lead" style={{ color: "white" }}>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
            <Button outline color="info" style={{ float: "right" }}>
              Send friend request
            </Button>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
