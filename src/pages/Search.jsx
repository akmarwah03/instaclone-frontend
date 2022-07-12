import { useState } from "react";
import ProfileList from "../components/UI/ProfileList";
import Spinner from "../components/UI/Spinner";
import { API_LINK } from "../../API_LINK";

const Search = (props) => {
  let delayTimer;

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchHandler = (event) => {
    setIsLoading(true);

    clearTimeout(delayTimer);
    delayTimer = setTimeout(async () => {
      const searchText = event.target.value;
      setSearchText(event.target.value);
      if (searchText !== "") {
        const response = await fetch(
          API_LINK + `/profile/search/${searchText}`
        );
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="fixed top-0 grid w-screen h-20 bg-white border border-b-2 border-gray-300 place-items-center">
        <form
          className="grid w-screen place-items-center"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            className="w-11/12 px-4 py-2 m-auto text-lg bg-gray-300 rounded-xl"
            onChange={searchHandler}
          />
        </form>
      </div>
      <div className="mt-20">
        {isLoading ? (
          <Spinner />
        ) : searchResults.length === 0 ? (
          <div
            className="absolute grid w-screen gap-8 top-2/4 place-items-center"
            style={{ transform: "translateY(-50%)" }}
          >
            {searchText === "" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-36 w-36"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="text-4xl text-center ">Start Searching</h1>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-36 w-36"
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

                <h1 className="text-4xl text-center ">No Results Found</h1>
              </>
            )}
          </div>
        ) : (
          <ProfileList profiles={searchResults} />
        )}
      </div>
    </>
  );
};

export default Search;
