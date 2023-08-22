import React, { useState, useRef, useEffect } from "react";
import NavBar from "../navbar/navBar";
import { useNavigate } from "react-router-dom";
import "../../css/post.css";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import * as CommunityApi from "../../api/CommunityRequests.js";
import { uploadImage, uploadPost } from "../../redux/actions/UploadAction";
import { AiOutlineCloudUpload } from "react-icons/ai";
import MobileSideBar from "../sideBar/MobileSideBar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

    // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var 
  modules={
    toolbar: toolbarOptions,
  }
export const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [community, setCommunity] = useState([]);
  const user = useSelector((state) => state.authReducer.authData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const communities = async () => {
      const communitData = await CommunityApi.getCommunity();
      setCommunity(communitData.data);
    };
    communities();
  }, []);

  console.log(community.data);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      
    }
  };
  

  const onSubmit = (data) => {
   
    
    const newPost = {
      userId: user._id,
      
      desc: desc,
      heading: data.heading,
      hashtags: data.tags,
      community: data.community,
      
    };

    // if there is an image with post
    if (image) {
      setLoading(true);

      try {
        const data = new FormData();
        data.append("image", image);

        // Dispatch the uploadImage action with the FormData
        const uploadPromise =dispatch(uploadImage(data))
        uploadPromise.then((response) => {
            // Handle the successful response here
            setLoading(false); // Set loading to false as the upload is complete
            console.log("Upload successful:", response.data.url);
            newPost.BannerImage=response.data.url;
            dispatch(uploadPost(newPost, navigate));
          
          resetShare();
          })
          .catch((error) => {
            // Handle any errors that occurred during the upload
            setLoading(false); // Set loading to false as the upload is complete (even in case of an error)
            console.error("Upload error:", error);
            
          });
      } catch (error) {
        alert(error.message);
      }
    }
    
  };

  const resetShare = () => {
    setImage(null);
  };

  const imageRef = useRef();

  // handle post upload

  return (
    <div>
      <NavBar />
      
      <div className="post-container-box">
      <MobileSideBar />
        <form
          className="post-container-box-layout"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="post-upload-header">
            <h4>Create New Post </h4>
            <button type="submit" className="post-upload-button">
              <AiOutlineCloudUpload /> Upload Post
            </button>
          </div>
          <div className="create-post-form">
            <input
              type="text"
              name="heading"
              placeholder=" New Post Heading  Here ..."
              {...register("heading")}
              required
            ></input>
            <button
              onClick={() => imageRef.current.click()}
              type="button"
              required
            >
              Upload Banner Image
            </button>
            {image && (
              <div className="previewImage">
                <img src={URL.createObjectURL(image)} alt="preview" />
              </div>
            )}

            <div className="text-editor">
            <ReactQuill modules={modules} theme="snow" value={desc} onChange={setDesc}  />
            </div>

            <input
              type="text"
              name="tags"
              placeholder="#hashtags"
              {...register("tags")}
            ></input>
            <select name="community" {...register("community")}>
              <option value="javascript" defaultValue={"select"}>
                Select a community
              </option>
              {community.map((community) => {
                return <option value={community.name}>{community.name}</option>;
              })}
            </select>

            <div style={{ display: "none" }}>
              <input type="file" ref={imageRef} onChange={onImageChange} multiple={false} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
