import React, { useState } from "react";
import postsReducer from "../../redux/reducers/postsReducer";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

function PostDetail({ history, ...props }) {
  const [post, setPost] = useState({ ...props.post });

  // return (<PostDetails post={post}></PostDetails>);
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Link to="profile/">{post.username}</Link>
        </CardTitle>
      </CardBody>
      <CardImg width="100%" src={post.imgUrl} alt="Card image cap" />
      <CardBody>
        <CardText>{post.text}</CardText>
        {post.comments.length !== 0
          ? post.comments.map((comment) => (
              <CardText key={comment.id}>{comment.text}</CardText>
            ))
          : {}}
      </CardBody>
    </Card>
  );
}

export function getPostById(posts, postId) {
  console.log("Post ID" + postId);
  let post = posts.find((post) => post.id == postId) || null;

  return post;
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.postId;
  console.log(state.getPostsReducer.length);
  const post =
    postId && state.getPostsReducer.length > 0
      ? getPostById(state.getPostsReducer, postId)
      : {};

  return {
    post,
  };
}

export default connect(mapStateToProps)(PostDetail);
