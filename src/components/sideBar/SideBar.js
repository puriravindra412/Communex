import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";

import { CgCommunity } from "react-icons/cg";

import { Link } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";
export default function SideBar() {
  const [activeCategory, setActiveCategory] = useState(
    localStorage.getItem("active-category"),
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    localStorage.setItem("active-category", category);
  };
  return (
    <div className="sidebar-div">
      <div className="side-bar">
        <ul>
          <li className={activeCategory === "home" ? "active" : ""}>
            <Link
              to="/"
              className="link-styling"
              onClick={() => handleCategoryChange("home")}
            >
              <BiHomeAlt2 className="list-icon" /> <span>Home</span>{" "}
            </Link>{" "}
          </li>
          <li className={activeCategory === "explore" ? "active" : ""}>
            <Link
              to="/explore"
              className="link-styling"
              onClick={() => handleCategoryChange("explore")}
            >
              {" "}
              <MdOutlineTravelExplore className="list-icon" />{" "}
              <span>Explore</span>{" "}
            </Link>{" "}
          </li>
          <li className={activeCategory === "createpost" ? "active" : ""}>
            <Link
              to="/createPost"
              className="link-styling"
              onClick={() => handleCategoryChange("createpost")}
            >
              {" "}
              <AiOutlineCloudUpload className="list-icon" />{" "}
              <span>Create Post</span>{" "}
            </Link>{" "}
          </li>
          <li className={activeCategory === "community" ? "active" : ""}>
            {" "}
            <Link
              to="/community"
              className="link-styling"
              onClick={() => handleCategoryChange("community")}
            >
              {" "}
              <CgCommunity className="list-icon" /> <span>Community</span>{" "}
            </Link>
          </li>
          <li className={activeCategory === "communeverse" ? "active" : ""}>
            <Link
              to="/CommuVerse"
              className="link-styling"
              onClick={() => handleCategoryChange("communeverse")}
            >
              {" "}
              <BsRobot className="list-icon" />
              <span>CommuVerse</span>{" "}
            </Link>{" "}
          </li>
          {/*<li> <TiGroupOutline className='list-icon' /> <span>Jobs</span> </li>*/}
          {/* <li> <HiOutlineClipboardList className='list-icon' /><span>Internship</span>  </li>*/}
          <li className={activeCategory === "about" ? "active" : ""}>
            {" "}
            <Link
              to="/about"
              className="link-styling"
              onClick={() => handleCategoryChange("about")}
            >
              {" "}
              <CgCommunity className="list-icon" /> <span>About</span>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
