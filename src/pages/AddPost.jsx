import { useState, useRef } from "react";
import TopNav from "../components/UI/TopNav";
import Modal from "../components/UI/Modal";
import { useSelector } from "react-redux";
import Spinner from "../components/UI/Spinner";
import { API_LINK } from "../../API_LINK";

const AddPost = (props) => {
  const [image, setImage] = useState();
  const [isPost, setIsPost] = useState(false);
  const [isStory, setIsStory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalGood, setModalGood] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const imagePreviewRef = useRef();
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const closeModal = () => {
    setShowModal(false);
  };

  const changeImageHandler = (event) => {
    setImage(event.target.files[0]);
    var fr = new FileReader();
    fr.onload = function () {
      imagePreviewRef.current.src = fr.result;
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  const addPostHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("caption", event.target.caption.value);
    formData.append("postImage", event.target.postImage.files[0]);
    formData.append("userId", userId);
    const response = await fetch(API_LINK + "/post/addPost", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    setIsLoading(false);
    setShowModal(true);
    if (response.ok) {
      setModalMessage("Post added succesfully");
      setModalGood(true);
    } else {
      setModalMessage("Unfortunately task failed");
      setModalGood(false);
    }
  };

  const addStoryHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("storyImage", event.target.storyImage.files[0]);
    formData.append("userId", userId);
    const response = await fetch(API_LINK + "/story/addStory", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    setShowModal(true);
    setIsLoading(false);
    if (response.ok) {
      setModalMessage("Story added succesfully");
    } else {
      setModalMessage("Unfortunately task failed");
    }
  };
  return (
    <div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          message={modalMessage}
          modalGood={modalGood}
        />
      )}
      <TopNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div
            className="w-10/12 mx-auto mt-20 bg-black rounded-2xl"
            style={{ aspectRatio: "4/5" }}
          >
            <img
              ref={imagePreviewRef}
              alt=""
              className="w-full h-full rounded-2xl"
            />
          </div>
          {isPost && (
            <form
              onSubmit={addPostHandler}
              className="grid gap-4 mt-4 place-items-center"
            >
              <input
                type="text"
                name="caption"
                id="caption"
                placeholder="Caption"
                className="w-11/12 px-4 py-2 text-lg bg-gray-300 rounded-xl"
                required
              />
              <input
                type="file"
                name="postImage"
                id="postImage"
                onChange={changeImageHandler}
                accept=".jpg,.png"
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1",
                }}
                required
              />
              <label
                htmlFor="postImage"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="w-11/12 px-4 py-2 text-lg text-center text-white bg-indigo-500 rounded-xl"
              >
                {image ? image.name : "Select Image"}
              </label>
              <div className="grid w-screen h-24 grid-flow-col gap-8 place-items-center">
                <button
                  onClick={() => {
                    setIsPost(false);
                  }}
                  className="px-8 py-4 text-xl text-indigo-500 bg-gray-300 border-2 border-indigo-500 rounded-2xl justify-self-end"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 text-xl text-white bg-indigo-500 border-2 border-indigo-500 rounded-2xl justify-self-start"
                >
                  Add Post
                </button>
              </div>
            </form>
          )}
          {isStory && (
            <form
              onSubmit={addStoryHandler}
              className="grid gap-4 mt-4 place-items-center"
            >
              <input
                type="file"
                name="storyImage"
                id="storyImage"
                onChange={changeImageHandler}
                accept=".jpg,.png"
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: "0",
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: "-1",
                }}
                required
              />
              <label
                htmlFor="storyImage"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="w-11/12 px-4 py-2 text-lg text-center text-white bg-indigo-500 rounded-xl"
              >
                {image ? image.name : "Select Image"}
              </label>
              <div className="grid w-screen h-24 grid-flow-col gap-8 place-items-center">
                <button
                  onClick={() => {
                    setIsStory(false);
                  }}
                  className="px-8 py-4 text-xl text-indigo-500 bg-gray-300 border-2 border-indigo-500 rounded-2xl justify-self-end"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 text-xl text-white bg-indigo-500 border-2 border-indigo-500 rounded-2xl justify-self-start"
                >
                  Add Story
                </button>
              </div>
            </form>
          )}
          {!isStory && !isPost && (
            <div className="grid w-screen h-40 grid-flow-col gap-8 place-items-center">
              <button
                onClick={() => setIsPost(true)}
                className="px-8 py-4 text-xl text-white bg-indigo-500 border-2 border-indigo-500 rounded-2xl justify-self-end"
              >
                Post
              </button>
              <button
                onClick={() => setIsStory(true)}
                className="px-8 py-4 text-xl text-indigo-500 bg-gray-300 border-2 border-indigo-500 rounded-2xl justify-self-start"
              >
                Story
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddPost;
