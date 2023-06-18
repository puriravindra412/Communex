import React, { useEffect, useState } from 'react'
import { AiFillHeart,AiOutlineHeart,AiOutlineSend } from "react-icons/ai";
import { IoIosMore} from "react-icons/io";
import { FiShare2} from "react-icons/fi";
import { CiHeart} from "react-icons/ci";
import { FaRegComment,FaHotjar } from "react-icons/fa";
import { CiSaveDown1 } from "react-icons/ci";
import { MdAutorenew } from "react-icons/md";
import { useSelector } from "react-redux";
import { HiViewGrid } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { commentPost, likePost } from '../../api/PostsRequests';
import { useForm } from "react-hook-form";


export const FeedCard=(data)=> {
  
  const user = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.data.likes.length)
  const [more, setMore] = useState(false)
  const {register, handleSubmit }=useForm();
  const [commentsCount, setCommentsCount] = useState(data.data.comments.length);
  const [comments, setComments] = useState(false)
 
  const handleLike = () => {
    likePost(data.data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  const showComment = () => {
    
    comments?setComments(false):setComments(true);
  };
  const handleComment=(form,e)=>{
    const comment=form.comment;
    commentPost(data.data._id, user._id,data.data.username,comment);
    setCommentsCount((prev)=>prev+1)
    e.target.reset();
   
    
  }


  const showMore=()=>{
    (!more)?setMore(true):setMore(false);
  }
  
  let date = new Date(data.data.createdAt);
   let newDate= date.toLocaleDateString('en-US');
  
    
  return (
   
    <div className='feed-container' >
    
    <div className='top-feed-post'>
     <img src={process.env.REACT_APP_PUBLIC_FOLDER+data.data.profilePicture} alt='profile' class="profile-post-image"></img>
     <Link to={`/profile/${data.data.userId}`} className='user-name'>{data.data.username}</Link>
    
    <p className="time">{newDate}</p>
    <IoIosMore className='post-more'  onClick={showMore} />
    {more &&
       <div className='post-more-option'>
        <ul>
          <li>
          Edit 
          </li>
        {user._id===data.data.userId?<li>delete post</li>:""}
        </ul>
      </div>}
      
    </div>
    
    
    <Link to={`/post/${data.data._id}`}state={data.data} className='heading'>{data.data.heading}</Link>
    <Link to='/post' state={data.data} ><p className='subtitle' dangerouslySetInnerHTML={{__html: data.data.desc.substring(0,400)+"<strong>....Read More</strong>"}}></p></Link>
    <img src={data.data.BannerImage ? process.env.REACT_APP_PUBLIC_FOLDER + data.data.BannerImage : ""} alt="profile" className='post-image'></img>
    
    <p className='subtitle'>{data.data.hashtags}</p>
    <div className='like-comment-box'>
    <button className='post-like' onClick={handleLike}>{liked?<AiFillHeart />:<AiOutlineHeart />}<p>{likes}</p></button>
    <button className='post-like' onClick={showComment}><FaRegComment /><p>{commentsCount}</p></button>
    <button className='post-like'><FiShare2 /></button>
    <button className='post-like'><CiSaveDown1 className='save' /></button>
    </div>
  
   {comments?
    <div className='comment-list'>
    <ul>
    {data.data.comments.slice(0,3).map((item, id) => {
      return <li key={id}><span>{item.username}</span>{item.comment}</li>;
    })}
    </ul>
    <form className='comment-box' onSubmit={handleSubmit(handleComment) }>
    <input type="text" name="comment" {...register('comment')}></input>
    <button  type="submit" ><AiOutlineSend /></button>
    
    </form></div>:""
  }
    </div>
    
  )
}
export default FeedCard;
