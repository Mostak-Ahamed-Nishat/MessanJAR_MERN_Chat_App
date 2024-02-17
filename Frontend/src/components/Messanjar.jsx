import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisH, FaRegEdit, FaSearch } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../redux/actions/conversationListAction";
import { io } from "socket.io-client";

import {
  getMessageAction,
  imageMessageSendAction,
  messageSendAction,
} from "../redux/actions/messageAction";
import { generateImageName } from "../../lib/generateImageName";

export default function Messanjar() {
  const dispatch = useDispatch();
  //Auth user
  const [authUserData, setAuthUserData] = useState({});
  //Conversation list
  const [conversations, setConversations] = useState([]);
  //All messages
  const [allMessages, setAllPreviousMsg] = useState([]);
  //Current chat open
  const [currentFriend, setCurrentFriend] = useState({});
  //Get the message from text box
  const [message, setMessage] = useState("");
  // Socket Active user
  const [activeUser, setActiveUser] = useState("");
  //Get the socket new message
  const [socketMessage, setSocketMessage] = useState("");

  //For scroll down
  const scrollRef = useRef();
  //SOcket
  const socket = useRef();

  //Conversations list
  let { isSuccess, data } = useSelector((state) => state.conversations);

  //Get user conversation friend list
  useEffect(() => {
    dispatch(getAllFriends());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0 && isSuccess) {
      setConversations([...data]);
    }
  }, [data, dispatch, isSuccess]);

  //User Authentication
  let { isSuccess: authSuccess, data: authData } = useSelector(
    (state) => state.auth
  );

  //Set the authenticated user to the state
  useEffect(() => {
    setAuthUserData({ ...authData });
  }, [authSuccess, authData]);

  //Select the first conversation as an open chat box
  useEffect(() => {
    if (conversations.length > 0) {
      setCurrentFriend(conversations[0]);
    }
  }, [conversations]);

  //change the current chatting friend
  useEffect(() => {
    dispatch(getMessageAction(currentFriend._id));
  }, [currentFriend?._id, dispatch, currentFriend]);

  //Get all the message with selected friend chat message
  const {
    isSuccess: isGetMsgSuccess,
    isError: isGetMsgError,
    messages: getAllPreviousMsg,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    if ((isGetMsgSuccess, !isGetMsgError)) setAllPreviousMsg(getAllPreviousMsg);
  }, [getAllPreviousMsg, isGetMsgError, isGetMsgSuccess]);

  useEffect(() => {
    setAllPreviousMsg([...getAllPreviousMsg]);
  }, [getAllPreviousMsg]);

  //Hit the API after send the message from the active user inbox
  const { isSuccess: isNewMessage, messages: newMessages } = useSelector(
    (state) => state.sendMessage
  );

  //Update the ui after send the message from the user
  useEffect(() => {
    setAllPreviousMsg((prevMessage) => [...prevMessage, ...newMessages]);
  }, [getAllPreviousMsg, newMessages]);

  //scroll effect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  //Chat inbox handler. get the inbox text and send it to the server
  const textHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  //Sending message handler to the api
  const messageSendHandler = (e) => {
    e.preventDefault();
    const data = {
      senderId: authUserData._id,
      senderName: authUserData.userName,
      receiverId: currentFriend._id,
      message: message ? message : "",
    };

    //hit the socket to send the real time message to the user
    socket.current.emit("sendMessage", {
      senderId: authUserData._id,
      senderName: authUserData.userName,
      receiverId: currentFriend._id,
      message: {
        text: message ? message : "",
        image: "",
      },
      time: new Date(),
    });

    dispatch(messageSendAction(data));
    setMessage("");
  };

  //Send Emoji Handler
  const emojiHandler = (e) => {
    setMessage((previousMsg) => previousMsg + e);
  };

  //Socket io
  useEffect(() => {
    //After load the page set the io into the ref hock
    socket.current = io("ws://localhost:8000");

    // If the receiver is online send the message realtime
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    return () => {
      if (socket.current) {
        // Disconnect the socket
        socket.current.disconnect();
      }
    };
  }, []);

  //set the authenticated user into socket active user list
  useEffect(() => {
    socket.current.emit("addUser", authUserData._id, authUserData);
  }, [authUserData]);

  //get the Authenticated users from socket
  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((user) => user._id !== authUserData._id);
      setActiveUser(filterUser);
    });
  }, [authUserData._id]);

  //Add the socket message to the previous message *********
  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId == currentFriend._id &&
        socketMessage.receiverId == authUserData._id
      ) {
        dispatch({
          type: "SOCKET_REAL_TIME_MESSAGE",
          payload: socketMessage,
        });

        setSocketMessage("");
      }
    }
  }, [socketMessage]);

  //Send Image Handler
  const imageHandler = (e) => {
    if (e.target.files[0].length !== 0) {
      const imageName = generateImageName(e.target.files[0]);

      const formData = new FormData();
      formData.append("senderName", authUserData.userName);
      formData.append("receiverId", currentFriend._id);
      formData.append("imageName", imageName);
      formData.append("image", e.target.files[0]);

      dispatch(imageMessageSendAction(formData));
    }
  };

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            {/* TOP Bar */}
            <div className="top">
              <div className="image-name">
                {/* User image */}
                <div className="image">
                  <img
                    // style={{ height: "100px", width: "100px" }}
                    src={`../../public/usersImg/${authUserData.image}`}
                    alt=""
                  />
                </div>

                {/* User name  */}
                <div className="name">
                  <h3>{authUserData.userName}</h3>
                </div>
              </div>
              {/* Icon */}
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaRegEdit />
                </div>
              </div>
            </div>
            {/* Search Bar  */}
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSearch />
                </button>
                <input
                  type="text"
                  placeholder="search"
                  className="form-control"
                />
              </div>
            </div>

            <div className="active-friends">
              <ActiveFriends
                user={activeUser}
                authUserData={authUserData}
                setCurrentFriend={setCurrentFriend}
              />
            </div>

            {/*Chatting friends  */}
            <div className="friends">
              {/* Each conversation start */}

              {conversations.length > 0
                ? conversations.map((conversation) => (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      className={
                        currentFriend._id == conversation._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      onClick={() => setCurrentFriend(conversation)}
                    >
                      {/* hover-friend */}
                      <Friends data={conversation} />
                    </div>
                  ))
                : "No Conversation yet"}

              {/* Each conversation End */}
            </div>
          </div>
        </div>

        {/* RightSide  */}
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            message={message}
            textHandler={textHandler}
            messageSendHandler={messageSendHandler}
            allMessages={allMessages}
            scrollRef={scrollRef}
            emojiHandler={emojiHandler}
            imageHandler={imageHandler}
            activeUser={activeUser}
          />
        ) : (
          <h1>Messanjar</h1>
        )}
      </div>
    </div>
  );
}
