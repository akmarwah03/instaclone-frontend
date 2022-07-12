import { Link } from "react-router-dom";
import { API_LINK } from "../../../API_LINK";

const PostsGrid = (props) => {
  return (
    <>
      {props.posts.length === 0 ? (
        <div className="grid w-11/12 gap-8 p-12 mx-auto my-5 bg-white place-items-center rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-28"
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
          <h1 className="text-4xl text-center ">No posts yet</h1>
        </div>
      ) : (
        <div className="grid w-11/12 grid-cols-3 p-4 mx-auto my-5 bg-white gap-y-3 rounded-3xl place-items-center">
          {props.posts.map((post) => {
            return (
              <Link to={"/post/" + post._id} key={post.imageUrl}>
                <img
                  className="w-10/12 border border-black rounded-3xl"
                  style={{ aspectRatio: "1/1" }}
                  src={API_LINK + "/" + post.imageUrl}
                  alt={post.caption}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PostsGrid;
