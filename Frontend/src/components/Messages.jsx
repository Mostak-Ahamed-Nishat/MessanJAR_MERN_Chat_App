import { useSelector } from "react-redux";

export default function Messages({ messages, scrollRef }) {
  const { data } = useSelector((state) => state.auth);
  const { _id: authUser } = data;

  return (
    <div ref={scrollRef} className="message-show">
      {/* My/Sender message */}
      {messages?.map((msg) => {
        if (authUser.toString() === msg.senderId.toString()) {
          return (
            <div className="my-message" key={msg._id}>
              <div className="message">
                <div className="my-text">
                  <p className="message-text">{msg?.message.text}</p>
                </div>
                <div className="user-image my-image">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww"
                    alt=""
                  />
                </div>
              </div>
              <div className="time">2 Jan 2022</div>
            </div>
          );
        }

        if (authUser.toString() === msg.receiverId.toString()) {
          return (
            <div className="fd-message" key={msg._id}>
              <div className="message">
                <div className="user-image fd-image">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
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
  );
}