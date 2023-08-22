import React, { useCallback, useEffect, useState } from 'react'
import NavBar from '../navbar/navBar';
import Blog from "../home/Blog";
import * as UserApi from "../../api/PostsRequests"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress} from "@mui/material";
import { useParams } from 'react-router-dom';
import FeedCard from '../home/feedCard';

const SavedPost = () => {
    const {id}=useParams();
    const [value, setValue] =useState('1');
    const [posts,setPosts]=useState(null);
    const [loading,setLoading]=useState(true)
    console.log(id)
    const getSavedPostData=useCallback(async()=>{
        setLoading(true)
        const res=await UserApi.getSavedPosts(id)
        setPosts(res.data)
        setLoading(false)
    },[id])

    useEffect(()=>{
        getSavedPostData()
    },[id])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
  return (
    <div>
      <NavBar />
      <div className="post-container-box">
      <div className="post-container-box-layout" style={{border:"none",boxShadow:"none",backgroundColor:'var(--outer-div-background)'}} >
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="My Reading" value="1" sx={{color:"var(--color)"}}/>
            <Tab label="My BookList" value="2" sx={{color:"var(--color)"}}/>
            
          </TabList>
        </Box>
         <TabPanel sx={{padding:0}}  value="1">
        {loading?<CircularProgress sx={{margin:"30px 45%"}}  /> :<div className="category-content">
        {posts&&posts.map((post, id) => {
                      return <FeedCard data={post} key={id} loading={loading}/>;
                    })}
                    
                    {posts.length===0 &&<h4 style={{textAlign:"center",justifyContent:"center"}}>You dont Have Any thing in your Reading list</h4>}
                  </div>}
        </TabPanel>
    </TabContext>
      </Box>
    </div>
    </div>
    </div>
   
    
    
  )
}

export default SavedPost;