import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as CommunityApi from "../../api/CommunityRequests.js";
import NavBar from "../navbar/navBar";
import SideBar from "../sideBar/SideBar";
import MobileSideBar from "../sideBar/MobileSideBar";
import "../../css/profile.css";
import FeedCard from "../home/feedCard.js";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { UserCard } from "../user/UserCard.js";

export const GetCommunityPost = () => {
  const location = useLocation();
  const [img, peoples, posts] = location.state;

  const params = useParams();
  const name = params.name;
  const [postDiv, setPostDiv] = useState(true);
  const [userDiv, setUserDiv] = useState(false);
  const [Community, setCommunity] = useState([]);

  useEffect(() => {
    const communities = async () => {
      const communitData = await CommunityApi.getCommunityPost(name);
      setCommunity(communitData.data);
    };
    communities();
  }, [name]);

  const user = useSelector((state) => state.authReducer.authData);

  const addUser = () => {
    const data = {
      name: name,
      userId: user._id,
      
    };
    addCommunity(data);
  };
  const addCommunity = async (data) => {
    const { res } = await CommunityApi.addUserToCommunity(data);
    alert(res);
  };
  console.log("inside get community " ,Community)
  const [activeCategory, setActiveCategory] = useState("user");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  const users = peoples.filter((people) => {
    return people.userId !== user._id;
  });
  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="community-container-box ">
        <SideBar />
        <MobileSideBar />
        <div className="profile-main">
          <div className="commuinty-feed-container">
        <div className="community-intro-box">
            <div className="community-heading">
            <div>
            <img
                src={img}
                alt={"community"}
                className="community-logo"
              ></img>
            </div>
              
            
            <div className="about-community">
              <div className="about-community-item">
                <div>
                  <h6>People joined</h6>
                  <p> {peoples.length}</p>
                </div>
                
              </div>
              <div className="about-community-item">
                <div>
                  <h6>Posted Artical</h6>
                  <p>{Community.length}</p>
                </div>
              </div>
            </div>
          </div>
            <button onClick={addUser}>
                  Join Community <BsFillPersonPlusFill size={15}/>
                </button>
            
            
            </div>
            <div className="community-post-container">
             <div className="card-container ">
                <div className="container-top">
                  <div className="buttons-container">
                    <div>
                      <button
                        className={activeCategory === "post" ? "active" : ""}
                        onClick={() => handleCategoryChange("post")}
                      >
                        Post
                      </button>
                      <button
                        className={activeCategory === "user" ? "active" : ""}
                        onClick={() => handleCategoryChange("user")}
                      >
                        User
                      </button>
                    </div>
                    <hr></hr>
                  </div>
                </div>

                {activeCategory === "post" &&
                  Community?.result?.post.map((post, id) => {
                    return <FeedCard data={post} key={id} />;
                  })}
                {activeCategory === "user" && (
                  <div className="community-users">
                    {Community?.result?.usersData.filter((people)=>{return people._id !== user._id}).map((people, index) => {
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  };