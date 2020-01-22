import React from "react";
import css from "./ChoiceButton.module.css";

const ChoiceButton = ({ choices, active, onClick, size }) => {
  let i = 0;
  return (
    <div className={`${css.container} ${css[size]}`}>
      {choices.map((choice, index) => {
        i = i + 1;
        const createClassName = [css.singleButton];
        if (index + 1 !== choices.length) {
          createClassName.push(css.border);
        }
        if (active === choice) {
          createClassName.push(css.active);
        }
        return (
          <div
            key={i}
            role="button"
            onClick={() => onClick(choice)}
            className={createClassName.join(" ")}
          >
            {choice}
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceButton;
