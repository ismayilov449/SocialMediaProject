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

function Post({ user, post, like, dislike, deletePost, edit, update }) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  return (
    <Card body inverse style={{ backgroundColor: "#333", borderColor: "#333" }}>
      <CardTitle>
        <div class="post">
          <Link to="profile/">{post.username}</Link>
          {post.username === user.user.username ? (
            <ButtonDropdown left isOpen={isOpen} toggle={toggle}>
              <DropdownToggle size="sm">More</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    update();
                    deletePost(post.id);
                    update();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          ) : (
            <div></div>
          )}
        </div>
      </CardTitle>
      {/* <CardImg width="100%" src={post.imgUrl} alt="Card image cap" /> */}
      <CardBody>
        <CardText>{post.text}</CardText>
        <CardText>Likes : {post.likeCount}</CardText>

        {post.likes.some((u) => u.username === user.user.username) ? (
          <Button
            outline
            color="info"
            onClick={() => {
              update();

              dislike(post.id);
              update();
            }}
          >
            Dislike
          </Button>
        ) : (
          <Button
            outline
            color="info"
            onClick={() => {
              update();

              like(post.id);
              update();
            }}
          >
            Like
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

export default Post;
