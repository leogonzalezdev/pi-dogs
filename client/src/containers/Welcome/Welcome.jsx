import React from "react";
import styles from "./Welcome.module.css";
import dogPicture from "../../images/welcome-image.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className={styles.container}>
      <div className={styles.greeting}>
        <h3 className={styles.title}>
          Hello! Welcome
          <br />
          to DogsApp &#128021;
        </h3>
        <img src={dogPicture} alt="Imagen de perrito programador" className={styles.dogPicture} />
      </div>
      <Link to="/home" className={styles.welcomeBtn}>
        <img src="https://img.icons8.com/ios-glyphs/90/000000/dog-jump.png"/>
        Go Home
        </Link>
      {/* <WelcomeBtn/> */}
    </section>
  );
};

export default Welcome;
