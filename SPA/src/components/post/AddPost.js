import React, { Component } from "react";
import TextInput from "../toolbox/TextInput";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postActions";
import { connect } from "react-redux";

const AddPost = ({ posts, post, onSave, onChange }) => {
  return (
    <form onSubmit={onSave}>
      <TextInput
        name="text"
        label="Text"
        value={post.text}
        onChange={onChange}
      ></TextInput>
       

      <button type="submit" className="btn btn-success">
        Share
      </button>
    </form>
  );
};

export default AddPost;
