import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";
import { API_LINK } from "../../../API_LINK";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(API_LINK + `/post/getComments`, {
      method: "POST",
      body: JSON.stringify({ postId: props.postId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    setComments(data.comments);
    setIsLoading(false);
  }, [props.postId]);

  const commentHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(API_LINK + "/post/addComment", {
      method: "POST",
      body: JSON.stringify({
        postId: props.postId,
        comment: event.target.comment.value,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    fetchComments();
    console.log(data);
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-gray-300 ">
      <div className="fixed top-0 grid w-screen h-16 grid-cols-3 bg-white place-items-center">
        <h1 className="ml-5 justify-self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => props.onClose()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </h1>
        <h1 className="text-3xl text-indigo-500 font-logoFont">Comments</h1>
        <h1 className="mr-5 justify-self-end">&nbsp;</h1>
      </div>
      <div className="h-full mt-16 overflow-y-auto mb-18">
        <div className="flex p-2 border-b border-gray-400 0">
          <img
            src={props.profileImageUrl}
            alt={props.profileImageUrl}
            className="w-12 h-12 border-2 border-indigo-500 rounded-full"
          />
          <h3 className="ml-4">
            <span className="font-bold">{props.username}&nbsp;</span>
            {props.caption}
          </h3>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          comments.map((comment) => {
            return (
              <div className="flex p-2 0" key={comment._id}>
                <img
                  src={API_LINK + "/" + comment.userId.profileImageUrl}
                  alt={API_LINK + "/" + comment.userId.profileImageUrl}
                  className="w-12 h-12 border-2 border-indigo-500 rounded-full"
                />
                <h3 className="ml-4">
                  <span className="font-bold">
                    {comment.userId.username}&nbsp;
                  </span>
                  {comment.comment}
                </h3>
              </div>
            );
          })
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-screen bg-white h-18">
        <form
          className="flex w-full h-full px-4 py-3 justify-evenly"
          onSubmit={commentHandler}
        >
          <input
            type="text"
            id="comment"
            name="comment"
            placeholder="Comment"
            className="w-9/12 px-4 py-2 text-lg bg-gray-300 rounded-xl"
          />
          <button
            className="px-4 py-2 text-white bg-indigo-500 rounded-xl"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
