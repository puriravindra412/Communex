import React, { useState } from 'react'
import { commentPost } from "../../api/PostsRequests";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 const CommentEditor = ({data,user,commentsCount, setCommentsCount}) => {
    const {  handleSubmit } = useForm();
    const [value, setValue] = useState('');
    const handleComment = ( e) => {
        const comment = value;
        console.log(comment)
        commentPost(data.data._id, user._id, data.data.username, comment);
        setCommentsCount((prev) => prev + 1);
       
       setValue('')
      };

  var toolbarOptions = [
    
    ['bold', 'italic', 'underline'],        // toggled buttons
    ['blockquote', 'code-block'],
     
    
                                           // remove formatting button
  ];
  
  var 
    modules={
      toolbar: toolbarOptions,
    }
  return (
    <form onSubmit={handleSubmit(handleComment)}>
            <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
            <div className="comment-submit-button-box">
              <button className="comment-submit-button">Cancel</button>
              <button className="comment-submit-button">Add Comment</button>
            
            </div>
            
    </form>
  )
}
export default CommentEditor;
