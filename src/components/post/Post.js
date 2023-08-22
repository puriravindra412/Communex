import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../navbar/navBar";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import * as PostApi from "../../api/PostsRequests.js";
import * as UserApi from '../../api/UserRequests.js'

import { IoShareOutline } from "react-icons/io5";



import { CiSaveDown1 } from "react-icons/ci";

import "../../css/post.css";
import {  useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {  likePost } from "../../api/PostsRequests";
import { async } from "react-input-emoji";
import MuiDrawer from "../home/MuiDrawer";
import { Avatar } from "@mui/material";
import { format } from "timeago.js";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";

import { UnSavePostAction, followUser, savePostAction, unfollowUser } from "../../redux/actions/UserAction";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Troubleshoot } from "@mui/icons-material";
 const Post = () => {
  const  {id } = useParams();
  const postId=id;
  const user = useSelector((state) => state.authReducer.authData);
  const[data,setData] = useState(null);
  const [likes, setLikes] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(true);
  const [comments, setComments] = useState(false);
  const [follow, setFollow] = useState(!user?.following?.includes(data?.post?.userId));
  const [isSaved,setIsSaved]=useState(null)
  const dispatch = useDispatch();

  const handleclickFollow = async () => {
    dispatch(followUser(data?.post?.userId, user));
    setFollow(false);
  };

  const handleclickUnFollow = () => {
    dispatch(unfollowUser(data?.post?.userId, user));

    setFollow(true);
  };
  const getPostData = useCallback(async (postId) => {
    try {
      const res = await PostApi.getPost(postId);
      setData(res.data);
  
      // Update likes and liked status using the updated data
      setLikes(res.data?.post?.likes.length);
      setLiked(res.data?.post?.likes.includes(user._id));
      setCommentsCount(res.data?.post?.comments?.length);
      setIsSaved(user.savedPosts.includes(res.data?.post?._id))
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }, [postId, user?._id]);

 useEffect(()=>{
   
   getPostData(postId)
  },[postId])
console.log("data inside post ",data)
 
  
  
  
  
  const handleLike = () => {
    likePost(data.post._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const showComment = () => {
    comments ? setComments(false) : setComments(true);
  };

  const handleclickSavePost = () => {
    const postPromise =dispatch(savePostAction(user._id,data.post));
    
    postPromise.then((response) => {
       
        console.log("Upload successful:", response.data);
        toast.success(response.data, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       
        setIsSaved(prev=>!prev)
      })
      
      .catch((error) => {
        // Handle any errors that occurred during the upload
       // Set loading to false as the upload is complete (even in case of an error)
        console.error("error:", error);
        
      });
  
  };

  const handleclickUnSavePost = () => {
    const postPromise = dispatch(UnSavePostAction(user._id,data.post ));
    postPromise.then((response) => {
       
      console.log("Upload successful:", response.data);
      toast.success(response.data, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSaved(prev=>!prev)
   
    })
    
    .catch((error) => {
      // Handle any errors that occurred during the upload
      // Set loading to false as the upload is complete (even in case of an error)
      console.error("error:", error);
      
    });
  };


console.log(likes)
  return (
    <div className="app">
      <NavBar />
      <div className="post-outer-container">
        <div className="post-inner-container">
          <img className="post-image-banner" src={data?.post?.BannerImage}  alt="alakakk" />
          <div className="post-user-details-container">
            <Avatar src={data?.userDetails?.profilePicture} alt={data?.userDetails?.username} />
            <div className="post-user-details-container-item">
            <p >{data?.userDetails?.username}</p>
            <p className="post-user-details-container-item-time"><spna>Created at -</spna><span>{format(data?.post.createdAt)}</span> </p>
            
            </div>
            <div>
            {data?.post?.userId !== user?._id &&(follow ? (
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
            </div>
            
          </div>
          
         <div
          className="prose sm:prose-md html-content"
          dangerouslySetInnerHTML={{ __html: data?.post?.desc}}>
          </div>
          <div className="like-comment-box fix-like-comment-div">
          <button className="post-like" onClick={handleLike}>
            {liked ? <AiFillHeart style={{color:'red'}}/> : <AiOutlineHeart />}
            <p>{likes}</p>
          </button>
          <button className="post-like" onClick={showComment}>
          <MuiDrawer  className="post-like" data={data}  commentsCount={commentsCount}  setCommentsCount={setCommentsCount}></MuiDrawer>
            <p>{commentsCount}</p>
          </button>
          <button className="post-like">
            <IoShareOutline />
          </button>
         
          <button className="post-like" >
          {isSaved
            ? <MdOutlineBookmarkAdded  color="green" onClick={handleclickUnSavePost} />: <MdOutlineBookmarkAdd  onClick={handleclickSavePost}/>}
          </button>
          
        </div>
        </div>
       </div>
    </div>
  )
};

export default Post;
