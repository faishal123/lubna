import React from "react";
import css from "./Home.module.css";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Header from "../../components/Header";
import homeIcon from "../../asset/home.png";
import searchIcon from "../../asset/search.png";
import walletIcon from "../../asset/wallet.png";
import bellIcon from "../../asset/bell.png";
import userIcon from "../../asset/user.png";

const Home = props => {
  return (
    <div className={css.pageContainer}>
      <Header
        active={props.match.url}
        menus={[
          {
            icon: homeIcon,
            link: "/home"
          },
          {
            icon: searchIcon,
            link: ""
          },
          {
            icon: walletIcon,
            link: ""
          },
          {
            icon: bellIcon,
            link: ""
          },
          {
            icon: userIcon,
            link: ""
          }
        ]}
      />
      <div className={css.mainSection}>
        <Text align="center" size="large" color="teal">
          Connect to Exchange
        </Text>
        <Text align="center" size="medium" color="black">
          Please connect your exchange account to our app.
        </Text>
        <div className={css.buttonContainer}>
          <Button size="medium" text="Connect to Exchange" />
        </div>
      </div>
    </div>
  );
};

export default Home;
