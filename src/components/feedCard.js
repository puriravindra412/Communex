import React from 'react'
import images from '../images/post.jpeg'
import profile from '../images/profile.jpg'
import { IoIosMore} from "react-icons/io";
import { FiShare2} from "react-icons/fi";
import { CiHeart} from "react-icons/ci";
import { FaRegComment,FaHotjar } from "react-icons/fa";
import { CiSaveDown1 } from "react-icons/ci";
import { MdAutorenew } from "react-icons/md";

import { HiViewGrid } from "react-icons/hi";
export const FeedCard=(props)=> {

  return (
   
    <div className='feed-container' >
    
    <div className='top-feed-post'>
     <img src={props.profilePicture} alt='profile' class="profile-post-image"></img>
    <a href="heheheh" className='user-name'>{props.userName}</a>
    <p className="time">5 hour ago</p>
    <IoIosMore className='post-more' />
    </div>
    <a href="hddhh" className='heading'>{props.heading}</a>
    <img src={props.image} alt="profile" className='post-image'></img>
    <p className='subtitle'>{props.tags}</p>
    <div className='like-comment-box'>
    <button className='post-like'><CiHeart /><p>40</p></button>
    <button className='post-like'><FaRegComment /><p>40</p></button>
    <button className='post-like'><FiShare2 /></button>
    <button className='post-like'><CiSaveDown1 className='save' /></button>
    </div>
    </div>
    
  )
}
export default FeedCard;
