import React, { useRef, useState } from "react";

import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversations from "./Conversations";
import { MdArrowBack } from "react-icons/md";
import ChatBox from "./ChatBox";

import { useNavigate } from "react-router-dom";
const ChatMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useRef();
  const user = useSelector((state) => state.authReducer.authData);
  const currentUser = user._id;
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setIsChatListVisible(false);
    setIsChatBoxVisible(true);
  };

  return (
    <div>
      <div className="Chat">
        {/* Left Side */}

        {isChatListVisible && (
          <div className="Left-side-chat">
            <div className="Chat-container">
              <div className="chat-list-header">
                <h2>Chats</h2>
                <button onClick={() => navigate(-1)}>
                  <MdArrowBack />
                </button>
              </div>
              <div className="Chat-list">
                {chats.map((chat) => (
                  <div onClick={() => handleChatClick(chat)}>
                    <Conversations
                      data={chat}
                      currentUser={user._id}
                      online={checkOnlineStatus(chat)}
                      receivedMessage={receivedMessage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Side */}
        {isChatBoxVisible && (
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatMobile;
