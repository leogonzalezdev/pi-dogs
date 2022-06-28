import React from "react";
import styles from "./WelcomeBtn.module.css";
import { NavLink } from "react-router-dom";
const WelcomeBtn = () => {
  return (
    <NavLink to="/home" className={styles.welcomeBtn}>
      <img
        width="40"
        src="https://img.icons8.com/external-bluetone-bomsymbols-/2x/external-arrow-digital-design-bluetone-set-2-bluetone-bomsymbols--6.png"
        alt="Call to action"
      />
    </NavLink>
  );
};
export default WelcomeBtn;
