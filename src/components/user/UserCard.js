import React, { useState } from "react";

import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export const UserCard = ({ profile, username, userId,  worksAt }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const [follow, setFollow] = useState(!user?.following?.includes(userId));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleclickFollow = async () => {
    if(user){
      dispatch(followUser(userId, user));
    setFollow(false);
    }else{
      navigate("../login", { replace: true });
    }
    
  };

  const handleclickUnFollow = () => {
    if(user){
      dispatch(unfollowUser(userId, user));

    setFollow(true);
  }else{
    navigate("../login", { replace: true });
  }
    
  };
  console.log(profile);
  return (
    <div className="user-card">
      <Avatar
        src={profile}
        alt={username}
      ></Avatar>
      <div className="user-card-info">
        <Link to={`/profile/${userId}`}>
          <h6>{username}</h6>
        </Link>
        
        <strong>{worksAt}</strong>
      </div>
     
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
