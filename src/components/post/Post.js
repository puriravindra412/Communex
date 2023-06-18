import React,{useState} from 'react'
import NavBar from '../navbar/navBar'
import { AiFillHeart,AiOutlineHeart,AiOutlineSend } from "react-icons/ai";
import { IoIosMore} from "react-icons/io";
import { FiShare2} from "react-icons/fi";
import { FaRegComment,FaHotjar } from "react-icons/fa";
import { CiSaveDown1 } from "react-icons/ci";
import '../../css/post.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { commentPost, likePost } from '../../api/PostsRequests';
import { useForm } from "react-hook-form";
import ReactMarkdown from 'https://esm.sh/react-markdown@7'
export const Post = () => {

  const location = useLocation();
  const user = useSelector((state) => state.authReducer.authData);
const data = location.state;
console.log(data);
    

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [more, setMore] = useState(false)
  const {register, handleSubmit }=useForm();
  const [commentsCount, setCommentsCount] = useState(data.comments.length);
  const [comments, setComments] = useState(false)
 
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  const showComment = () => {
    
    comments?setComments(false):setComments(true);
  };
  const handleComment=(form,e)=>{
    const comment=form.comment;
    commentPost(data._id, user._id,data.username,comment);
    setCommentsCount((prev)=>prev+1)
    e.target.reset();
    
    
  }


  const showMore=()=>{
    (!more)?setMore(true):setMore(false);
  }
  
  
  return (
    <div className='postbox'>
            <NavBar />
            
            <div className='post-container-box'>
                   
                   <img src={data.BannerImage ? process.env.REACT_APP_PUBLIC_FOLDER +data.BannerImage : ""}  alt={'Banner'} className="post-image-banner"></img>
                   <h1>{data.heading}</h1>
                   <div className='prose lg:prose-xl html-content ' dangerouslySetInnerHTML={{__html: data.desc}}></div>
                   <div className='like-comment-box'>
                   <button className='post-like' onClick={handleLike}>{liked?<AiFillHeart />:<AiOutlineHeart />}<p>{likes}</p></button>
                   <button className='post-like' onClick={showComment}><FaRegComment /><p>{commentsCount}</p></button>
                   <button className='post-like'><FiShare2 /></button>
                   <button className='post-like'><CiSaveDown1 className='save' /></button>
                   </div>
                 
                  {comments?
                   <div className='comment-list'>
                   <ul>
                   {data.comments.map((item, id) => {
                     return <li key={id}><span>{item.username}</span>{item.comment}</li>;
                   })}
                   </ul>
                   <form className='comment-box' onSubmit={handleSubmit(handleComment) }>
                   <input type="text" name="comment" {...register('comment')}></input>
                   <button  type="submit" ><AiOutlineSend /></button>
                   
                   </form></div>:""
                 } 
            </div>
    </div>
  )
}
