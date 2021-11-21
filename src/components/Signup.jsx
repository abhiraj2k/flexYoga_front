import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.scss";
const Signup = ({ isAuth, signUpHandler }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    clearUserDetails();
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const clearUserDetails = () => {
    const userObj = {
      firstName: "",
      lastName: "",
      dob: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
    setUserDetails(userObj);
  };

  const handleOnFormSubmit = (e) => {
    setErrorMsg("");
    e.preventDefault();
    const { firstName, lastName, email, dob, password, confirmPassword } =
      userDetails;
    if (!firstName || !lastName || !email || !dob || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    const regEx = /^\w+([.\-_]?\w+)*@\w+([.\w]+)*(\.\w{2,3})+$/;
    const isValid = regEx.test(email);
    if (!isValid) {
      setErrorMsg("Incorrect Email format");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Password Mismatch");
      return;
    }

    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email,
      dob,
      password,
    };

    signUpHandler(userObj);
    clearUserDetails();
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleOnFormSubmit}>
        <div className="signup__title">Sign up</div>
        <div className="signup__name">
          <div className="signup__block first-name">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={(e) => {
                setUserDetails({ ...userDetails, firstName: e.target.value });
              }}
            />
          </div>
          <div className="signup__block last-name">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={userDetails.lastName}
              onChange={(e) => {
                setUserDetails({ ...userDetails, lastName: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="signup__block email">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            name="email"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
          />
        </div>
        <div className="signup__block dob">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="text"
            id="dob"
            placeholder="YYYY-MM-DD"
            name="dob"
            value={userDetails.dob}
            onChange={(e) => {
              setUserDetails({ ...userDetails, dob: e.target.value });
            }}
          />
        </div>
        <div className="signup__block password">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            name="password"
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          />
        </div>
        <div className="signup__block confirm-password">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                confirmPassword: e.target.value,
              });
            }}
          />
        </div>
        <div className="error">{errorMsg}</div>
        <button className="signup__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
