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
}) {
  const [allMessages, setAllMessages] = useState([]);
  const { isLoading, isSuccess, isError, error, messages } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (isSuccess && !isError) {
      setAllMessages([...messages]);
    }
  }, [isError, isSuccess, messages]);

  console.log(isLoading);


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
              {allMessages.length > 0 ? <Messages /> : ""}
              <MessageInbox
                textHandler={textHandler}
                message={message}
                messageSendHandler={messageSendHandler}
              />
            </div>
          </div>

          {/* Media page  */}
          <div className="col-4">
            <MessageInfo messageInfo={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
}
