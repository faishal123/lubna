import React from "react";
import Text from "../Text";
import css from "./Textfield.module.css";

const Textfield = ({ value, onChange, label, type, required, placeholder }) => {
  const [labelTop, setLabelTop] = React.useState(false);
  const inputRef = React.useRef(null);

  return (
    <div
      className={`${css.container} ${
        labelTop ? css.placeholder : css.noPlaceholder
      }`}
      tabIndex="0"
      onFocus={() => {
        if (!labelTop) {
          setLabelTop(true);
          inputRef.current.focus();
        }
      }}
      onBlur={() => {
        if (!document.getElementsByClassName(css.input)[0].value && labelTop) {
          setLabelTop(false);
          inputRef.current.blur();
        }
        if (document.getElementsByClassName(css.input)[0].value && !labelTop) {
          setLabelTop(true);
        }
      }}
    >
      <div className={labelTop ? css.labelTop : css.label}>
        {label}
        {required && (
          <Text inline color="red">
            *
          </Text>
        )}
      </div>
      <input
        type={type}
        value={value}
        className={css.input}
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
};

export default Textfield;
