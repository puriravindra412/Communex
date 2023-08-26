import React, { useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { HiHashtag } from "react-icons/hi";
import { CgCommunity } from "react-icons/cg";
import { TiGroupOutline } from "react-icons/ti";

import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";
const MobileSideBar = () => {
  const [activeCategory, setActiveCategory] = useState(
    localStorage.getItem("active-category"),
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    localStorage.setItem("active-category", category);
  };
  return (
    <div className="mobile-sidebar">
      <ul>
        <li className={activeCategory === "home" ? "active" : ""} onClick={() => handleCategoryChange("home")}>
          {" "}
          <Link to="/">
            {" "}
            <BiHomeAlt2 className="list-icon" /><span>Home</span>{" "}
          </Link>{" "}
        </li>
        <li className={activeCategory === "explore" ? "active" : ""} onClick={() => handleCategoryChange("explore")}>
          <Link to="/explore">
            {" "}
            <HiHashtag className="list-icon" /><span>Explore</span>{" "}
          </Link>{" "}
        </li>
        <li className={activeCategory === "createpost" ? "active" : ""} onClick={() => handleCategoryChange("createpost")}>
          <Link to="/createPost">
            {" "}
            <IoAddCircleOutline className="list-icon"  style={{color:"white"}}/><span>Create Post</span>{" "}
          </Link>{" "}
        </li>
        
        <li className={activeCategory === "community" ? "active" : ""} onClick={() => handleCategoryChange("community")}>
          <Link to="/community">
            {" "}
            <CgCommunity className="list-icon" /><span>Community</span>{" "}
          </Link>{" "}
        </li>
       {/* <li className={activeCategory === "communeverse" ? "active" : ""} onClick={() => handleCategoryChange("communeverse")}>
            <Link
              to="/CommuVerse">
              {" "}
              <BsRobot className="list-icon" />
              <span>CommuVerse</span>{" "}
            </Link>{" "}
          </li>
  */}
  <li className={activeCategory === "about" ? "active" : ""} onClick={() => handleCategoryChange("about")}>
  {" "}
  <Link
    to="/about"
   
    
  >
    {" "}
    <CgCommunity className="list-icon" /> <span>About</span>{" "}
  </Link>
</li>
       
      </ul>
    </div>
  );
};
export default MobileSideBar;
