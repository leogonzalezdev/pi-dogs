import React from 'react';
import styles from './Welcome.module.css';
import dogPicture from '../../images/welcome-image.png';
import WelcomeBtn from '../../components/WelcomeBtn/WelcomeBtn.jsx';
const Welcome = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Bienvenido a DogsApp</h1>
      {/* <img src={dogPicture} alt='Imagen de perrito programador' className={styles.dogPicture}/> */}
      <WelcomeBtn/>
    </section>
  )
}

export default Welcome