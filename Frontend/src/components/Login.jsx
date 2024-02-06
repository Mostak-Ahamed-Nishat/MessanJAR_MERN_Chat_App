import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../redux/actions/auth/authAction";

export default function Login() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //On input change
  const onChangeHandler = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //on Submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", state.email);
    formData.append("password", state.password);
    //Hit the api
    dispatch(authAction(formData));
  };

  

  return (
    <div className="register">
      {/* Register Card */}

      <div className="card">
        <div className="card-header">
          <h1>Login</h1>
        </div>

        {/* Register Body */}
        <div className="card-body">
          {/* Card Input Form */}
          <form action="" onSubmit={onSubmitHandler}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">User Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                id="email"
                value={state.email}
                onChange={onChangeHandler}
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
                value={state.password}
                onChange={onChangeHandler}
              />
            </div>

            <div className="form-group">
              <button
                className="btn"
                style={{ marginTop: "15px" }}
                type="submit"
              >
                Login
              </button>
            </div>

            {/* <div  className="form-group">
              <input type="submit" value="Login" className="btn" />
            </div> */}

            <div className="form-group">
              <span>
                <Link to="/messanjar/register">Register Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
