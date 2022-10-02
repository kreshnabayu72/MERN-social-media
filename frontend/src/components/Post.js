import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

const FormatTime = (time) => {
  const Time = new Date(time);
  const formattedTime = Time.toLocaleString("en-GB", { timezone: "UTC" });
  return formattedTime;
};

const PostImage = ({ post }) => {
  const { _id } = post;
  return <img src={`/api/post/${_id}/image`} alt="Post Image" />;
};

function Post({ post }) {
  const { user, description, time } = post;

  const loggedUser = useSelector((state) => state.auth.loggedUser.user);
  const nav = useNavigate();

  const LikeHandler = async () => {
    try {
      const result = await axios.put(`/api/post/${post._id}/like`, {
        userId: loggedUser._id,
      });
      nav(0);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const HeartIcon = ({ likes, liked }) => {
    return (
      <i
        onClick={() => LikeHandler()}
        className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}
      >
        {likes.length}
      </i>
    );
  };
  if (post)
    return (
      <div className="post">
        <div className="post-header flex-around">
          <ProfileImage user={user} />
          <Link to={`/profile/${user._id}`}>
            <h3>{user.username}</h3>
          </Link>
          <p>{FormatTime(time)}</p>
        </div>
        <PostImage post={post} />
        <div className="post-body">
          <p>{description}</p>
          <div className="post-icon-container">
            <HeartIcon
              likes={post.likes}
              liked={post.likes.includes(loggedUser._id)}
            />
          </div>
        </div>
      </div>
    );
  else return <></>;
}

export default Post;
