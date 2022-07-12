import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

const TopNav = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
    history("/");
  };

  return (
    <div className="fixed top-0 h-16 bg-white w-screen grid grid-cols-3 place-items-center">
      <Link className=" justify-self-start ml-5" to="/addPost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Link>
      <h1 className=" font-logoFont text-3xl text-indigo-500">Instagram</h1>
      <h1 className="justify-self-end mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 justify-self-end"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={logoutHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </h1>
    </div>
  );
};

export default TopNav;
