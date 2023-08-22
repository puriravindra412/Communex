import React from "react";
import {  BsPersonPlusFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as CommunityApi from "../../api/CommunityRequests.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
const toastConfig = {
  // Your toast configuration here
  position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
};
export const TrendingTags = ({ img, name, peoples, posts,loading }) => {
  const user = useSelector((state) => state.authReducer.authData);
  console.log(peoples)
  const addUser = (data) => {
    
    CommunityApi.addUserToCommunity(data)
      .then((response) => {
        console.log(response)
        if (response.data === "user added ") {
          toast.success("You have joined A Community Successfully", toastConfig);
        } else {
          toast.error("You have Already Joined this Community", toastConfig);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while joining the community", toastConfig);
      });
  };



  // Example usage, call 'addUser' when a button is clicked
  const handleJoinButtonClick = () => {
    const data = {
      name: name,
      userId:user._id,
     
    };
    addUser(data);
  };

  

  return (
    <div className="trending-tag-box-design">
    {loading?<Skeleton varient="rounded" height={40} width={40}  />:<img src={ img} alt={img} />}
      
      <div>
      {loading?<Skeleton variant="text" width={100} sx={{fontSize:'20px',marginLeft:"5px"}} animation="wave" />:<Link to={`/community/${name}`} state={[img, peoples, posts]}>
          {" "}
          <h5>{name}</h5>
        </Link>}
        {loading?<Skeleton variant="text" width={50} sx={{fontSize:'10px',marginLeft:"5px"}} animation="wave" />: <p>{peoples.length} people joined</p>}
      </div>
      {loading?<Skeleton variant="circular" width={35} height={35} sx={{marginLeft:"5px"}} animation="wave" />:<button className="trending-tag-box-design-button" onClick={handleJoinButtonClick}>
        {peoples.find(users=>users.userId===user._id)?<FaCheck color="green" />: <BsPersonPlusFill />}
      </button>}
    </div>
  );
};
