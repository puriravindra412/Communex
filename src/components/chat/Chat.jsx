import React, { useCallback, useRef, useState } from "react";

import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversations from "./Conversations";
import { MdArrowBack } from "react-icons/md";
import ChatBox from "./ChatBox";

import { useNavigate } from "react-router-dom";

const Chat = () => {
  const socket = useRef();
  const user = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the chat in chat section
  const fetchChats = useCallback(async () => {
    try {
      const { data } = await userChats(user._id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [user._id]);

  // Effect to fetch data on mount and when user ID changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    fetchChats()
      .then((data) => {
        if (!isCancelled) {
          setChats(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [fetchChats]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div>
      <div className="Chat">
        {/* Left Side */}

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
                <div
                  className="single-user-chat"
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
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

        {/* Right Side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
