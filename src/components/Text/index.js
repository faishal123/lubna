import React from "react";
import css from "./Text.module.css";

const Text = ({ children, size, color, align, inline, onClick }) => {
  return (
    <div
      role={onClick ? "button" : null}
      tabIndex={onClick ? "0" : null}
      onClick={onClick ? onClick : () => {}}
      className={`${css.text} ${inline ? css.inline : null} ${css[size]} ${
        css[color]
      } ${css[align]} ${onClick ? css.button : null}`}
    >
      {children}
    </div>
  );
};

export default Text;
