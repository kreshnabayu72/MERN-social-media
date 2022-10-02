import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import AdminPage from "./pages/AdminPage";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import { fetchUser } from "./store/user/user-action";
import { fetchPost } from "./store/post/post-action";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const RequireAuth = ({ children, redirect }) => {
    return isLoggedIn ? children : <Navigate to={redirect} />;
  };

  const RequireUnauth = ({ children, redirect }) => {
    return isLoggedIn ? <Navigate to={redirect} /> : children;
  };

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Modal />
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequireAuth redirect="/login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RequireUnauth redirect="/">
              {" "}
              <LoginPage />
            </RequireUnauth>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile/:id"
          element={
            <RequireAuth redirect="/login">
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <RequireAuth redirect="/login">
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/upload"
          element={
            <RequireAuth redirect="/login">
              <UploadPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth redirect="/">
              <AdminPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
