import React from "react";
import styles from "./WelcomeBtn.module.css";
import { NavLink } from "react-router-dom";
const WelcomeBtn = () => {
  return (
    <NavLink to="/home" className={styles.welcomeBtn}>
      Home
      <img width='40' src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-arrow-arrow-flatarticons-blue-flatarticons-6.png" alt="Call to action"/>
    </NavLink>
  );
};
export default WelcomeBtn;
