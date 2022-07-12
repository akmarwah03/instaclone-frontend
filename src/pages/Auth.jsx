import { useState } from "react";

import LoginBottomBar from "../components/Auth/LoginBottomBar";
import SignInForm from "../components/Auth/SignInForm";
import SignUpForm from "../components/Auth/SignUpForm";
import "./Auth.css";

const Auth = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className=" min-h-screen w-screen authBg">
      <div
        className=" absolute left-2/4 top-1/3 grid place-items-center"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <h1 className=" font-logoFont text-5xl text-indigo-500">Instagram</h1>
        {!isSignUp && <SignInForm />}
        {isSignUp && <SignUpForm />}
      </div>
      <LoginBottomBar onSignUp={setIsSignUp} isSignUp={isSignUp} />
    </div>
  );
};

export default Auth;
