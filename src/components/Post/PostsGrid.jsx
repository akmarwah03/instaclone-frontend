import { Link } from "react-router-dom";

const PostsGrid = (props) => {
  return (
    <>
      {props.posts.length === 0 ? (
        <div className="grid gap-8 place-items-center rounded-3xl p-12 w-11/12 bg-white mx-auto my-5">
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
          <h1 className=" text-center text-4xl">No posts yet</h1>
        </div>
      ) : (
        <div className="gap-y-3 mx-auto my-5 rounded-3xl p-4 w-11/12 bg-white grid grid-cols-3 place-items-center">
          {props.posts.map((post) => {
            return (
              <Link to={"/post/" + post._id} key={post.imageUrl}>
                <img
                  className=" rounded-3xl w-10/12 border border-black"
                  style={{ aspectRatio: "1/1" }}
                  src={post.imageUrl}
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
