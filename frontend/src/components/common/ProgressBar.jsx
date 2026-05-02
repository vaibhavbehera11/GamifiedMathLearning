import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ current, total }) => {
  const progressPercentage = Math.min((current / total) * 100, 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <h3>Module Progress</h3>
        <span>
          Screen {current} of {total}
        </span>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="progress-footer">
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;