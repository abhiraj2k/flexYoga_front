import React, { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import "../styles/subscribe.scss";
import { useNavigate } from "react-router-dom";
import { completePayment } from "../util/completePayment";
import axios from "axios";
const Subscribe = ({ isAuth, authToken, setErrorMsg }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const subscribe = async (activeBatch) => {
    try {
      const paymentStatus = await completePayment();
      if (paymentStatus !== "success") {
        throw new Error(400).message("Payment Failed");
      }
      const result = await axios.post(
        "https://flexyoga-back.herokuapp.com/sub/subscribe",
        {
          batch: activeBatch,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      console.log(result);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
  };
  return (
    <div className="subscribe">
      <SubscriptionForm subscribe={subscribe} />
    </div>
  );
};

export default Subscribe;
