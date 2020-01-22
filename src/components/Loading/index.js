import React from "react";
import loading from "../../asset/loading.png";
import css from "./Loading.module.css";
import Text from "../Text";

const Loading = () => {
  return (
    <div className={css.loadingContainer}>
      <img className={css.loadingImage} src={loading} />
      <Text size="small" color="black">
        Loading...
      </Text>
    </div>
  );
};

export default Loading;
