import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Comment from "../comments/Comment";

export default class CommentList extends Component {
  render() {
    return (
      <div>
        <ListGroup>
          {this.props.comments.map((comment) => (
            <ListGroupItem
              key={comment.id}
              style={{ backgroundColor: "#444", borderColor: "#888" }}
            >
              <Comment
                user={this.props.user}
                comment={comment}
                // like={this.props.actions.like}
                // dislike={this.props.actions.dislike}
                // deletePost={this.props.actions.deletePost}
                // editPost={this.props.actions.editPost}
                // update={this.props.actions.getAll}
              ></Comment>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
