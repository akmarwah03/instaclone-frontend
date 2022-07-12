import TopNav from "../components/Home/TopNav";
import StoriesBar from "../components/Home/Stories/StoriesBar";
import Post from "../components/Post/Post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/UI/Spinner";
import { API_LINK } from "../../API_LINK";

const Home = (props) => {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const feedEmpty = feed.length === 0;

  useEffect(() => {
    const getFeed = async () => {
      const response = await fetch(API_LINK + "/profile/feed", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setFeed(data);
      setIsLoading(false);
    };
    getFeed();
  }, [userId, authToken]);

  const posts = feed.map((post) => {
    return (
      <Post
        imageUrl={post.imageUrl}
        key={post._id}
        user={{
          imageUrl: post.creator.profileImageUrl,
          name: post.creator.username,
          creatorId: post.creator._id,
        }}
        caption={post.caption}
        date={new Date(post.createdAt).toDateString()}
        comments={post.comments}
        likes={post.likes}
        postId={post._id}
      />
    );
  });

  return (
    <div className="mb-20">
      <TopNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StoriesBar />
          {feedEmpty ? (
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
              <h1 className="text-4xl text-center ">
                Follow people to get their posts on feed
              </h1>
            </div>
          ) : (
            <>
              <div
                id="posts"
                className="grid w-full grid-flow-row gap-4 py-4 place-items-center"
              >
                {posts}
              </div>
            </>
          )}
          <div className="h-20 "></div>
        </>
      )}
    </div>
  );
};

export default Home;
