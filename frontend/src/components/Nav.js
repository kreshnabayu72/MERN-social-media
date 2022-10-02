import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutAction } from "../store/auth/auth-action";

const Dropdown = ({ dropdown, loggedUser, Logout }) => {
  if (dropdown) {
    return (
      <div className="nav-dropdown-items">
        <Link to={`/profile/${loggedUser._id}`}>Profile</Link>
        <Link to="/upload">Upload Post</Link>
        {loggedUser.isAdmin ? <Link to="/admin">Admin</Link> : <></>}
        <a href="#" onClick={() => Logout()}>
          Logout
        </a>
      </div>
    );
  } else {
    return <></>;
  }
};

function Nav() {
  const [dropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(LogoutAction());
    nav("/login");
  };

  const ToggleDropdown = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };

  const EnterSearch = (e) => {
    if (e.keyCode === 13) {
      nav(`/search/?query=${searchQuery}`);
    }
  };

  if (isLoggedIn) {
    return (
      <nav className="flex-around align-center">
        <Link to="/">
          <h1>Logo</h1>
        </Link>
        <div className="search-container flex-center align-center">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => EnterSearch(e)}
          />
          <i
            className="bi bi-search"
            onClick={() => nav(`/search/?query=${searchQuery}`)}
          ></i>
        </div>
        <div className="nav-dropdown">
          <a href="#" onClick={(e) => ToggleDropdown(e)}>
            <ProfileImage user={loggedUser.user} />
          </a>
          <Dropdown
            dropdown={dropdown}
            loggedUser={loggedUser.user}
            Logout={() => Logout()}
          />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="flex-around">
        <Link to="/">
          <h1>Logo</h1>
        </Link>
      </nav>
    );
  }
}

export default Nav;
