import { Link } from "react-router-dom";

const ProfileList = (props) => {
  return (
    <ul>
      {props.profiles.map((profile) => {
        return (
          <Link to={"/profile/" + profile._id} key={profile._id}>
            <li className="flex w-screen border border-b-2 border-gray-300 h-18 place-items-center">
              <div className="w-3/12">
                <img
                  className="h-12 w-12 rounded-full m-auto border-indigo-500 border-2 p-0.5"
                  src={profile.profileImageUrl}
                  alt={profile.username}
                />
              </div>
              <h3>{profile.username}</h3>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ProfileList;
