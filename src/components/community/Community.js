import React from "react";
import { Addcommunity } from "./Addcommunity";
import MobileSideBar from "../sideBar/MobileSideBar";
import NavBar from "../navbar/navBar";
import SideBar from "../sideBar/SideBar";

export const Community = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <SideBar />
        <MobileSideBar />
        <Addcommunity />
      </div>
    </div>
  );
};
