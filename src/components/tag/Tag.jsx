import React from "react";
import "./tag.css";

const Tag = ({ children }) => {
  return (
    <div className="omv__tag">
      <p>{children}</p>
    </div>
  );
};

export default Tag;
