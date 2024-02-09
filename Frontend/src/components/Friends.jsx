import React from "react";

const Friends = ({ data }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`../../public/usersImg/${data.image}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{data.userName}</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
