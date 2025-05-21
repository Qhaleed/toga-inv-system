import React from "react";

const AlertCard = ({ message, type = "success", show, onClose }) => {
  return (
    <div
      className={`alert-card ${type} ${show ? "show" : ""}`}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <button className="close-btn" onClick={onClose} aria-label="Close alert">
        &times;
      </button>
    </div>
  );
};

export default AlertCard;
