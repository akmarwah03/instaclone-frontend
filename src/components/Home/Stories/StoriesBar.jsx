import StoryIcon from "./StoryIcon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_LINK } from "../../../../API_LINK";

const StoriesBar = (props) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userStories, setUserStories] = useState([]);

  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch(API_LINK + `/story/${userId}`);
      const data = await response.json();
      setStories(data.stories);
      setUsername(data.username);
      setProfileImageUrl(API_LINK + "/" + data.profileImageUrl);
      setUserStories(data.userStories);
      setIsLoading(false);
    };
    fetchStories();
  }, [userId]);

  return (
    <div className="mt-16 overflow-x-hidden overflow-y-auto bg-white h-28 rounded-b-3xl">
      {!isLoading && (
        <div className="grid grid-flow-col-dense justify-self-start w-min">
          <StoryIcon
            imageUrl={profileImageUrl}
            userName={username}
            stories={userStories}
          />

          {stories.map((story) => {
            return (
              <StoryIcon
                key={story.creator[0]._id}
                imageUrl={API_LINK + "/" + story.creator[0].profileImageUrl}
                userName={story.creator[0].username}
                stories={story.stories}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoriesBar;
