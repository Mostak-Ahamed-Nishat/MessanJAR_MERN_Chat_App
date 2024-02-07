import React from "react";
import { FaEllipsisH, FaRegEdit, FaSearch } from "react-icons/fa";

export default function Messanjar() {
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
            <div className="active-friend"></div>

            {/* friends  */}
            <div className="friends">
              <div className="hover-friend"></div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
