import React, { useEffect, useState } from "react";
import * as PostApi from '../../api/PostsRequests.js'



import FeedCard from '../home/feedCard';
import { MdAutorenew } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

import { Link ,useParams} from 'react-router-dom';


export default function Feed(props){
  
  const params = useParams()
  const id =props.id;
  
 let [userPost,setPost]=useState([]);
  useEffect(() => {
    const fetchProfileUser = async (id) => {
        
        console.log("fetching")
        const profileUser = await PostApi.getTimelinePosts(id);
        setPost(profileUser.data);
        
      
    };
    fetchProfileUser(id);
  }, [id]);
  if(!userPost) return 'No Posts';
  if(params.id) userPost = userPost.filter((post)=> post.userId===params.id);
  console.log(userPost)

  return (
   <div>
    <div className='card-container'>
    <div className='container-top'>
    <button  className='container-top-button'><MdAutorenew /> New</button>
    <button className='container-top-button'><FaHotjar /> hot</button>
    <button className='container-top-button'><HiViewGrid /> view</button>
    </div>
   { userPost.map((post, id) => {
          return <FeedCard data={post} key={id} />;
        })}
  
    
            
      </div>
      </div>
        
       

    
  )
}
