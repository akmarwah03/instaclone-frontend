const Modal = (props) => {
  return (
    <div
      className="absolute top-0 left-0 z-20 grid w-screen h-screen  place-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={props.closeModal}
    >
      <div className="w-10/12 bg-gray-100 h-2/6 rounded-3xl">
        <div className="bg-indigo-600 h-1/6 rounded-t-3xl"></div>
        <div className="grid  place-items-center h-5/6">
          {props.modalGood ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-18 w-18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-18 w-18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <h1 className="text-2xl " style={{ alignSelf: "flex-start" }}>
            {props.message}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;
