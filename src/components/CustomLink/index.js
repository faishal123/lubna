import React from "react";
import Text from "../Text";
import css from "./CustomLink.module.css";

const CustomLink = props => {
  const { to } = props;
  return (
    <a href={to} className={css.link}>
      <Text {...props} />
    </a>
  );
};

export default CustomLink;
