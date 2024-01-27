import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
      {/* Register Card */}

      <div className="card">
        <div className="card-header">
          <h1>Register</h1>
        </div>

        {/* Register Body */}
        <div className="card-body">
          {/* Card Input Form */}
          <form action="">
            {/* User name */}
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                id="username"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">User Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                id="email"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">User Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                id="password"
              />
            </div>

            {/*Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">User Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Enter your confirm password"
                id="confirmPassword"
              />
            </div>

            {/*User image */}
            <div className="form-group">
              <div className="file-image">
                <div className="image"></div>
                <div className="file"></div>
                <label htmlFor="image">Select Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  id="image"
                />
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messanjar/login">Login Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
