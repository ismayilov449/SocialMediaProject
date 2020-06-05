import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import Timeline from "../posts/Timeline";
import ProfileHeader from "./ProfileHeader";
import { Col, Row } from "reactstrap";
import ProfileIntro from "./ProfileIntro";
import "../profile/profileStyle.css";

class Profile extends Component {
  state = {
    profile: true,
    posts: [],
  };

  render() {
    return (
      <div>
        <ProfileHeader username={this.props.username}></ProfileHeader>
        <Row>
          <Col xs="4">
            <ProfileIntro></ProfileIntro>
          </Col>
          <Col xs="8">
            <Timeline username={this.props.username}></Timeline>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    posts: state.postsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserPosts: bindActionCreators(postActions.getSpecPosts, dispatch),
    },
  };
}
export default connect(mapStatToProps, mapDispatchToProps)(Profile);
