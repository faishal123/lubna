import React from "react";
import css from "./Header.module.css";
import logo from "../../asset/logo.png";
import Button from "../Button";
import token from "../../asset/money.png";
import Text from "../Text";
import { Link } from "react-router-dom";

const Header = ({ menus, active }) => {
  let i = 0;
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className={css.container}>
      <div className={css.leftSection}>
        <img src={logo} alt="logo" className={css.logo} />
        <div className={css.verticalLine}></div>
        <Button text="Top Up Token" size="small" />
        <img className={css.token} src={token} alt="token" />
        <Text size="large" color="black">
          {tokenAmount}
        </Text>
      </div>
      <div className={css.rightSection}>
        {menus.map(menu => {
          i++;
          return (
            <Link key={i} to={menu.link} className={css.link}>
              <img
                className={`${css.menusIcon} ${
                  active === menu.link ? css.active : null
                }`}
                src={menu.icon}
              />
            </Link>
          );
        })}
        <div className={css.logoutContainer}>
          <Button text="Logout" size="small" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
