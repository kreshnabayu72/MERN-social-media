import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Register } from "../store/user/user-action";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profilePicture) {
      setImageUrl(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("profilePicture", profilePicture);

    try {
      dispatch(Register(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-center-center-column">
      <form className="flex-between">
        <h1>Register</h1>
        <input
          type="file"
          id="registerImage"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <label className="register-label flex-center" htmlFor="registerImage">
          {profilePicture ? (
            <img src={imageUrl} className="label-image" alt="" />
          ) : (
            <div className="register-image flex-center-center">
              <div>
                <i className="bi bi-camera-fill"></i>
              </div>
            </div>
          )}
        </label>
        <div className="flex-between">
          <div>
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Register"
          onClick={(e) => SubmitHandler(e)}
        />
      </form>
      <p>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
