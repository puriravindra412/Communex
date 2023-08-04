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

export const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [community, setCommunity] = useState([]);
  const user = useSelector((state) => state.authReducer.authData);
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
  const handleChange = (e, editor) => {
    let data = editor.getData();
    setDesc(data);
  };

  const onSubmit = (data) => {
    //post data
    const newPost = {
      userId: user._id,
      username: user.username,
      desc: desc,
      heading: data.heading,
      hashtags: data.tags,
      community: data.community,
      profilePicture: user.profilePicture,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.BannerImage = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost, navigate));
    resetShare();
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
              <CKEditor
                editor={ClassicEditor}
                data={desc}
                onChange={handleChange}
              />
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
              <input type="file" ref={imageRef} onChange={onImageChange} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
