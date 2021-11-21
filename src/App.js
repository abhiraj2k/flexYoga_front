import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Subscribe from './components/Subscribe';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorModal from './components/ErrorModal';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [userId, setUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuth);
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiryDate');
    if (!token || !expiry) {
      return;
    }
    if (new Date(expiry) < new Date()) {
      return;
    }
    const userId = localStorage.getItem('userId')
    setUserId(userId);
    setIsAuth(true);
    setAuthToken(token);
    setExpiryDate(expiry);
  }, [isAuth])

  const setCredentials = ({ token, userId }) => {
    setAuthToken(token)
    setUserId(userId)
    const remainingMs = 60 * 60 * 1000;
    const expiry = new Date(new Date().getTime() + remainingMs)
    setAutoLogout(expiry)
    localStorage.setItem('token', token);
    localStorage.setItem('expiryDate', expiry)
    localStorage.setItem('userId', userId)
    setIsAuth(true);
    setExpiryDate(expiry);
  }

  const loginHandler = async (loginObj) => {
    try {
      const result = await axios.post(
        "https://flexyoga-back.herokuapp.com/user/login",
        loginObj
      );
      if (result.status === 200) {
        setCredentials(result.data);
        navigate("/");
        console.log(result);
      }
    } catch (err) {
      setIsAuth(false);
      console.log(err);
      setErrorMsg(err);
    }
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setAuthToken(null);
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiryDate')
  }
  const setAutoLogout = (ms) => {
    setTimeout(() => {
      logoutHandler();
    }, ms)
  }
  const signUpHandler = async (userObj) => {
    try {
      const result = await axios.post("https://flexyoga-back.herokuapp.com/user/signup", {
        ...userObj,
      });
      if (result.status === 403) {
        throw new Error("Email Already Used");
      }
      if (result.status === 201) {
        navigate("/login");
        return;
      }

    } catch (err) {
      setIsAuth(false);
      console.log(err.message);
      setErrorMsg(err);
    }
  };



  return (

    <>
      {
        errorMsg &&
        <ErrorModal error={errorMsg} clear={setErrorMsg} />
      }
      <Navbar isAuth={isAuth} logoutHandler={logoutHandler} />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard isAuth={isAuth} authToken={authToken} userId={userId} setErrorMsg={setErrorMsg} />} />
          {/* {!isAuth && (<> */}
          <Route path="/login" element={<Login isAuth={isAuth} loginHandler={loginHandler} setErrorMsg={setErrorMsg} />} />
          <Route path="/signup" element={<Signup isAuth={isAuth} signUpHandler={signUpHandler} setErrorMsg={setErrorMsg} />} />
          <Route path="/subscribe" element={<Subscribe isAuth={isAuth} authToken={authToken} setErrorMsg={setErrorMsg} />} />
          {/* </>
          )} */}
        </Routes>
      </Layout>
    </>

  );
}

export default App;
