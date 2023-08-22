import React, { memo, useEffect, useState } from "react";
import profile from "../../images/profile.jpg";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
import "../../css/conversation.css";
import { Avatar } from "@mui/material";
 const Conversations = memo(({
  data,
  currentUser,
  online,
  
}) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  },[] );
  console.log(userData);
  return (
    <div>
      {userData && (
        <div className="chat-user-card">
          {online && <div className="online-dot"></div>}
          <Avatar
            src={
              
               userData.profilePicture
                
            }
            alt={userData?.usernam}
          />
          <div className="chat-user-information">
            <strong>{userData?.username}</strong>
            <p>{userData?.firstname + " " + userData?.lastname}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default Conversations;
