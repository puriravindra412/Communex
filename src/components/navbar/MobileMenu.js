import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiSaveDown1, CiLogout, CiSettings } from "react-icons/ci";
import "../../css/mobileMenu.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/AuthAction.js";
import { IoCloseSharp } from "react-icons/io5";
export const MobileMenu = ({ showMenu }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const logoutSession = () => {
    dispatch(logout());
  };
  return (
    <div className="hambergur-menu">
      <div className="hambergur-menu-background"></div>
      <div className="hambergur-menu-overlay">
        <button onClick={() => showMenu()}>
          <IoCloseSharp />
        </button>

        {user ? (
          <ul>
            <li>
              {" "}
              <Link to={`/profile/${user._id}`}>
                {" "}
                <CgProfile className="icon" />
                My Profile
              </Link>
            </li>
            <li>
            {" "}
              <Link to={`/my-reading/${user._id}`}>
                {" "}
                <CiSaveDown1 className="icon" />
                Saved Posts
              </Link>
             
            </li>
            <li>
              <CiSettings className="icon" />
              Setting
            </li>
            <li onClick={logoutSession}>
              <CiLogout className="icon" />
              Log out
            </li>
          </ul>
        ) : (
          <ul >
            <li>
              {" "}
              <Link to="/login">
                {" "}
                <CgProfile className="icon" />
                login
              </Link>
            </li>

            <li></li>
          </ul>
        )}
      </div>
    </div>
  );
};
