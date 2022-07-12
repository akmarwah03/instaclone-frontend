const LoginBottomBar = (props) => {
  return (
    <div className=" grid place-items-center bottom-0 fixed left-0 w-screen p-6 border-t border-gray-300">
      <h3 className=" text-xs text-gray-500">
        {!props.isSignUp && (
          <>
            Don't have an account?
            <button
              className=" text-indigo-500"
              onClick={() => props.onSignUp(true)}
            >
              Sign up.
            </button>
          </>
        )}
        {props.isSignUp && (
          <>
            Already have an account?
            <button
              className=" text-indigo-500"
              onClick={() => props.onSignUp(false)}
            >
              Sign In.
            </button>
          </>
        )}
      </h3>
    </div>
  );
};

export default LoginBottomBar;
