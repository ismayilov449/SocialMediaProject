import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { commentActions } from "../../redux/actions/commentActions";
import { postActions } from "../../redux/actions/postActions";
import { history } from "../../redux/services/helper/history";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ShareComment extends Component {
  state = {
    text: "",
    postId: "",
  };

  componentDidMount() {
    this.setState({ postId: this.props.post.id });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ postId: this.props.post.id });
    this.props.actions.addComment(this.state);

    this.props.inProfile === false
      ? this.props.actions.getAll() &&
        this.props.actions.getAll() &&
        history.push("/")
      : this.props.actions.getUserPosts(this.props.post.username) &&
        this.props.actions.getUserPosts(this.props.post.username);
  }

  render() {
    return (
      <div>
        <br />

        <Form
          onSubmit={(e) => this.handleSubmit(e)}
          onKeyDown={(e) => {
            if (window.event.keyCode == "13") {
              this.handleSubmit(e);
            }
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <InputGroup>
                <Input
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Comment"
                  style={{
                    background: "#4e4f50",
                    color: "white",
                    fontSize: "20px",
                    borderWidth: "0",
                  }}
                  onChange={(e) => {
                    this.setState({ text: e.target.value });
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button type="submit">Reply</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </FormGroup>

          {/* <Button color="primary">Add comment</Button> */}
        </Form>
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
      addComment: bindActionCreators(commentActions.addComment, dispatch),
      getAll: bindActionCreators(postActions.getAll, dispatch),
      getUserPosts: bindActionCreators(postActions.getSpecPosts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareComment);
