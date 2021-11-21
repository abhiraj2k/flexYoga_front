import React from "react";
import "../styles/error.scss";
const ErrorModal = ({ error, clear }) => {
  return (
    <div className="error__wrap">
      <div className="error__modal">
        <div className="error__title">An Error occured</div>
        <div className="error__message">{error.response.data.message}</div>
        <div className="error__clear">
          <button onClick={() => clear("")}> Ok</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
