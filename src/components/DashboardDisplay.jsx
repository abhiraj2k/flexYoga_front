import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboardDisplay.scss";
const DashboardDisplay = ({ userData, subDetails }) => {
  const getBatchTiming = () => {
    if (!subDetails.enrolledBatch) {
      return "";
    }
    return (
      subDetails.enrolledBatch.batch_start +
      "-" +
      subDetails.enrolledBatch.batch_end +
      " " +
      subDetails.enrolledBatch.zone
    );
  };

  console.log(subDetails);
  const daysLeft = () => {
    return new Date(subDetails.end_date).getDate() - new Date().getDate();
  };
  return (
    <div className="dd">
      <div className="dd__headline">Hi, {userData.firstName}</div>
      {subDetails.status !== "valid" && (
        <div className="dd__sub-expired">
          <div className="dd__sub-status">You have no valid Subscription</div>
          <div className="dd__sub-button">
            <Link to="subscribe">
              <button className="subscribe">Subscribe Now</button>
            </Link>
          </div>
        </div>
      )}
      <div className="dd__sub-valid">
        <div className="dd__sub-card">
          <div className="dd__title">
            Subscription Status:{" "}
            <span
              className={
                "dd__status " +
                (subDetails.status === "valid" ? "valid" : "expired")
              }
            >
              {subDetails.status}
            </span>{" "}
          </div>
          <div className="dd__batch-info">
            <div className="dd__batch__title">
              Selected batch:{" "}
              <span className="dd__batch-details">{getBatchTiming()}</span>
            </div>
          </div>
          <div className="dd__days-left">
            Days left:{" "}
            <span className="dd__days">
              {subDetails.status === "valid" ? daysLeft() : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDisplay;
