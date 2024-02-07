import { FaCaretSquareDown, FaEdit, FaSistrix } from "react-icons/fa";

export default function MessageInfo() {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="active-user">Active</div>

        <div className="name">
          <h4>GM Sumon </h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Coustomise Chat </h3>
          <FaCaretSquareDown />
        </div>

        <div className="privacy">
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown />
        </div>

        <div className="media">
          <h3>Shared Media </h3>
          <label htmlFor="gallery">
            <FaCaretSquareDown />
          </label>
        </div>
      </div>

      <div className="gallery">
        <img
          src="https://images.unsplash.com/photo-1706954226305-3d6abf829f08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1705931607938-fa3b30611e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1707066155653-d187e6f1386f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2OXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1706908432387-b28d74db7559?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}
