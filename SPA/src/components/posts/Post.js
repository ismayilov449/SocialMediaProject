import React, { useState } from "react";
import {
  Card,
  Button,
  CardText,
  CardBody,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  DropdownToggle,
} from "reactstrap";

import { Link } from "react-router-dom";
import "../posts/PostStyle.css";

function Post({ post, like }) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  return (
    <Card body inverse style={{ backgroundColor: "#333", borderColor: "#333" }}>
      <CardTitle>
        <div class="post">
          <Link to="profile/">{post.username}</Link>
          <ButtonDropdown left isOpen={isOpen} toggle={toggle}>
            <DropdownToggle size="sm">More</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </CardTitle>
      {/* <CardImg width="100%" src={post.imgUrl} alt="Card image cap" /> */}
      <CardBody>
        <CardText>{post.text}</CardText>
        <CardText>Likes : {post.likeCount}</CardText>

        <Button outline color="info" onClick={() => like(post.id)}>
          Like
        </Button>
        {/* <Link to={"/postdetail/" + post.id}>Read more..</Link> */}
      </CardBody>
    </Card>
  );
}

export default Post;
