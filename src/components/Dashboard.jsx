import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardDisplay from "./DashboardDisplay";
import "../styles/dashboard.scss";
const Dashboard = ({ isAuth, userId, authToken, setErrorMsg }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [subDetails, setSubDetails] = useState({});
  const [forced, setForced] = useState();
  useEffect(() => {
    setForced(false);
    if (!isAuth) {
      return navigate("/signup");
    }
    if (userId || authToken) {
      getUserData(userId, authToken);
      getSubscriptionDetails(userId, authToken);
    }
  }, [isAuth, forced]);

  const getUserData = async (userId, authToken) => {
    try {
      const result = await axios.get(
        "https://flexyoga-back.herokuapp.com/user",
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (result.status === 200) {
        setUserData(result.data);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
  };

  const getSubscriptionDetails = async (userId, authToken) => {
    try {
      const result = await axios.get(
        "https://flexyoga-back.herokuapp.com/sub/status",
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      if (result.status === 200) {
        let enrolledBatch = "";
        if (result.data.status !== "unavailable") {
          enrolledBatch = await getBatch(result.data.enrolled_batch);
        }
        setSubDetails({ ...result.data, enrolledBatch });
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
  };

  const getBatch = async (batchId) => {
    try {
      const result = await axios.post(
        "https://flexyoga-back.herokuapp.com/batch",
        {
          batchId,
        }
      );
      return result.data;
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
  };
  const handleFastForward = async () => {
    try {
      let updatedDate = new Date(new Date(subDetails.end_date));
      updatedDate.setDate(updatedDate.getDate() + 1);
      const result = await axios.post(
        "https://flexyoga-back.herokuapp.com/sub/fast-f",
        {
          date: updatedDate,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log(result);
      getSubscriptionDetails(userId, authToken);
    } catch (err) {
      setErrorMsg(err);
      console.log(err);
    }
  };
  return (
    <div className="dashboard">
      <DashboardDisplay userData={userData} subDetails={subDetails} />
      {subDetails.status !== "unavailable" && (
        <div className="dashboard__fast-forward" onClick={handleFastForward}>
          Fast forward 30 days
        </div>
      )}
    </div>
  );
};

export default Dashboard;
