import React from "react";
import "./button.css";

const Button = ({ children, type }) => {
  return <div className={`omov__button ${type}`}>{children}</div>;
};

export default Button;
