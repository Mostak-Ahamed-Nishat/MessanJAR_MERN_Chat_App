import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisH, FaRegEdit, FaSearch } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friends from "./Friends";
import RightSide from "./RightSide";

import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../redux/actions/conversationListAction";

import {
  getMessageAction,
  messageSendAction,
} from "../redux/actions/messageAction";

export default function Messanjar() {
  const dispatch = useDispatch();
  //Auth user
  const [authUserData, setAuthUserData] = useState({});
  //Conversation list
  const [conversations, setConversations] = useState([]);
  //All messages
  const [allMessages, setAllMessages] = useState([]);
  //Current chat open
  const [currentFriend, setCurrentFriend] = useState({});
  //Get the message from text box
  const [message, setMessage] = useState("");
  //For scroll down
  const scrollRef = useRef();

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
    messages: getAllMsg,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    if ((isGetMsgSuccess, !isGetMsgError)) setAllMessages(getAllMsg);
  }, [getAllMsg, isGetMsgError, isGetMsgSuccess]);

  useEffect(() => {
    setAllMessages([...getAllMsg]);
  }, [getAllMsg]);

  //Update the ui after send the message
  const { isSuccess: isNewMessage, messages: newMessages } = useSelector(
    (state) => state.sendMessage
  );

  useEffect(() => {
    setAllMessages([...getAllMsg, ...newMessages]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessages]);

  //scroll effect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  //Chat inbox handler. get the inbox text and send it to the server
  const textHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  //Sending message handler
  const messageSendHandler = (e) => {
    e.preventDefault();
    const data = {
      senderId: authUserData._id,
      senderName: authUserData.userName,
      receiverId: currentFriend._id,
      message: message ? message : "",
    };
    dispatch(messageSendAction(data));
    setMessage("");
  };

  //Emoji Handler

  const emojiHandler = (e) => {
    setMessage((previousMsg) => previousMsg + e);
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

            {/* Active friend list show  */}
            <div className="active-friends">
              <ActiveFriends />
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
          />
        ) : (
          <h1>Messanjar</h1>
        )}
      </div>
    </div>
  );
}
