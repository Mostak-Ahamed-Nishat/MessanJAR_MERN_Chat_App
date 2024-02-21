import { useSelector } from "react-redux";

export default function Messages({
  messages,
  scrollRef,
  isTyping,
  currentFriend,
}) {
  const { data } = useSelector((state) => state.auth);
  const { _id: authUser } = data;

  return (
    <>
      <div ref={scrollRef} className="message-show">
        {/* My/Sender message */}
        {messages?.map((msg) => {
          const messageKey = `${msg._id}-${
            msg.senderId === authUser ? "sender" : "receiver"
          }`;
          if (authUser.toString() === msg.senderId.toString()) {
            return (
              <div className="my-message" key={messageKey}>
                <div className="message">
                  <div className="my-text">
                    <p className="message-text">{msg?.message.text}</p>
                  </div>
                  <div className="user-image my-image">
                    <img src={`./../../public/usersImg/${data.image}`} alt="" />
                  </div>
                </div>
                <div className="time">2 Jan 2022</div>
              </div>
            );
          }

          if (authUser.toString() === msg.receiverId.toString()) {
            return (
              <div className="fd-message" key={messageKey}>
                <div className="message">
                  <div className="user-image fd-image">
                    <img
                      src={`./../../public/usersImg/${currentFriend.image}`}
                      alt=""
                    />
                  </div>
                  <div className="fd-text">
                    <p className="message-text">{msg?.message.text} </p>
                  </div>
                </div>
                <div className="time fd-time">3 Jan 2022</div>
              </div>
            );
          }

          return null; // To handle the case where neither condition is met
        })}
      </div>

      {/* {isTyping.message !== "" && isTyping.senderId === currentFriend._id?(
        <div>Typing..</div>
      ) : (
        ""
      )} */}
    </>
  );
}
