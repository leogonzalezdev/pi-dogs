import React from "react";
import styles from "./Welcome.module.css";
import dogPicture from "../../images/welcome-image.png";
import { Link } from "react-router-dom";
import gitHubIcon from "../../images/icons/github-500.svg";
import linkedin from "../../images/icons/linkedin.svg";
import instagram from "../../images/icons/instagram.svg";
const Welcome = () => {
  return (
    <section className={styles.welcomeContainer}>
      <nav className={styles.socialMedia}>
        <a target="_blank" href="https://github.com/leogonzalezok">
          <img className={styles.socialMediaIcon} src={gitHubIcon} />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/leogonzalezdev/">
          <img className={styles.socialMediaIcon} src={linkedin} />
        </a>{" "}
        <a target="_blank" href="https://www.instagram.com/leogonzalezdev/">
          <img className={styles.socialMediaIcon} src={instagram} />
        </a>
      </nav>
      <div className={styles.gretting}>
        <h1 className={styles.title}>Bienvenido a DogsApp</h1>
      </div>
      <Link to="/home" className={styles.callToActionBtn}>
        Get Started 
        <img 
        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-dog-family-life-flaticons-lineal-color-flat-icons.png"/>
      </Link>
    </section>
    // <section className={styles.container}>
    //   <div className={styles.greeting}>
    //     <h3 className={styles.title}>
    //       Hello! Welcome
    //       <br />
    //       to DogsApp &#128021;
    //     </h3>
    //     <img src={dogPicture} alt="Imagen de perrito programador" className={styles.dogPicture} />
    //   </div>
    //   <Link to="/home" className={styles.welcomeBtn}>
    //     <img src="https://img.icons8.com/ios-glyphs/90/000000/dog-jump.png"/>
    //     Go Home
    //     </Link>
    //   {/* <WelcomeBtn/> */}
    // </section>
  );
};

export default Welcome;
