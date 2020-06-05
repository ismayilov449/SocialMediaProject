import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { history } from "../../redux/services/helper/history";

class SharePost extends Component {
  state = {
    text: "",
    posts: [],
    history: "",
  };

  componentDidMount() {
    if (this.props.username === undefined) {
      this.props.actions.getAll();
    }

    this.setState({ history: history });
  }

  render() {
    return (
      <div>
        <Form
          style={{ background: "#242526", borderRadius: "5px" }}
          onSubmit={(e) => {
            e.preventDefault();

            this.props.actions.sharePost(this.state);
            this.props.username === undefined
              ? (this.props.actions.getAll() || this.props.actions.getAll()) &&
                history.push("/")
              : this.props.actions.getUserPosts(this.props.username);
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="text"
                name="text"
                id="textarea"
                placeholder="What do you think hmm.. ?"
                style={{
                  background: "#4e4f50",
                  color: "white",
                  fontSize: "20px",
                  borderWidth: "0",
                  borderRadius: "20px",
                }}
                onChange={(e) => {
                  this.setState({ text: e.target.value });
                }}
              />
            </Col>
          </FormGroup>

          <Button color="primary">Share</Button>
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
      sharePost: bindActionCreators(postActions.sharePost, dispatch),
      getUserPosts: bindActionCreators(postActions.getSpecPosts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePost);
