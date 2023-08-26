import React, {  useState } from "react";
import { AiFillHeart, AiOutlineHeart,  } from "react-icons/ai";
import { IoIosMore} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import * as UserApi from '../../api/UserRequests.js'
import { Link,useNavigate } from "react-router-dom";
import {  likePost } from "../../api/PostsRequests";
import { IoShareOutline } from "react-icons/io5";
import { Skeleton } from "@mui/material";
import MuiDrawer from "./MuiDrawer";
import {  MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UnSavePost, UnSavePostAction, savePostAction } from "../../redux/actions/UserAction.js";
export const FeedCard = ({data,loading}) => {
  console.log(loading)
  const user = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.post?.likes?.includes(user?._id));
  const [likes, setLikes] = useState(data?.post?.likes.length);
  const [more, setMore] = useState(false);
  const [commentsCount, setCommentsCount] = useState(data?.post?.comments?.length);
  const [isSaved,setIsSaved]=useState(user?.savedPosts?.includes(data.post._id))
  const [comments, setComments] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleLike = async() => {
    if(user){
      const res=await likePost(data.post._id, user?._id);
      setLiked((prev) => !prev);
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
      toast.success(res.data, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }else{
      navigate("../login", { replace: true });
    }
    
  };
  const showComment = () => {
    
    comments ? setComments(false) : setComments(true);
  };
 

  const showMore = () => {
    !more ? setMore(true) : setMore(false);
  };

  let date = new Date(data?.post?.createdAt);
  let newDate = date.toLocaleDateString("en-US");

  const handleclickSavePost = () => {
    if(user){
      const postPromise =dispatch(savePostAction(user?._id,data.post));
    
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
    
    }
    else{
      navigate("../login", { replace: true });
    }
    
  };

  const handleclickUnSavePost = () => {
    if(user){
    const postPromise = dispatch(UnSavePostAction(user?._id,data.post ));
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
      
    });}
    else{
      navigate("../login", { replace: true });
    }
  };

  

  return (
    <div className="feed-container">
      <div className="top-feed-post">
    {loading?<Skeleton variant="circular" width={40} height={40} />:
        <img
          src={data?.userDetails?.profilePicture}
          alt="profile"
          class="profile-post-image"
        ></img>}

        {loading?<Skeleton variant="text" width={100} sx={{fontSize:'13px',marginLeft:"5px"}} animation="wave" />:<Link to={`/profile/${data?.userDetails?._id}`} className="user-name">
          {data?.userDetails?.username}
        </Link>}

        {loading?<Skeleton variant="text" width={50} sx={{fontSize:'8px',marginLeft:"5px"}} animation="wave" />:<p className="time">{newDate}</p>}
        <IoIosMore className="post-more" onClick={showMore} />
        {more && (
          <div className="post-more-option">
            <ul>
              <li>Edit</li>
              {user?._id === data?.userDetails?.userId ? <li>delete post</li> : ""}
            </ul>
          </div>
        )}
      </div>

      <div className="post-align-box">
      {loading?<Skeleton variant="text" width={'80%'} sx={{fontSize:'25px',marginLeft:"5px"}} animation="wave" />:
        <Link
          to={`/post/${data?.post?._id}`}
          
          className="heading"
        >
          {data?.post?.heading}
        </Link>}
        {loading?
          <div>
          <Skeleton variant="text" width={'60%'} sx={{fontSize:'15px',marginLeft:"5px"}}  animation="wave"/>
          <Skeleton variant="text" width={'70%'} sx={{fontSize:'15px',marginLeft:"5px"}} animation="wave"/>
          <Skeleton variant="text" width={'60%'} sx={{fontSize:'15px',marginLeft:"5px"}} animation="wave"/>
          <Skeleton variant="text" width={'70%'} sx={{fontSize:'15px',marginLeft:"5px"}} animation="wave"/>
          </div>:
        <Link to={`/post/${data?.post?._id}`} >
          <p
            className="subtitle"
            dangerouslySetInnerHTML={{
              __html:
                data?.post?.desc?.substring(0, 250) +
                "<strong>....Read More</strong>",
            }}
          ></p>
        </Link>}
        {loading?<Skeleton variant="rounded" width={'80%'} height={150} sx={{margin:"10px"}} animation="wave"/>:
        <img
          src={
            data?.post?.BannerImage
              ? data?.post?.BannerImage
              : ""
          }
          alt="profile"
          className="post-image"
        ></img>}

        {loading
          ? <Skeleton variant="text" width={'60%'} sx={{fontSize:'10px',marginLeft:"5px"}} animation="wave" />
        : <p className="subtitle">{data?.post?.hashtags}</p>}
       

       </div>
       {loading
        ? <Skeleton variant="text" width={250} sx={{fontSize:'15px',marginLeft:"5px"}} animation="wave" />:
      <div className="like-comment-box">
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
        
      </div>}
    </div>
  );
};
export default FeedCard;
