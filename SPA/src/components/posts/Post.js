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
import EditPost from "./EditPost";
import ShareComment from "../comments/ShareComment";
import CommentList from "../comments/CommentList";

function Post({ user, post, like, dislike, deletePost, update }) {
  let [readMore, setReadMore] = useState(false);
  const [isOpen, setOpen] = useState(false);
  let [isVisibleEdit, setVisibleEdit] = useState(true);
  let [isVisibleComments, setVisibleComments] = useState(false);

  const toggle = () => setOpen(!isOpen);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  function wrapping(text) {
    if (text.length > 200) {
      return true;
    } else {
      return false;
    }
  }

  return isVisibleEdit === true ? (
    <Card body inverse style={{ backgroundColor: "#333", borderColor: "#333" }}>
      <CardTitle>
        <div className="post">
          <span inline="true">
            <Link to="profile/">{post.username}</Link>
            <small>
              {"\t\t"} {formatDate(post.sharedTime)}
            </small>
          </span>

          {post.username === user.user.username ? (
            <ButtonDropdown left="true" isOpen={isOpen} toggle={toggle}>
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
          )}
        </div>
      </CardTitle>
      {/* <CardImg width="100%" src={post.imgUrl} alt="Card image cap" /> */}
      <CardBody>
        {wrapping(post.text) === true ? (
          <CardText>
            {readMore === false ? post.text.substr(0, 200) : post.text}
            <Link
              to=""
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              {readMore === false ? " Read more..." : " Read less..."}
            </Link>
          </CardText>
        ) : (
          <CardText>{post.text}</CardText>
        )}
        <div className="post">
          <CardText>
            <Link to="" style={{ textDecoration: "none", color: "white" }}>
              Likes : {post.likeCount}
            </Link>
          </CardText>
          <CardText>
            <Link
              to=""
              onClick={() => {
                setVisibleComments(!isVisibleComments);
              }}
              style={{ textDecoration: "none", color: "white" }}
            >
              Comments : {post.commentCount}
            </Link>
          </CardText>
        </div>

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

        <ShareComment post={post}></ShareComment>
      </CardBody>
      {isVisibleComments === false ? (
        <div></div>
      ) : (
        <CommentList comments={post.comments} user={user}></CommentList>
      )}
    </Card>
  ) : (
    <EditPost
      post={post}
      isVisible={isVisibleEdit}
      setVisible={setVisibleEdit}
    ></EditPost>
  );
}

export default Post;
