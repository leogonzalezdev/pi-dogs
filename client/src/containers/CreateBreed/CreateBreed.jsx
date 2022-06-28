import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateBreed.module.css";
import axios from "axios";

const CreateBreed = () => {
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg",
    temperamentos: ["Aloof"]
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({...input, [e.target.name] : e.target.value })
  };
  
  console.log(input);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respuesta = await axios.post("http://localhost:3001/dogs", input);
    if (respuesta.status === 200) {
      console.log(respuesta.data);
      setInput({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg",
      });
    }else{
      console.log('no se creo');
    }
  };

  return (
    <section className={styles.createBreed}>
      <Navbar />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input name="name" onChange={handleChange} type="text" className={styles.formInput} placeholder="Name" />
          <input name="weight"  onChange={handleChange} type="number" className={styles.formInput} placeholder="Weight" />
          <input name="height" onChange={handleChange}  type="number" className={styles.formInput} placeholder="Height" />
          <input name="life_span" onChange={handleChange} type="number" className={styles.formInput} placeholder="Life span" />

          <input type="submit" className={styles.btn} value="Crear" />
        </form>
      </div>
    </section>
  );
};

export default CreateBreed;
