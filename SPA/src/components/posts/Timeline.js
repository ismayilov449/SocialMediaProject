import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import Post from "../posts/Post";
import SharePost from "../posts/SharePost";

class Timeline extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.props.actions.getAll();
    this.setState({ posts: this.props.posts });
  }
 

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <SharePost update={this.componentDidUpdate}></SharePost>
          </ListGroupItem>
          {this.props.posts.map((post) => (
            <ListGroupItem key={post.id}>
              <Post
                user={this.props.user}
                post={post}
                like={this.props.actions.like}
                dislike={this.props.actions.dislike}
                deletePost={this.props.actions.deletePost}
              ></Post>
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
      like: bindActionCreators(postActions.likePost, dispatch),
      dislike: bindActionCreators(postActions.dislikePost, dispatch),
      deletePost: bindActionCreators(postActions.deletePost, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    user: state.authenticationReducer.user,
    posts: state.postsReducer,
    likes: state.likeReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
