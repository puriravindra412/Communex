import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import profile from "../../images/profile.jpg";
import banner from "../../images/banner.png";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/actions/UploadAction.js";
import { updateUser } from "../../redux/actions/UserAction.js";
import { useParams } from "react-router-dom";
export const ProfileEditMain = (data) => {
  const dispatch = useDispatch();
  const id = data.data._id;
  const admin = data.data.isAdmin;

  const [userProfile, setUserProfile] = useState(data.data);
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const form = useForm({
    defaultValues: {
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      bio: userProfile.bio,
      worksAt: userProfile.worksAt,
      github: userProfile.github,
      linkedin: userProfile.linkedin,
      website: userProfile.website,
      profilePicture: userProfile.profilePicture,
      coverPicture: userProfile.coverPicture,
    },
  });
  const { register, handleSubmit } = form;
  const imageRef = useRef();
  const coverImageRef = useRef();
  const param = useParams();
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const onCoverImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setCoverImage(img);
    }
  };
  const coverImageUpload = async (UserData) => {
    const data = new FormData();
    const fileName = Date.now() + coverImage.name;
    data.append("name", fileName);
    data.append("file", coverImage);
    UserData.coverPicture = fileName;
    try {
      await dispatch(uploadImage(data));
    } catch (err) {
      console.log(err);
    }
    return UserData;
  };
  const onSubmit = (data) => {
    let UserData = data;
    UserData._id = id;
    UserData.isAdmin = admin;

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      coverImageUpload(UserData);
    }
    dispatch(updateUser(param.id, UserData));
    setUserProfile(UserData);
  };
  console.log(userProfile);
  return (
    <div className="profile-edit-main-div">
      <h2>Edit Profile</h2>
      <form className="profile-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-profile-image-change">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="img"></img>
          ) : (
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER + userProfile.profilePicture
              }
              alt="profile-img"
            ></img>
          )}
        </div>
        <button onClick={() => imageRef.current.click()} type="button">
          change Image
        </button>
        <div className="edit-profile-banner-change">
          {coverImage ? (
            <img src={URL.createObjectURL(coverImage)} alt="img"></img>
          ) : (
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER + userProfile.coverPicture
              }
              alt="profile-img"
            ></img>
          )}
        </div>
        <button onClick={() => coverImageRef.current.click()} type="button">
          change Image
        </button>
        <label>First Name</label>
        <input type="text" name="firstname" {...register("firstname")}></input>
        <label>Last Name</label>
        <input type="text" name="lastname" {...register("lastname")}></input>
        <label>Bio</label>
        <input type="text" name="bio" {...register("bio")}></input>
        <label>Works At</label>
        <input type="text" name="worksAt" {...register("worksAt")}></input>
        <label>Git Hub Account </label>
        <input type="text" name="github" {...register("github")}></input>
        <label>Linkedin Account</label>
        <input type="text" name="linkedin" {...register("linkedin")}></input>
        <label>Website</label>
        <input type="text" name="webiste" {...register("website")}></input>

        <button>Submit</button>
        <div style={{ display: "none" }}>
          <input type="file" ref={imageRef} onChange={onImageChange} />
        </div>
        <div style={{ display: "none" }}>
          <input
            type="file"
            ref={coverImageRef}
            onChange={onCoverImageChange}
          />
        </div>
      </form>
    </div>
  );
};
