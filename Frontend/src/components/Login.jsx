import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../redux/actions/auth/authAction";
import { useAlert } from "react-alert";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isError, isSuccess, success, errors, message, data } =
    useSelector((state) => state.auth);
  const alert = useAlert();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

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

  //After effect the login
  useEffect(() => {
    if (isError && errors.length > 0) {
      let errorList = {};
      errors.map((item) => {
        const key = Object.keys(item); // Assuming each payload item has only one key
        const value = item[key];
        errorList[key] = value;
      });
      setFormErrors(errorList);
    }

    if (isSuccess) {
      setState({
        email: "",
        password: "",
      });
      setFormErrors({});
      alert.success(message);
      navigate("/messanjar");
    }
  }, [alert, errors, isError, isSuccess, message, navigate]);

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
              {formErrors.email && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.email}
                </span>
              )}
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
              {formErrors.password && (
                <span className="error" style={{ color: "red" }}>
                  {formErrors.password}
                </span>
              )}
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
