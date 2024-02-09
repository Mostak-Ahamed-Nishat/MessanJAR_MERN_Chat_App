import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaRegEdit, FaSearch } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friends from "./Friends";
import RightSide from "./RightSide";

import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../redux/actions/conversationListAction";
import { messageAction } from "../redux/actions/messageAction";

export default function Messanjar() {
  const dispatch = useDispatch();

  //Conversations list
  let { isSuccess, data } = useSelector((state) => state.conversations);

  //Auth User
  let { isSuccess: authSuccess, data: authData } = useSelector(
    (state) => state.auth
  );

  //Auth user
  const [authUserData, setAuthUserData] = useState({});
  //Conversation list
  const [conversations, setConversations] = useState([]);
  //Current chat open
  const [currentFriend, setCurrentFriend] = useState("");

  //Get the message from text box
  const [message, setMessage] = useState("");

  //Chat inbox handler
  const textHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  //Sending message handler
  const messageSendHandler = (e) => {
    e.preventDefault();
    const messageData = {
      sender: authUserData.userName,
      id: authUserData._id,
      message: message ? message : "",
    };
    dispatch(messageAction(messageData));
    setMessage("");
    console.log(messageData);
  };

  //User Authentication
  useEffect(() => {
    setAuthUserData({ ...authData });
  }, [authSuccess, authData]);

  //Get user conversation
  useEffect(() => {
    dispatch(getAllFriends());
    if (data.length > 0 && isSuccess) {
      setConversations([...data]);
    }
  }, [dispatch, isSuccess]);

  //Select the first conversation as chatbox data

  useEffect(() => {
    if (conversations.length > 0) {
      setCurrentFriend(conversations[0]);
    }
  }, [conversations]);

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
          />
        ) : (
          <h1>Messanjar</h1>
        )}
      </div>
    </div>
  );
}
