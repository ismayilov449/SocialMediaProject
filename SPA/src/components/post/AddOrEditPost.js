import React, { Component, useState, useEffect } from "react";
import AddPost from "./AddPost";
import { connect } from "react-redux";
import { savePost } from "../../redux/actions/postActions";

function AddOrEditPost({ posts, savePost, history, ...props }) {
  const [post, setPost] = useState({ ...props.post });

  useEffect(() => {
    setPost({ ...props.post });
  }, [props.post]);

  function handleChange(event) {
    const { name, value } = event.target;

    setPost((previousPost) => ({
      ...previousPost,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    savePost(post).then(() => {
      history.push("/");
    });
  }

  return (
    <AddPost post={post} onChange={handleChange} onSave={handleSave}></AddPost>
  );
}

export function getPostById(posts, postId) {
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

const mapDispatchToProps = {
  savePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPost);
