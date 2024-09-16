// src/components/Loading.js
import React from "react";
import "../styles/Loading.css"; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="loading-container">
      {/* <img src="image.png" alt="Logo" className="logo" /> */}
      <div className="spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
