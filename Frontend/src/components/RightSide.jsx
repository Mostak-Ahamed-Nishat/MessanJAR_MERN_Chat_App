import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Messages from "./Messages";
import MessageInbox from "./MessageInbox";
import MessageInfo from "./MessageInfo";

export default function Media({ currentFriend }) {
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
              <Messages />
              <MessageInbox />
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
