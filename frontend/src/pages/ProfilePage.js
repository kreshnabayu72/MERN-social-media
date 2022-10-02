import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { utilSlice } from "../store/util/util-slice";
import ProfileImage from "../components/ProfileImage";

const ProfilePostsGallery = ({ userPosts }) => {
  if (userPosts.length === 0) return <h1>User has no post</h1>;

  return userPosts.map((post) => {
    return (
      <img src={`/api/post/${post._id}/image`} alt="postImage" key={post._id} />
    );
  });
};

const parseAndStringify = (string) => {
  return JSON.parse(JSON.stringify(string));
};

function ProfilePage() {
  const [userPost, setUserPost] = useState([]);
  const [buttonText, setButtonText] = useState("Follow");

  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.auth.loggedUser.user);
  const user = useSelector((state) => state.user.userList).find(
    (user) => user._id === params.id
  );
  const postList = useSelector((state) => state.post.postList);

  const FollowHandler = async (e) => {
    try {
      dispatch(utilSlice.actions.sendRequest());
      const result = await axios.put(`/api/user/${user._id}/follow`, {
        userId: loggedUser._id,
      });
      dispatch(
        utilSlice.actions.requestSuccess({
          success: { message: result.data.message },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ProfileButton = () => {
    if (user._id === loggedUser._id) {
      return (
        <button onClick={() => nav(`/profile/${params.id}/edit`)}>
          Edit Profile
        </button>
      );
    }
    return <button onClick={(e) => FollowHandler(e)}>{buttonText}</button>;
  };

  const ProfileDetail = () => {
    if (user) {
      return (
        <>
          <ProfileImage user={user} />
          <div className="profile-detail">
            <div>
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <h4>{`@${user.username}`}</h4>
            </div>
            <div>
              {" "}
              <p>{user.followers.length} Followers</p>
              <ProfileButton />
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await postList.filter((post) => {
          if (user) return post.user._id === user._id;
          return null;
        });
        setUserPost(userPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPosts();

    if (user) {
      const followed = user.followers.includes(
        parseAndStringify(loggedUser._id)
      );
      if (followed) {
        setButtonText("Unfollow");
      } else {
        setButtonText("Follow");
      }
    }
  }, [user]);

  return (
    <main className="flex-center-center-column">
      <div className="profile-header flex-center-center">
        <ProfileDetail />
      </div>
      <div className="profile-posts flex-center-center">
        <div className="profile-posts-title">
          <h4>Posts</h4>
        </div>

        <div className="profile-posts-list">
          <ProfilePostsGallery userPosts={userPost} />
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
