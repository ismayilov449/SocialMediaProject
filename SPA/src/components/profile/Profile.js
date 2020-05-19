import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import Timeline from "../posts/Timeline";

class Profile extends Component {
  state = {
    profile: true,
    posts: [],
  };

  componentWillMount() {
    this.props.actions.getUserPosts(this.props.username);
  }

  componentDidMount() {
    this.props.actions.getUserPosts(this.props.username);

    this.setState({
      posts: this.props.posts,
    });
  }

  render() {
    return (
      <div>
        <Timeline
          specPosts={this.state.posts}
          profile={this.state.profile}
        ></Timeline>
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
