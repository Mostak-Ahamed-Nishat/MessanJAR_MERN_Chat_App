import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Messages from "./Messages";
import MessageInbox from "./MessageInbox";
import MessageInfo from "./MessageInfo";

export default function Media() {
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
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <h3> GM Sumon </h3>
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
            <MessageInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
