import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import Post from "../posts/Post";
import SharePost from "../posts/SharePost";

class Timeline extends Component {
  componentDidMount() {
    this.props.actions.getAll();
  }

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <SharePost></SharePost>
          </ListGroupItem>
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
      getAll: bindActionCreators(postActions.getAll, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    posts: state.postsReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
