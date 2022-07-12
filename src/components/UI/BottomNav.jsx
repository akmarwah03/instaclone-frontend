import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNav = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  return (
    <div className="fixed bottom-0 grid w-screen h-16 grid-cols-4 bg-white border-t-2 border-gray-200 rounded-t-3xl place-content-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-indigo-500 grid h-16 place-content-center"
            : "grid h-16 place-content-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive
            ? "text-indigo-500 grid place-content-center"
            : "grid place-content-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </NavLink>
      <NavLink
        to="/addPost"
        className={({ isActive }) =>
          isActive
            ? "text-indigo-500 grid place-content-center"
            : "grid place-content-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </NavLink>
      <NavLink
        to={"/profile/" + userId}
        className={({ isActive }) =>
          isActive
            ? "text-indigo-500 grid place-content-center"
            : "grid place-content-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </NavLink>
    </div>
  );
};

export default BottomNav;
