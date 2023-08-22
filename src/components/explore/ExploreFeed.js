import React, { useCallback, useEffect, useState } from "react";
import Feed from "../home/Feed";
import * as CommunityApi from "../../api/CommunityRequests.js";
import { TrendingTags } from "../rightSideBar/TrendingTags";
import { useSelector } from "react-redux";
import * as PostApi from "../../api/PostsRequests.js";
import FeedCard from "../home/feedCard";
import Blog from "../home/Blog";
import { UserCard } from "../user/UserCard";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress } from "@mui/material";
export const ExploreFeed = () => {
  const [Community, setCommunity] = useState([]);
  const user = useSelector((state) => state.authReducer.authData);
  const [posts, setPosts] = useState(null);
  const [trandingPost,setTrandingPost] = useState(null);
  const [recentUser,setRecentUser]=useState([])
  const [loading,setLoading]=useState(true)
  
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getRecentPosts = useCallback(async () => {
    try {
      const response = await PostApi.getRecentPost();
      const recentUserData = await CommunityApi.getRecentUser();
      setPosts(response.data);
      setRecentUser(recentUserData.data)
      setTrandingPost(response.data.sort((a, b) => {
        const aLikes = a.likes.length;
        const bLikes = b.likes.length;

        const aComments = a.comments.length;
        const bComments = b.comments.length;

        // Sort by likes in descending order
        if (aLikes !== bLikes) {
            return bLikes - aLikes;
        }
        // If the number of likes is the same, sort by comments in descending order
        return bComments - aComments;
    }))
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      setLoading(false);
    }
  }, []);

  const getCommunityData = useCallback(async () => {
    try {
      const communityData = await CommunityApi.getCommunity();
      setCommunity(communityData.data);
      
    } catch (error) {
      console.error("Error fetching community data:", error);
     
    }
  }, []);

  useEffect(() => {
    getRecentPosts();
    getCommunityData();
  }, [getRecentPosts, getCommunityData]);
  console.log(posts);
  

  


      


  return (
    <div>
      <div className="trending-tag">
        <h2>Trending Tags</h2>
        <div className="trending-tags-grid">
          {Community.slice(0,8).map((index) => {
            return (
              <TrendingTags
                img={index.image}
                name={index.name}
                peoples={index.users}
                posts={index.posts}
                key={index.name}
                loading={loading}
              ></TrendingTags>
            );
          })}
        </div>
      </div>
      <div>
        <div className="card-container">
          
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                  <Tab label="Trending" value="1" sx={{color:"var(--color)"}}/>
                  <Tab label="Recent" value="2" sx={{color:"var(--color)"}}/>
                  <Tab label="Blogs" value="3"  sx={{color:"var(--color)"}}/>
                  <Tab label="Recent Users" value="4"  sx={{color:"var(--color)"}}/>
                </TabList>
              </Box>
            <TabPanel  sx={{padding:0}} value="1">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
              {trandingPost &&
              trandingPost?.map((post, id) => {
                return <FeedCard data={post} key={id} loading={loading}/>;
              })}
                </div>}
          </TabPanel>
          <TabPanel  sx={{padding:0}} value="2">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
              {posts &&
                posts?.map((post, id) => {
                  return <FeedCard data={post} key={id} loading={loading}/>;
                })}
                    </div>}
               
          </TabPanel>
          <TabPanel  sx={{padding:0}} value="3">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
              <Blog />
                </div>}
          </TabPanel>
          <TabPanel  sx={{padding:0}} value="4">
              {loading?<CircularProgress sx={{margin:"30px 45%"}} /> :
               <div className="category-content">
                <div className="community-users">
                {recentUser.filter((people)=>{return people._id !== user._id}).map((people, index) => {
                  return (
                    
                      
                            <UserCard
                              username={people.username}
                              profile={people.profilePicture}
                              userId={people._id}
                              worksAt={people.worksAt}
                              key={index}
                            />
                          
                    
                  )})} 
                  </div>
                </div>}
              
          </TabPanel>
          </TabContext>
      </Box>
    
        </div>
      </div>
    </div>
  );
};
