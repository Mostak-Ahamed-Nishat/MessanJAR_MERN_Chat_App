import React from "react";

export default function ActiveFriends({
  authUserData,
  user,
  setCurrentFriend,
}) {
  return (
    <div className="active-friend">
      <div className="image-active-icon">
        {user && user.length > 0
          ? user.map((u) => {
              if (u.userId && authUserData._id !== u.userInfo._id) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="image"
                    onClick={() => setCurrentFriend(u.userInfo)}
                  >
                    <img
                      src={`../../public/usersImg/${u.userInfo.image}`}
                      alt=""
                    />
                    <div className="active-icon"></div>
                  </div>
                );
              }
            })
          : ""}
      </div>
    </div>
  );
}
