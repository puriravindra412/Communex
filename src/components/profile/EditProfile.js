import React from "react";
import { useLocation } from "react-router-dom";
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileEditMain } from "./ProfileEditMain";
import "../../css/editProfile.css";

export const EditProfile = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="edit-profile-container">
      <ProfileSidebar data={data} className="edit-profile-sidebar" />
      <ProfileEditMain data={data} className="edit-profile-main" />
    </div>
  );
};
