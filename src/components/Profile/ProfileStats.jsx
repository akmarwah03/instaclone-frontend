import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import millify from "millify";
import { useState } from "react";
import Stories from "react-insta-stories";
import { API_LINK } from "../../../API_LINK";

import GoBack from "../UI/GoBack";
import { useEffect } from "react";

const ProfileStats = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const params = useParams();
  const [followersNumber, setFollowersNumber] = useState(0);
  const [showStory, setShowStory] = useState(false);

  let own = params.profileId === userId;

  const [followed, setFollowed] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const followHandler = async (props) => {
    setFollowed(true);
    setFollowersNumber((prev) => prev + 1);
    await fetch(API_LINK + "/profile/follow", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        profileId: params.profileId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  const unfollowHandler = async () => {
    setFollowed(false);
    setFollowersNumber((prev) => prev - 1);
    await fetch(API_LINK + "/profile/unfollow", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        profileId: params.profileId,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
    history("/");
  };

  useEffect(() => {
    setFollowed(props.followers.indexOf(userId) !== -1);
    setFollowersNumber(props.followers.length);
  }, [props.followers, userId]);

  return (
    <div
      className="h-64 p-4 text-white rounded-b-3xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)),url(${props.bgImageUrl.replaceAll(
          "\\",
          "/"
        )})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="grid h-8 grid-flow-col p-4 align-middle">
        <GoBack history={history} />
        <h2 className="text-lg shadow-md justify-self-center">
          {props.username}
        </h2>
        {own && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 justify-self-end"
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
        )}
        {!own && <h1>&nbsp;</h1>}
      </div>
      <div className="flex p-4 mt-24 h-28">
        <img
          src={props.profileImageUrl}
          alt=""
          className="w-20 h-20 rounded-full"
          onClick={() => setShowStory(true)}
        />
        <div>
          <div className="grid grid-flow-col ml-5 text-sm justify-self-start">
            <h4>
              {millify(props.posts.length)} <br />
              Posts
            </h4>
            <h4 className="ml-5">
              {millify(followersNumber)} <br />
              Followers
            </h4>
            <h4 className="ml-5">
              {millify(props.following.length)} <br />
              Following
            </h4>
          </div>
          <div className="grid grid-flow-col gap-4 mt-3 ml-5 place-content-start">
            {!own && (
              <button className="px-5 py-0.5 bg-white rounded-2xl">
                {!followed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    onClick={followHandler}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="rgba(99, 102, 241, var(--tw-text-opacity))"
                    onClick={unfollowHandler}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {showStory && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            width: "100vw",
            backgroundColor: "rgb(17,17,17)",
            zIndex: "10",
          }}
          className="grid place-items-center"
        >
          <Stories
            stories={props.stories}
            defaultInterval={1500}
            storyContainerStyles={{ innerHeight: "100vh" }}
            onAllStoriesEnd={() => setShowStory(false)}
          />
          )
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
