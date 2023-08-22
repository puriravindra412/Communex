import React, { memo, useCallback, useEffect, useState } from 'react'
import { commentPost } from "../../api/PostsRequests";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Skeleton } from "@mui/material";
import * as PostApi from "../../api/PostsRequests.js";
import { useSelector } from 'react-redux';
import CommentList from './CommentList';
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 const CommentEditor = memo(({data,commentsCount, setCommentsCount,setOpen}) => {
    const {  handleSubmit } = useForm();
    const [value, setValue] = useState('');
    const user = useSelector((state) => state.authReducer.authData);

    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(true)
    const getComments= useCallback(async () => {
      setLoading(true)
      try {
        const response = await PostApi.getPostComments(data.post._id)
        setComments(response.data);
        setTimeout(()=>setLoading(false),2000);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        setLoading(false);
      }
    }, [data]);
  
    useEffect(() => {
      getComments();
      
    }, [getComments]);
    

    const handleComment = async( e) => {
      console.log(value)
      if(value!=='<p><br></p>'&&value!==''){
       
        const comment = value;
        const res =await commentPost(data.post._id, user._id, data.username, comment);
        
        setComments(res.data);
        setCommentsCount((prev) => prev + 1);
       
       setValue('')
       toast.success("Comment posted sucessfull", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     
       
      
      }
       
       else{
        toast.error("Oops! comment section can't be empty", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
       }
      };
console.log("inside comment editor",comments)
  var toolbarOptions = [
    
    ['bold', 'italic', 'underline'],        // toggled buttons
    ['blockquote', 'code-block'],
     
    
                                           // remove formatting button
  ];
  
  var 
    modules={
      toolbar: toolbarOptions,
    }

    const commentsAfterDeleteion=(commentindex)=>{
     const newComments= comments.filter((item,index)=>{return index!==commentindex})
     setComments(newComments);

    }
  return (
    <div>
  
    <form onSubmit={handleSubmit(handleComment)} style={{position:'fiexd'}}>
    {loading?<Skeleton variant="rounded" width={'100%'}  height={'6em'} animation="wave"/>: <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} required/>}
            <div className="comment-submit-button-box">
            {loading?<Skeleton  sx={{margin:'5px'}} width={'100px'} variant="text" animation="wave" height={50} />:<button className="comment-submit-button" type='button'  onClick={(e)=>setOpen(false)}>Cancel</button>}
            {loading?<Skeleton  sx={{margin:'5px'}} width={'100px'} variant="text"  animation="wave" height={50} />: <button type="submit" className="comment-submit-button">Add Comment</button>}
              
            </div>
            
    </form>
    <div className="comment-list">
    
    {comments.map((item, index) => {
      return <CommentList comment={item.comment} userDetails={item.userDetails} id={data.post.userId} postId={data.post._id}  setCommentsCount={setCommentsCount} commentsAfterDeleteion={commentsAfterDeleteion} index={index} loading={loading}/>
        
    })}
  
    </div>
    </div>
  )
})
export default CommentEditor;
