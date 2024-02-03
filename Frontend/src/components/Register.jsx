import { useState } from "react";
import { Link } from "react-router-dom";
// import isImageByContentType from "../utils/isImage";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/auth/authAction";

export default function Register() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userName: "Nishat",
    email: "nishat@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    image: "",
  });

  //For showing the image live
  const [loadImage, setLoadImage] = useState("");

  //Input Handler
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //User Image Handler
  const fileHandler = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      setLoadImage(reader.result);
    };
  
    reader.readAsDataURL(e.target.files[0]);
  };

  //OnSubmit Handler

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", state.userName);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("confirmPassword", state.confirmPassword);
    formData.append("image", state.image);

    //Dispatch the axios request to sent the form data into server
    dispatch(userRegister(formData));
  };

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
          <form onSubmit={submitHandler}>
            {/* User name */}
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="Enter your username"
                id="userName"
                onChange={(e) => {
                  inputHandler(e);
                }}
                value={state.userName}
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
                onChange={(e) => {
                  inputHandler(e);
                }}
                value={state.email}
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
                onChange={(e) => {
                  inputHandler(e);
                }}
                value={state.password}
              />
            </div>

            {/*Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Enter your confirm password"
                id="confirmPassword"
                onChange={inputHandler}
                value={state.confirmPassword}
              />
            </div>

            {/*User image */}
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage && <img src={loadImage} />}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    onChange={fileHandler}
                    type="file"
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <button className="btn">Sign up</button>
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
