
import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, IconButton, Skeleton, Typography } from '@mui/material';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import * as PostApi from "../../api/PostsRequests.js";
import { useSelector } from 'react-redux';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'timeago.js';
const CommentList = ({comment,userDetails,id,postId,setCommentsCount,commentsAfterDeleteion,index,loading}) => {
    
    const user=useSelector((state)=>state.authReducer.authData)
    
    const actions=(user?._id===id||userDetails._id===user?._id)

    const deleteComment=async(postId,_id)=>{

            const res=await PostApi.deleteCommentPost(postId,_id);
            setCommentsCount(prev=>prev-1)
            commentsAfterDeleteion(index)
            toast.success("comment deleted successful", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            console.log(res)
        
    }
  return (
    <div >
    {loading?<Skeleton  varient="rect" height={"6em"} width={"100%"}/>:<List sx={{ width: '100%' ,margin:"10px"}} >
    <ListItem alignItems="flex-start" secondaryAction={actions&&
        <IconButton edge="end" aria-label="comments"  onClick={()=>{deleteComment(postId,comment._id,index)}}>
          <MdOutlineDeleteOutline />
        </IconButton> }>
      <ListItemAvatar>
       <Avatar style={{height:'40px',width:'40px',borderRadius:'50%'}} alt="Remy Sharp" src={userDetails.profilePicture} />
      </ListItemAvatar>
      <ListItemText sx={{textAlign:'start'}}
        primary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {userDetails.username}
              </Typography>
              {format(comment.timestamp)}
            </React.Fragment>
          }
        secondary={
          
            
            <div style={{ maxWidth:'100%',width:'300px',fontSize:'12px'}}
          className="prose sm:prose-sm"
          dangerouslySetInnerHTML={{ __html: comment.comment }}
        ></div>
          
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    </List>}
    </div>
  )
}

export default CommentList