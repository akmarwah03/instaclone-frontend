import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";
import Layout from "./components/Layout/Layout";
import PostDisplay from "./components/Post/PostDisplay";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > new Date()) {
        dispatch(authActions.loginViaToken({ token, userId }));
      }
    }
  }, [dispatch]);
  return (
    <>
      {!authState.isAuth && <Auth />}
      {authState.isAuth && (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile/:profileId" element={<Profile />}></Route>
            <Route path="/addPost" element={<AddPost />}></Route>
            <Route path="/post/:postId" element={<PostDisplay />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
