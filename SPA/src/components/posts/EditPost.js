import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { history } from "../../redux/services/helper/history";

class EditPost extends Component {
  state = {
    id: "",
    text: "",
  };

  componentDidMount() {
    this.props.actions.getAll();
    document.getElementById("editPostText").defaultValue = this.props.post.text;
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.post.text = this.state.text;
            this.props.actions.editPost(this.props.post);
            this.props.setVisible(true);

            history.replace("/");
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="textarea"
                name="text"
                id="editPostText"
                placeholder="Type here"
                onChange={(e) => {
                  this.setState({ text: e.target.value });
                }}
              />
            </Col>
          </FormGroup>

          <Button color="primary">Save</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAll: bindActionCreators(postActions.getAll, dispatch),
      editPost: bindActionCreators(postActions.editPost, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
