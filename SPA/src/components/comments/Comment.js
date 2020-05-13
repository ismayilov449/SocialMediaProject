import React from "react";
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

function Comment({ user, comment, deleteComment, editComment, update }) {
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <Card
      style={{
        backgroundColor: "#444",
        borderWidth: 0,
        textDecoration: "none",
      }}
    >
      <CardTitle>
        <div className="post">
          <span inline='true'>
            <Link to="profile/">{comment.username}</Link>
            <small>
              {"\t\t"} {formatDate(comment.sharedTime)}
            </small>
          </span>

          {/* {post.username === user.user.username ? (
            <ButtonDropdown left isOpen={isOpen} toggle={toggle}>
              <DropdownToggle size="sm">More</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setVisibleEdit(false);
                  }}
                >
                  Edit
                </DropdownItem>
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
          )} */}
        </div>
      </CardTitle>

      {/* <CardImg width="100%" src={post.imgUrl} alt="Card image cap" /> */}
      <CardBody>
        <CardText>{comment.text}</CardText>
      </CardBody>
    </Card>
  );
}

export default Comment;
