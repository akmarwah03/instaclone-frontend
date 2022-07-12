import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Post from "./Post";
import TopNav from "../UI/TopNav";
import Spinner from "../UI/Spinner";
import { API_LINK } from "../../../API_LINK";

const PostDisplay = (props) => {
  const params = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(API_LINK + `/post/${params.postId}`);
      const data = await response.json();
      setPost(data);
    };
    getPost();
  }, [params.postId]);

  return (
    <>
      <TopNav />
      <div className="p-4 mt-16">
        {!post ? (
          <Spinner />
        ) : (
          <Post
            caption={post.caption}
            liked={false}
            likes={post.likes}
            imageUrl={post.imageUrl}
            comments={post.comments}
            user={{
              name: post.creator.username,
              imageUrl: post.creator.profileImageUrl,
              userId: post.creator._id,
              creatorId: post.creator._id,
            }}
            postId={post._id}
          />
        )}
      </div>
    </>
  );
};

export default PostDisplay;
