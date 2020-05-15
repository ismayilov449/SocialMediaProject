import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Comment from "../comments/Comment";
import { commentActions } from "../../redux/actions/commentActions";
import { postActions } from "../../redux/actions/postActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CommentList extends Component {
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
                deleteComment={this.props.actions.deleteComment}
                update={this.props.actions.getAll}
                // like={this.props.actions.like}
                // dislike={this.props.actions.dislike}
                // editPost={this.props.actions.editPost}
              ></Comment>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteComment: bindActionCreators(commentActions.deleteComment, dispatch),
      getAll: bindActionCreators(postActions.getAll, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
