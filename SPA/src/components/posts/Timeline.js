import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as POSTACTIONS from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import Post from "../posts/Post";

class Timeline extends Component {
  componentDidMount() {
    this.props.actions.getPosts();
  }

  render() {
    return (
      <div>
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
      getPosts: bindActionCreators(POSTACTIONS.getPosts,dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    posts: state.postReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
