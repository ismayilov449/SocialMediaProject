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
import { history } from "../../redux/services/helper/history";
import "../posts/PostStyle.css";
import EditPost from "./EditPost";
import ShareComment from "../comments/ShareComment";
import CommentList from "../comments/CommentList";

function Post({
  inProfile,
  user,
  post,
  like,
  dislike,
  deletePost,
  update,
  updateWithUser,
}) {
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
    if (text.length > 300) {
      return true;
    } else {
      return false;
    }
  }

  return isVisibleEdit === true ? (
    <Card
      body
      inverse
      style={{
        backgroundColor: "#242526",
        borderColor: "#242526",
        padding: "0px",
      }}
    >
      <CardTitle>
        <div className="post">
          <span inline="true">
            <Link
              to={"/profile/" + post.username}
              onClick={() => {
                var url = "/profile/" + post.username;
                history.push(url);
              }}
            >
              {post.username}
            </Link>
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
                    deletePost(post.id);
                    deletePost(post.id);
                    inProfile === true
                      ? updateWithUser(post.username) ||
                        updateWithUser(post.username)
                      : update();
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
              onClick={(e) => {
                e.preventDefault();
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
              dislike(post.id);
              inProfile === true ? updateWithUser(post.username) : update();
            }}
          >
            Dislike
          </Button>
        ) : (
          <Button
            outline
            color="info"
            onClick={() => {
              like(post.id);
              inProfile === true ? updateWithUser(post.username) : update();
            }}
          >
            Like
          </Button>
        )}

        <ShareComment post={post} inProfile={inProfile}></ShareComment>
        <br />
      </CardBody>
      {isVisibleComments === false ? (
        <div></div>
      ) : (
        <CommentList
          comments={post.comments}
          user={user}
          inProfile={inProfile}
        ></CommentList>
      )}
    </Card>
  ) : (
    <EditPost
      post={post}
      inProfile={inProfile}
      isVisible={isVisibleEdit}
      setVisible={setVisibleEdit}
    ></EditPost>
  );
}

export default Post;
