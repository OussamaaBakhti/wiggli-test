import React from "react";

import styles from "./header.module.scss";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerBody}>
        <img
          src="https://live-wiggli-employer-branding.s3.eu-west-3.amazonaws.com/2023/10/wLxYRJIT-Wiggli.svg"
          alt="wiggli_logo"
        />
        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/types"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Pokemon Types
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
