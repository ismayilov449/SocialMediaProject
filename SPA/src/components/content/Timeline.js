import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as timelineActions from "../../redux/actions/timeLineActions";
import Post from "../post/Post";
import { ListGroup, ListGroupItem } from "reactstrap";
import AddPost from "../post/AddPost";
import { savePost } from "../../redux/actions/postActions";
import history from "react";
import { Link } from "react-router-dom";

class Timeline extends Component {
  componentDidMount() {
    this.props.actions.getPosts();
  }
  render() {
    return (
      <div>
        <Link to="/addpost">Share post</Link>
        <ListGroup>
          {this.props.posts.map((post) => (
            <ListGroupItem key={post.id}>
              <Post post={post}></Post>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(timelineActions.getPosts, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    posts: state.getPostsReducer,
    post: {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
