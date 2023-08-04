import React, { useEffect, useState } from "react";
import NavBar from "../navbar/navBar";
import "../../css/profile.css";
import MobileSideBar from "../sideBar/MobileSideBar";
import SideBar from "../sideBar/SideBar";

import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoPencil, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import Feed from "../home/Feed";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { followUser, unfollowUser } from "../../redux/actions/UserAction";
import { RiMessengerLine } from "react-icons/ri";
import { createChat } from "../../api/ChatRequests";
import { findChat } from "../../api/ChatRequests";
import { async } from "react-input-emoji";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const profileUserId = params.id;
  const [follow, setFollow] = useState(!user.following.includes(params.id));
  const [profileUser, setProfileUser] = useState([]);

  useEffect(() => {
    const fetchProfileUser = async (profileUserId) => {
      console.log("fetching");
      const profileUser = await UserApi.getUser(profileUserId);
      setProfileUser(profileUser.data);
    };
    fetchProfileUser(profileUserId);
  }, [profileUserId]);

  const handleclickFollow = async () => {
    dispatch(followUser(params.id, user));
    setFollow(false);
  };

  const handleclickUnFollow = () => {
    dispatch(unfollowUser(params.id, user));

    setFollow(true);
  };

  const createUserChat = async () => {
    const data = { senderId: user._id, receiverId: params.id };
    const res = await findChat(user._id, params.id);
    if (res.data !== null && res.status === 200) {
      console.log("userexist");
      navigate("/chat");
    } else {
      createChat(data);
      navigate("/chat");
    }
  };

  const editProfile = profileUser._id === user._id;
  console.log(profileUser);

  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="profile-container-box">
        <SideBar />
        <MobileSideBar />
        <div className="profile-main">
          <div>
            <div className="profile-photo-box">
              <img
                src={
                  process.env.REACT_APP_PUBLIC_FOLDER +
                  profileUser.profilePicture
                }
                alt="profile-img"
                className="profile-img"
              ></img>
            </div>
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER + profileUser.coverPicture
              }
              alt="banner"
              className="profile-banner"
            ></img>

            <div className="profile-bio-first-row">
              <div className="profile-bio-username">
                <h6>{profileUser.firstname + " " + profileUser.lastname}</h6>
                <p>@{profileUser.username}</p>
              </div>

              <div className="profile-bio-edit">
                {params.id !== user._id &&
                  (follow ? (
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
                  ))}

                {editProfile && (
                  <Link
                    to={`/editProfile/${profileUser._id}`}
                    state={profileUser}
                  >
                    <button>
                      Edit profile
                      <IoPencil />
                    </button>
                  </Link>
                )}

                {params.id !== user._id && (
                  <button onClick={createUserChat}>
                    chat <RiMessengerLine />
                  </button>
                )}
              </div>
            </div>

            <div className="profile-bio">
            <div className="profile-bio-info-box"> 
                  <h4>About</h4>
              {profileUser.bio && <p><strong>Bio : </strong>{profileUser.bio}</p>}
              {profileUser.worksAt && (
                <p>
                  <strong>Work At : </strong>
                  {profileUser.worksAt}
                </p>
              )}
              {profileUser.community && (
                <p>
                  <strong>interest : </strong>
                  {profileUser.community ? (
                    profileUser.community.map((community, index) => (
                      <span key={index}>{community + " "}</span>
                    ))
                  ) : (
                    <span>"Add community"</span>
                  )}{" "}
                </p>
              )}
              </div>
              <div className="profile-bio-info-box">
                    <div className="profile-follow-following">
                        <div className="follow">
                          <h4>Following</h4>
                          <p>
                            {profileUser.following ? profileUser.following.length : 0}
                          </p>
                        </div>
                        <div className="follow">
                          <h4>Follower</h4>
                          <p>
                            {profileUser.followers ? profileUser.followers.length : 0}
                          </p>
                        </div>
                  </div>
                    <h4>Follow On</h4>
                    <div className="profile-bio-info-social">
              {profileUser?.github && (
                <a href={profileUser.github}> 
                  <IoLogoGithub />
                  
                </a>
              )}
              {profileUser?.linkedin && (
                <a href={profileUser.linkedin}>
                  <IoLogoLinkedin />
                 
              </a>
              )}
              {profileUser?.website && (
                <a href={profileUser.website}>
                  <strong>
                    {" "}
                    <IoIosLink />{" "}
                  </strong>
                  
                </a>
              )}
              </div>

              </div>
            </div>

            

            <div className="user-post">
              <h4> All Posts</h4>
              <Feed id={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
