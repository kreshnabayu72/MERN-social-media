import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";

const PostList = ({ postList }) => {
  if (postList) {
    const result = postList.map((post) => {
      return <Post key={post._id} post={post} />;
    });

    return result;
  }
};

function HomePage() {
  const postList = useSelector((state) => state.post.postList);

  return (
    <main className="flex-center-center-column-reverse">
      <PostList postList={postList} />
    </main>
  );
}

export default HomePage;
