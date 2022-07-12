import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import millify from "millify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { API_LINK } from "../../../API_LINK";

const Post = (props) => {
  const history = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const [showComments, setShowComments] = useState(false);
  const [caption, setCaption] = useState(
    <h3 className="p-4 text-sm break-words">{props.caption}</h3>
  );
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const moreCaptionHandler = useCallback(() => {
    setCaption(<h3 className="p-4 text-sm break-words">{props.caption}</h3>);
  }, [props.caption]);

  const toggleLikeHandler = async () => {
    let url = API_LINK + "/post/like";
    if (!liked) {
      setLikes((prev) => [...prev, userId]);
    } else {
      setLikes((prev) => prev.filter((user) => user !== userId));
      url = API_LINK + "/post/unlike";
    }
    setLiked((prev) => !prev);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        postId: props.postId,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
  };

  const deletePostHandler = async () => {
    await fetch(API_LINK + "/post/deletePost", {
      method: "POST",
      body: JSON.stringify({
        postId: props.postId,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    history(-1);
  };

  useEffect(() => {
    if (props.caption.length > 80) {
      setCaption(
        <h3 className="p-4 text-sm">
          {props.caption.substring(0, 80)}
          <button onClick={moreCaptionHandler} className="text-gray-500 ">
            &nbsp;...more
          </button>
        </h3>
      );
    }
  }, [moreCaptionHandler, props.caption]);

  useEffect(() => {
    setLiked(props.likes.includes(userId));
  }, [props.likes, userId]);

  return (
    <div className="w-11/12 p-4 mx-auto bg-white rounded-3xl">
      {showComments && (
        <Comments
          onClose={() => setShowComments(false)}
          postId={props.postId}
          caption={props.caption}
          username={props.user.name}
          profileImageUrl={API_LINK + "/" + props.user.imageUrl}
        />
      )}
      <img
        src={API_LINK + "/" + props.imageUrl}
        alt=""
        className="w-full rounded-3xl "
        style={{
          objectFit: "contain",
          aspectRatio: "4/5",
          backgroundColor: "black",
        }}
      />
      <div className="w-full ">{caption}</div>
      <div className="grid w-full grid-flow-col pt-4 border-t-2">
        <Link to={"/profile/" + props.user.creatorId}>
          <div className="grid grid-flow-col place-items-center">
            <img
              src={API_LINK + "/" + props.user.imageUrl}
              alt=""
              className="h-12 w-12 rounded-full border-indigo-500 border-2 p-0.5"
            />
            <div className="justify-self-start">
              <h3 className="font-bold ">{props.user.name}</h3>

              <h4 className="text-gray-400 ">{props.date}</h4>
            </div>
          </div>
        </Link>
        <div className="grid grid-flow-col">
          <div className="grid grid-flow-col place-items-center">
            <span>{millify(props.comments.length)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShowComments(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div
            className="grid grid-flow-col place-items-center"
            onClick={toggleLikeHandler}
          >
            <span>{millify(likes.length)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="transition w-7 h-7"
              fill={liked ? "#e74c3c" : "none"}
              viewBox="0 0 24 24"
              stroke={liked ? "#e74c3c" : "currentColor"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          {props.user.userId === userId && (
            <div
              className="grid grid-flow-col place-items-center"
              onClick={deletePostHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
