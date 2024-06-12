import React from "react";
import "../../HU004.css";

const Bot = ({ currentImage }) => {
  return (
    <div>
      <div className="bot-containerHU004">
        <img src={currentImage} alt="foto de dreamy" />
      </div>
    </div>
  );
};

export default Bot;
