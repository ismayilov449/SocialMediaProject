import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import PostDetail from "../post/PostDetail";
import NotFound from "../common/NotFound";
import AddOrEditPost from "../post/AddOrEditPost";

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/home" component={Dashboard}></Route>
            <Route path="/postdetail/:postId" component={PostDetail}></Route>
            <Route path="/addpost" component={AddOrEditPost}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Container>
      </div>
    );
  }
}
