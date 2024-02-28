import React from "react";
import Footer from "../modules/Footer";
import Header from "../modules/Header";

import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
