import React from "react";
import styles from "./About.module.css";
import profilePicture from "../../images/profilePicture.jpg";
import Navbar from "../../components/Navbar/Navbar.jsx";

const About = () => {
  return (
    <>
      <Navbar />
      <section className={styles.about}>
        <div className={styles.left}>
          <h3 className={styles.title}>González Leonel</h3>
          <p>
            Esta pagina es mi proyecto individual de Henry.
            El frontend esta desarrollado con React, Hooks, Redux, CSS puro y
            React Router.
            El backend esta desarrollado con express, sequelize y postgres.

          </p>
        </div>
        <div className={styles.imageContainer}>
          <img src={profilePicture} />
        </div>
      </section>
    </>
  );
};

export default About;
