import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import Spinner from "../UI/Spinner";
import { API_LINK } from "../../../API_LINK";

const SignInForm = (props) => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    dispatch(authActions.startAuth());
    const response = await fetch(API_LINK + "/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsLoading(false);
    if (data.error) {
      setError("Username and password do not match");
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      dispatch(
        authActions.loginViaToken({ token: data.token, userId: data.userId })
      );
    }
  };

  return (
    <div className="h-9/12 mt-8">
      <form
        className=" grid justify-items-center w-screen gap-6"
        onSubmit={signInHandler}
      >
        <input
          type="text"
          name="username"
          id="username"
          className=" w-10/12 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 h-12"
          placeholder="Username"
          ref={usernameRef}
          onChange={() => setError("")}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="w-10/12 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 h-12"
          placeholder="Password"
          ref={passwordRef}
          onChange={() => setError("")}
          required
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="w-10/12 bg-indigo-500 h-12 px-4 py-3 rounded-lg border border-indigo-500 text-white"
          >
            Log In
          </button>
        )}
      </form>
      {error && (
        <h1 className=" p-4 bg-red-100 border-red-500 border-2 text-red-500 w-9/12 mx-auto my-8 rounded-xl text-center">
          {error}
        </h1>
      )}
    </div>
  );
};

export default SignInForm;
