import ProfileStats from "../components/Profile/ProfileStats";
import PostsGrid from "../components/Post/PostsGrid";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../components/UI/Spinner";
import { API_LINK } from "../../API_LINK";

const Profile = (props) => {
  const params = useParams();
  const [username, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const followed = true;
  const [bgImageUrl, setBgImageUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(API_LINK + `/profile/${params.profileId}`);
      const data = await response.json();
      setIsLoading(false);
      setUserName(data.username);
      setProfileImageUrl(data.profileImageUrl);
      setPosts(data.posts);
      setFollowers(data.followers);
      setFollowing(data.following);
      setBgImageUrl(data.coverImageUrl);
      const mappedStories = data.stories.map((story) => {
        return {
          url: API_LINK + "/" + story.imageUrl,
          header: {
            profileImage: API_LINK + "/" + data.profileImageUrl,
            heading: data.username,
          },
        };
      });
      setStories(mappedStories);
    };
    fetchProfile();
  }, [params.profileId]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfileStats
            username={username}
            profileImageUrl={API_LINK + "/" + profileImageUrl}
            posts={posts}
            followers={followers}
            following={following}
            followed={followed}
            bgImageUrl={API_LINK + "/" + bgImageUrl}
            stories={stories}
          />
          <PostsGrid posts={posts} />
        </>
      )}
    </div>
  );
};

export default Profile;
