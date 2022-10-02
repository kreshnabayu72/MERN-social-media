import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Edit } from "../store/user/user-action";
import { ReplaceImage } from "../utility";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();

  const user = useSelector((state) => state.user.userList).find(
    (user) => user._id === params.id
  );

  useEffect(() => {
    if (profilePicture) {
      setImageUrl(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("authPassword", authPassword);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("profilePicture", profilePicture);

    try {
      dispatch(Edit(params.id, formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-center-center-column">
      <form className="flex-between">
        <h1>Edit Profile</h1>
        <input
          type="file"
          id="registerImage"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <label className="register-label flex-center" htmlFor="registerImage">
          {profilePicture ? (
            <img src={imageUrl} className="label-image" alt="" />
          ) : user ? (
            <img
              src={`/api/user/${user._id}/image`}
              alt="User"
              className="label-image"
              onError={(e) => ReplaceImage(e)}
            />
          ) : (
            <></>
          )}
        </label>

        <div className="flex-between">
          <div>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Old Password</p>
          <input
            type="password"
            name="authPassword"
            onChange={(e) => setAuthPassword(e.target.value)}
          />
        </div>
        <div>
          <p>New Password</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Confirm New Password</p>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Edit" onClick={(e) => SubmitHandler(e)} />
      </form>
    </main>
  );
}

export default EditProfilePage;
