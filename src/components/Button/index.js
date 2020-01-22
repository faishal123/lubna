import React from "react";
import css from "./Button.module.css";

const Button = ({ size, text, onClick }) => {
  return (
    <button onClick={onClick} className={`${css.button} ${css[size]}`}>
      {text}
    </button>
  );
};

export default Button;
