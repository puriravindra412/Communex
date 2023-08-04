import React from "react";

import Feed from "../home/Feed";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineCloudUpload } from "react-icons/ai";
export default function MainContent() {
  const user = useSelector((state) => state.authReducer.authData);
  const id = user._id;

  return (
    <div className="container">
      <div></div>
      <Feed id={id} />
    </div>
  );
}
