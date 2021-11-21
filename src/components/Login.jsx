import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";

const Login = ({ isAuth, loginHandler }) => {
  const navigate = useNavigate();
  useEffect(() => {
    clearLoginDetails();
    console.log(isAuth);
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState();
  const clearLoginDetails = () => {
    const loginObj = {
      email: "",
      password: "",
    };
    setLoginDetails(loginObj);
  };
  const handleOnFormSubmit = (e) => {
    setErrorMsg("");
    e.preventDefault();
    const { email, password } = loginDetails;
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }
    const regEx = /^\w+([.\-_]?\w+)*@\w+([.\w]+)*(\.\w{2,3})+$/;
    const isValid = regEx.test(email);
    if (!isValid) {
      setErrorMsg("Incorrect email format");
      return;
    }
    loginHandler(loginDetails);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleOnFormSubmit}>
        <div className="login__title">Log in</div>
        <div className="login__block email">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            name="email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
          />
        </div>
        <div className="login__block password">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            name="password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
          />
        </div>

        <div className="error">{errorMsg}</div>
        <button className="login__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
