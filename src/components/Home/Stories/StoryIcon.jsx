import Stories from "react-insta-stories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StoryIcon = (props) => {
  const history = useNavigate();
  const [showStory, setShowStory] = useState(false);
  const stories = props.stories.map((story) => {
    return {
      url: story.imageUrl,
      header: {
        profileImage: props.imageUrl,
        heading: props.userName,
      },
    };
  });

  const imageClassses = `h-18 w-18 rounded-full ${
    stories.length !== 0 && "bg-indigo-500"
  } border-2 p-0.5`;

  return (
    <div
      className="grid grid-flow-row place-items-center h-24 w-24"
      onClick={() => {
        if (stories.length !== 0) {
          setShowStory(true);
        } else {
          history("/addPost");
        }
      }}
    >
      <img
        src={props.imageUrl}
        alt={props.imageUrl}
        className={imageClassses}
      />
      <h4
        className=" text-xs text-center"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "9ch",
        }}
      >
        {props.userName}
      </h4>
      {showStory && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            width: "100vw",
            backgroundColor: "rgb(17,17,17)",
            zIndex: "10",
          }}
          className=" grid place-items-center"
        >
          <Stories
            stories={stories}
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

export default StoryIcon;
