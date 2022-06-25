import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateBreed.module.css";

const CreateBreed = () => {
  return (
    <section className={styles.createBreed}>
      <Navbar />
      <div className={styles.formContainer}>
        <form>
          <input 
          type="text" 
          className={styles.formInput} 
          placeholder="Name"/>
          <input 
          type="number" 
          className={styles.formInput} 
          placeholder="Weight" />
          <input 
          type="number" 
          className={styles.formInput} 
          placeholder="Height" />
          <input 
          type="number" 
          className={styles.formInput} 
          placeholder="Life span" />
        </form>
      </div>
    </section>
  );
};

export default CreateBreed;
