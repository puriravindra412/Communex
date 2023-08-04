import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../navbar/navBar";
import SideBar from "../sideBar/SideBar";
import MobileSideBar from "../sideBar/MobileSideBar";
import { UserCard } from "../user/UserCard";
import "./search.css";
import { Searchresult } from "./Searchresult";
export const Search = () => {
  const { state } = useLocation();

  return (
    <div>
      <NavBar />
      <div className="main-content">
        <SideBar />
        <MobileSideBar />
        <Searchresult state={state} />
      </div>
    </div>
  );
};
