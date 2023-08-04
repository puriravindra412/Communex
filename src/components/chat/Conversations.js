import React, { useEffect, useState } from "react";
import profile from "../../images/profile.jpg";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
import "../../css/conversation.css";
 const Conversations = ({
  data,
  currentUser,
  online,
  receivedMessage,
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
  }, []);
  console.log(userData);
  return (
    <div>
      {userData && (
        <div className="chat-user-card">
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : profile
            }
            alt="Profile"
          />
          <div className="chat-user-information">
            <strong>{userData?.username}</strong>
            <p>{userData?.firstname + " " + userData?.lastname}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversations;
