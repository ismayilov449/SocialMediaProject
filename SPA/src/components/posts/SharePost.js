import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../redux/actions/postActions";
import { history } from "../../redux/services/helper/history";

class SharePost extends Component {
  state = {
    text: "",
  };

  render() {
    return (
      <div>
        <h2>What do you think hmm.. ?</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.actions.sharePost(this.state);
            history.push("/");
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="text"
                name="text"
                id="text"
                placeholder="Type here"
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sharePost: bindActionCreators(postActions.sharePost, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePost);
