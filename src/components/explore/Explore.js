import React from "react";
import { ExploreFeed } from "./ExploreFeed";

import NavBar from "../navbar/navBar";
import SideBar from "../sideBar/SideBar";
import MobileSideBar from "../sideBar/MobileSideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ExploreLogin from "../rightSideBar/ExploreLogin";

export default function Explore() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <SideBar />
        <MobileSideBar />
        <ExploreFeed />
        { !user && <ExploreLogin />
          
      }
        {/*<MainContent />*/}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
