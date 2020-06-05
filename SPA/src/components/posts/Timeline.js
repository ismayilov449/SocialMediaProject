import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import Post from "../posts/Post";
import SharePost from "../posts/SharePost";
import { history } from "../../redux/services/helper/history";

class Timeline extends Component {
  // componentDidMount() {

  //   // this.props.actions.getAll();
  //  // console.log(this.props.posts);
  // // this.props.actions.getUserPosts(this.props.username);
  // }

  state = {
    inProfile: false,
  };

  componentDidMount() {
    if (this.props.username === undefined) {
      this.props.actions.getAll();
      this.setState({ inProfile: false });
    } else {
      this.props.actions.getUserPosts(this.props.username);
      this.setState({ inProfile: true });
    }
  }

  render() {
    return (
      <div>
        <ListGroup
          style={{ background: "transparent", margin: "5px", padding: "0px" }}
        >
          <ListGroupItem
            style={{
              background: "#242526",
              borderRadius: "5px",
              margin: "5px",
              marginTop: "0",
            }}
          >
            <SharePost username={this.props.username}></SharePost>
          </ListGroupItem>
          {this.props.posts.map((post) => (
            <ListGroupItem
              key={post.id}
              style={{
                background: "#242526",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <Post
                inProfile={this.state.inProfile}
                user={this.props.user}
                post={post}
                like={this.props.actions.like}
                dislike={this.props.actions.dislike}
                deletePost={this.props.actions.deletePost}
                editPost={this.props.actions.editPost}
                update={this.props.actions.getAll}
                updateWithUser={this.props.actions.getUserPosts}
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
      editPost: bindActionCreators(postActions.editPost, dispatch),
      getUserPosts: bindActionCreators(postActions.getSpecPosts, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    user: state.authenticationReducer.user,
    posts: state.postsReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
