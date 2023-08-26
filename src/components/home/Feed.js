import React, { useEffect, useState } from "react";
import * as PostApi from "../../api/PostsRequests.js";

import FeedCard from "../home/feedCard";
import { MdAutorenew } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/PostsAction.js";
import { Skeleton } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress } from "@mui/material";
export default function Feed(props) {
  const params = useParams();
  const id = props.id;
  const dispatch = useDispatch();
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  useEffect(() => {
    dispatch(getTimelinePosts(id));
  }, []);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  console.log(posts)

  return (
    <div>

      <div className="card-container">
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered >
            <Tab label="Following" value="1" sx={{color:"var(--color)"}}/>
            <Tab label="Community" value="2" sx={{color:"var(--color)"}}/>
          </TabList>
        </Box>
        <TabPanel sx={{padding:0}} value="1">
        {posts.map((post, id) => {
          return <FeedCard data={post} key={id} loading={loading}/>;
        })}
        </TabPanel>
          </TabContext>
      </Box>
        
      </div>
    </div>
  );
}
