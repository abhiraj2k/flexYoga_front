import axios from "axios";
import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import "../styles/subscriptionForm.scss";
const SubscriptionForm = ({ subscribe, setErrorMsg }) => {
  useEffect(() => {
    getBatches();
  }, []);
  const [batches, setBatches] = useState();
  const [activeBatch, setActiveBatch] = useState();
  const getBatches = async () => {
    try {
      const result = await axios.get(
        "https://flexyoga-back.herokuapp.com/batch"
      );
      if (result.status === 200) {
        setBatches(result.data);
      } else {
        throw new Error(400).message("Some error ocured");
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
  };

  const handleSubscribe = () => {
    if (!activeBatch) {
      return;
    }
    subscribe(activeBatch);
  };

  return (
    <div className="sub-form__wrap">
      <div className="sub-form">
        <div className="sub-form__select-batch">
          <div className="sub-form__batch-title">Select Batch:</div>
          <div className="sub-form__batches">
            {batches &&
              batches.map((batch) => (
                <div
                  className={
                    "sub-form__batch " +
                    (activeBatch === batch.id ? "active" : "")
                  }
                  key={batch.id}
                  onClick={() => {
                    setActiveBatch(batch.id);
                  }}
                >
                  {batch.batch_start + "-" + batch.batch_end + " " + batch.zone}
                </div>
              ))}
          </div>
        </div>
        <div className="sub-form__payment">
          <span className="sub-form__payment-title">Fees: </span>{" "}
          <span className="sub-form__payment-fees">500/-</span>
        </div>
        <button
          type="submit"
          className="sub-form__submit"
          onClick={handleSubscribe}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
