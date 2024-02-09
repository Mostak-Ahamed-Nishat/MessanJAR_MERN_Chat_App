import {
  FaPaperPlane,
  FaPlusCircle,
  FaFileImage,
  FaGift,
} from "react-icons/fa";

export default function MessageInbox({
  textHandler,
  message,
  messageSendHandler,
}) {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <FaPlusCircle />
      </div>

      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>

      <div className="file hover-gift">
        <div className="add-gift">Add gift</div>
        <FaGift />
      </div>

      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control"
          value={message}
          onChange={textHandler}
        />

        <div className="file hover-gift">
          <label htmlFor="emoji">
            <div className="file">❤</div>
          </label>
        </div>
      </div>
      {/* messageSendHandler */}
      <div className="send-icon">
        <FaPaperPlane onClick={messageSendHandler} />
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
