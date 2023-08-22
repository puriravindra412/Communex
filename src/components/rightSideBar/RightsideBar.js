import React, { useCallback, useEffect, useState } from "react";
import { TrendingTags } from "./TrendingTags";
import * as CommunityApi from "../../api/CommunityRequests.js";
import { UserCard } from "../user/UserCard";
import { useSelector } from "react-redux";
export const RightsideBar = () => {
  const [Community, setCommunity] = useState([]);
  const [recentUser,setRecentUser]=useState([])
  const [loading,setLoading]=useState(true)
  const user = useSelector((state) => state.authReducer.authData);
  const getCommunityData = useCallback(async () => {
    try {
      setLoading()
      const communityData = await CommunityApi.getCommunity();
      const recentUserData = await CommunityApi.getRecentUser();
      setCommunity(communityData.data);
      setRecentUser(recentUserData.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching community data:", error);
      setLoading(false)
    }
  }, []);
  useEffect(() => {
    
    getCommunityData();
  }, [getCommunityData]);
  console.log("recent user",recentUser)
  return (
    <div className="right-sidebar">
      <div className="right-sidebar-community-box">
        <h4>Suggested Community </h4>
        {Community.slice(0,4).map((index) => {
          return (
            <TrendingTags
              img={index.image}
              name={index.name}
              peoples={index.users}
              key={index.name}
              loading={loading}
            ></TrendingTags>
          );
        })}
      </div>
      <div className="right-sidebar-community-box">
        <h4>Recent Users </h4>
        {recentUser.filter((people)=>{return people._id !== user._id}).slice(2).map((people, index) => {
          return (
            <UserCard
              username={people.username}
              profile={people.profilePicture}
              userId={people._id}
              
              worksAt={people.worksAt}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
