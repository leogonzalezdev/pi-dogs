import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateBreed.module.css";
import axios from "axios";
import { getTemperaments } from "../../redux/actions";
import Card from "../../components/CardCreateBreed/Card.jsx";

const CreateBreed = ({ getTemperaments, temperaments }) => {
  const [msgError, setMsgError] = useState("");

  const [input, setInput] = useState({
    name: "Nombre de la raza",
    weight: "",
    height: "",
    life_span: "",
    image: "https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg",
    temperament: [],
  });

  useEffect(async function () {
    await getTemperaments();
  }, []);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "name" && !/^[A-Z]+$/i.test(e.target.value) && e.target.value !== "") {
      document.getElementById('inputName').classList.add(styles.error);
      setMsgError("El nombre de la raza solo pueden ser letras.");
    } else {
      document.getElementById('inputName').classList.remove(styles.error);
      setMsgError("");
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  function addTemperament(e) {
    if (input.temperament.includes(e.target.value) || e.target.value === "") return;
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respuesta = await axios.post("http://localhost:3001/dogs", input);
    if (respuesta.status === 200) {
      console.log("se creo");
      setInput({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg",
        temperament: [],
      });
    } else {
      console.log("no se creo");
    }
  };

  return (
    <section className={styles.createBreed}>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input name="name" id="inputName" onChange={handleChange} type="text" className={styles.formInput} placeholder="Name" />
          <input
            name="weight"
            onChange={handleChange}
            type="number"
            className={styles.formInput}
            placeholder="Weight"
          />
          <input
            name="height"
            onChange={handleChange}
            type="number"
            className={styles.formInput}
            placeholder="Height"
          />
          <input
            name="life_span"
            onChange={handleChange}
            type="number"
            className={styles.formInput}
            placeholder="Life span"
          />

          <select className="select" name="temperaments" onChange={(e) => addTemperament(e)}>
            <option value="">Temperamentos</option>
            {temperaments?.map((temperamento) => {
              return (
                <option key={temperamento.id} id={temperamento.id} value={temperamento.name}>
                  {temperamento.name}
                </option>
              );
            })}
          </select>
          <input type="submit" className={styles.btn} value="Crear" />
          {msgError ? <p>{msgError}</p> : null}
        </form>
        <Card dog={input} input={input} setInput={setInput} />
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, { getTemperaments })(CreateBreed);
