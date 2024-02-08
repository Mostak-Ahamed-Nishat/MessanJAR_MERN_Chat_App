import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaRegEdit, FaSearch } from "react-icons/fa";
import ActiveFriends from "./ActiveFriends";
import Friends from "./Friends";
import RightSide from "./RightSide";

import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../redux/actions/conversationListAction";

export default function Messanjar() {
  const dispatch = useDispatch();
  let { isSuccess, data } = useSelector((state) => state.conversations);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    dispatch(getAllFriends());
    if (data.length > 0 && isSuccess) {
      setConversations([...data]);
    }
  }, [dispatch, isSuccess]);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            {/* TOP Bar */}
            <div className="top">
              <div className="image-name">
                {/* User image */}
                <div className="image">
                  <img
                    // style={{ height: "100px", width: "100px" }}
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>

                {/* User name  */}
                <div className="name">
                  <h3>MR.Ahamed</h3>
                </div>
              </div>
              {/* Icon */}
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaRegEdit />
                </div>
              </div>
            </div>

            {/* Search Bar  */}
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSearch />
                </button>
                <input
                  type="text"
                  placeholder="search"
                  className="form-control"
                />
              </div>
            </div>

            {/* Active friend list show  */}
            <div className="active-friends">
              <ActiveFriends />
            </div>

            {/*Chatting friends  */}
            <div className="friends">
              {/* Each conversation start */}

              {conversations.length > 0
                ? conversations.map((conversation) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div className="hover-friend">
                        <Friends data={conversation} />
                      </div>
                    );
                  })
                : "No Conversation"}

              {/* Each conversation End */}
            </div>
          </div>
        </div>

        {/* RightSide  */}
        <RightSide />
      </div>
    </div>
  );
}
