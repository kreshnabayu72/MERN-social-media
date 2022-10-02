import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

function SearchResult({ user }) {
  const nav = useNavigate();
  return (
    <div className="search-result" onClick={() => nav(`/profile/${user._id}`)}>
      <ProfileImage user={user} />
      <h2>{user.username}</h2>
    </div>
  );
}

export default SearchResult;
