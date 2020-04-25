import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

import { Link } from "react-router-dom";

function Post({ post }) {
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

        <Link to={"/postdetail/" + post.id}>Read more..</Link>
      </CardBody>
    </Card>
  );
}

export default Post;
