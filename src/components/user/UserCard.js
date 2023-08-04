import React, { useState } from "react";

import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/UserAction";
import { Link } from "react-router-dom";

export const UserCard = ({ profile, username, userId, bio, worksAt }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const [follow, setFollow] = useState(!user.following.includes(userId));
  const dispatch = useDispatch();

  const handleclickFollow = async () => {
    dispatch(followUser(userId, user));
    setFollow(false);
  };

  const handleclickUnFollow = () => {
    dispatch(unfollowUser(userId, user));

    setFollow(true);
  };
  console.log(profile);
  return (
    <div className="user-card">
      <img
        src={process.env.REACT_APP_PUBLIC_FOLDER + profile}
        alt="ravindra"
      ></img>
      <div className="user-card-info">
        <Link to={`/profile/${userId}`}>
          <h5>{username}</h5>
        </Link>
      </div>
      <p>{bio}</p>
      <strong>{worksAt}</strong>
      {follow ? (
        <button onClick={handleclickFollow}>
          {" "}
          {"Follow "}
          <BsFillPersonPlusFill />
        </button>
      ) : (
        <button onClick={handleclickUnFollow}>
          {" "}
          {"Unfollow "}
          <BsFillPersonDashFill />
        </button>
      )}
    </div>
  );
};
