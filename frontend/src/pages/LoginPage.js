import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../store/auth/auth-action";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(Login(username, password));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-center-center-column">
      <form className="flex-between" onSubmit={(e) => SubmitHandler(e)}>
        <h1>Login</h1>
        <div>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </main>
  );
}

export default LoginPage;
