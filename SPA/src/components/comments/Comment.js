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

import { history } from "../../redux/services/helper/history";

import { Link } from "react-router-dom";
import "../posts/PostStyle.css";

function Comment({
  inProfile,
  user,
  comment,
  deleteComment,
  editComment,
  update,
  updateWithUser,
}) {
  const [isOpen, setOpen] = useState(false);
  let [isVisibleEdit, setVisibleEdit] = useState(true);

  const toggle = () => setOpen(!isOpen);

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
          <span inline="true">
            <Link
              to={"/profile/" + comment.username}
              onClick={() => {
                var url = "/profile/" + comment.username;
                history.push(url);
              }}
            ></Link>
            <small>
              {"\t\t"} {formatDate(comment.sharedTime)}
            </small>
          </span>

          {comment.username === user.user.username ? (
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
                    deleteComment(comment.id);
                    inProfile === true
                      ? updateWithUser(comment.username) &&
                        updateWithUser(comment.username)
                      : update() && update();
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
        <CardText>{comment.text}</CardText>
      </CardBody>
    </Card>
  );
}

export default Comment;
