import React from "react";
import css from "./OtpField.module.css";

const RenderInput = ({ digits, onInputChange, index }) => {
  const inputRef = React.useRef(null);

  const onChange = e => {
    onInputChange(e.target.value, index);
    if (e.target.value && inputRef.current.nextSibling) {
      inputRef.current.nextSibling.focus();
    }
  };

  const onKeyDown = e => {
    if (
      e.keyCode === 8 &&
      inputRef.current.previousSibling &&
      !e.target.value
    ) {
      inputRef.current.previousSibling.focus();
    }
    if (
      e.keyCode === 37 &&
      inputRef.current.previousSibling &&
      inputRef.current.selectionStart === 0
    ) {
      inputRef.current.previousSibling.focus();
    }
    if (
      e.keyCode === 39 &&
      inputRef.current.nextSibling &&
      inputRef.current.selectionEnd === 1
    ) {
      inputRef.current.nextSibling.focus();
    }
    if (e.keyCode === 39 && inputRef.current.nextSibling && !e.target.value) {
      inputRef.current.nextSibling.focus();
    }
  };

  return (
    <input
      style={{ width: `${100 / digits - 3}%` }}
      maxLength={1}
      onKeyDown={onKeyDown}
      onChange={onChange}
      ref={inputRef}
      className={css.input}
    />
  );
};

const OtpField = ({ digits, onOTPChange }) => {
  let index = 0;
  const onChange = (value, i) => {
    onOTPChange(value, i);
  };
  return (
    <div className={css.container}>
      {Array.from(Array(digits), (e, i) => {
        index = index + 1;
        return (
          <RenderInput
            onInputChange={onChange}
            digits={digits}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default OtpField;
