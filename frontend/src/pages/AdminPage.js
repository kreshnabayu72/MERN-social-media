import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost } from "../store/post/post-action";
import { DeleteUser } from "../store/user/user-action";

function AdminPage() {
  const userList = useSelector((state) => state.user.userList);
  const postList = useSelector((state) => state.post.postList);

  const [isUserSelected, setIsUserSelected] = useState(true);

  const dispatch = useDispatch();

  const DeleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(DeleteUser(id));
    }
  };
  const DeletePostHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(DeletePost(id));
    }
  };

  const UserTable = ({ userList }) => {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Options</th>
        </tr>
        {userList.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => DeleteUserHandler(user._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  };
  const PostTable = ({ postList }) => {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Username</th>
          <th>Options</th>
        </tr>
        {postList.map((post) => (
          <tr>
            <td>{post._id}</td>
            <td>{post.description}</td>
            <td>{post.user.username}</td>
            <td>
              <button onClick={(e) => DeletePostHandler(post._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  };

  const Table = () => {
    if (isUserSelected) {
      return <UserTable userList={userList} />;
    } else {
      return <PostTable postList={postList} />;
    }
  };

  return (
    <main className="flex-center-center-column">
      <h1>ADMIN PAGE</h1>
      <div className="flex-around admin-menu">
        <h2
          onClick={() => setIsUserSelected(true)}
          style={{ cursor: "pointer" }}
          className={isUserSelected ? "selected" : ""}
        >
          User
        </h2>
        <h2
          onClick={() => setIsUserSelected(false)}
          style={{ cursor: "pointer" }}
          className={!isUserSelected ? "selected" : ""}
        >
          Post
        </h2>
      </div>
      <Table />
    </main>
  );
}

export default AdminPage;
