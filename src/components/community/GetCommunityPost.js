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
import { UserCard } from "../user/UserCard.js"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress } from "@mui/material";
export const GetCommunityPost = () => {
  const location = useLocation();
  const [img, peoples, posts] = location.state;
  const [loading,setLoading]=useState(true)
  const params = useParams();
  const name = params.name;
  const [postDiv, setPostDiv] = useState(true);
  const [userDiv, setUserDiv] = useState(false);
  const [Community, setCommunity] = useState([]);
  const [value, setValue] = React.useState('1');
  useEffect(() => {
    const communities = async () => {
      setLoading(true);
      const communitData = await CommunityApi.getCommunityPost(name);
      setCommunity(communitData.data);
      setLoading(false)
    };
    communities();
  }, [name]);

  const user = useSelector((state) => state.authReducer.authData);

  const addUser = () => {
    const data = {
      name: name,
      userId: user?._id,
      
    };
    addCommunity(data);
  };
  const addCommunity = async (data) => {
    const { res } = await CommunityApi.addUserToCommunity(data);
    alert(res);
  };
  console.log("inside get community " ,Community)
  const [activeCategory, setActiveCategory] = useState("user");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const users = peoples.filter((people) => {
    return people.userId !== user?._id;
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
            <div className="card-container">
          
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                  <Tab label="Posts" value="1" sx={{color:"var(--color)"}}/>
                  <Tab label="Users" value="2" sx={{color:"var(--color)"}}/>
                  
                </TabList>
              </Box>
              <TabPanel  sx={{padding:0}} value="1">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
              {
                  Community?.result?.post.map((post, id) => {
                    return <FeedCard data={post} key={id} />;
                  })}
                </div>}
            </TabPanel>
            <TabPanel  sx={{padding:0}} value="2">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
              <div className="community-users">
              {Community?.result?.usersData.filter((people)=>{return people._id !== user?._id}).map((people, index) => {
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
              
                </div>}
            </TabPanel>
            </TabContext>
            </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                  };