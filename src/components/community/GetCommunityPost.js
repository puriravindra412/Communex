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
  }, []);

  const user = useSelector((state) => state.authReducer.authData);

  const addUser = () => {
    const data = {
      name: name,
      userId: user._id,
      username: user.username,
      profile: user.profilePicture,
    };
    addCommunity(data);
  };
  const addCommunity = async (data) => {
    const { res } = await CommunityApi.addUserToCommunity(data);
    alert(res);
  };

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
      <div className="profile-container-box">
        <SideBar />
        <MobileSideBar />
        <div className="profile-main">
          <div className="commuinty-feed-container">
            <div className="community-heading">
              <img
                src={process.env.REACT_APP_PUBLIC_FOLDER + img}
                alt={"community"}
                className="community-logo"
              ></img>
            </div>
            <div className="about-community">
              <div className="about-community-item">
                <div>
                  <h6>Follow</h6>
                  <p>People joined {peoples.length}</p>
                </div>
                <button onClick={addUser}>
                  <BsFillPersonPlusFill />
                </button>
              </div>
              <div className="about-community-item">
                <div>
                  <h6>Posted Artical</h6>
                  <p>{peoples.length}</p>
                </div>
              </div>
            </div>
            <h2>Welcome To the {name} Community</h2>
            <p className="community-intro">
              Welcome to {name}, the ultimate destination for {name}{" "}
              enthusiasts! We're excited to have you join our vibrant community
              of bloggers and readers. Whether you're here to share your
              knowledge or to learn something new, we hope you find our platform
              to be engaging and user-friendly. Feel free to browse our blog
              posts, leave comments, and connect with other like-minded
              individuals. Happy blogging!
            </p>

            <div>
              
              <div className="card-container">
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
                  Community.map((post, id) => {
                    return <FeedCard data={post} key={id} />;
                  })}
                {activeCategory === "user" && (
                  <div className="community-users">
                    {users.map((people, index) => {
                      return (
                        <UserCard
                          username={people.username}
                          profile={people.profile}
                          userId={people.userId}
                          bio={people.bio}
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
