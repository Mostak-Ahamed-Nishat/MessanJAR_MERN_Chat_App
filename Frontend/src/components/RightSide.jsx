import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Messages from "./Messages";
import MessageInbox from "./MessageInbox";
import MessageInfo from "./MessageInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Media({
  currentFriend,
  textHandler,
  message,
  messageSendHandler,
  allMessages,
  scrollRef,
  emojiHandler,
  imageHandler,
  activeUser,
}) {
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img
                      src={`../../public/usersImg/${currentFriend.image}`}
                      alt=""
                    />
                    <div className="active-icon"></div>
                  </div>

                  <div className="name">
                    <h3> {currentFriend.userName} </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>

              {/* Message Conversations  */}

              <Messages messages={allMessages} scrollRef={scrollRef} />

              <MessageInbox
                textHandler={textHandler}
                message={message}
                messageSendHandler={messageSendHandler}
                emojiHandler={emojiHandler}
                imageHandler={imageHandler}
              />
            </div>
          </div>

          {/* Media page  */}
          <div className="col-4">
            <MessageInfo messageInfo={currentFriend} activeUser={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
