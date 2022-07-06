import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateBreed.module.css";
import axios from "axios";
import { getTemperaments } from "../../redux/actions";
import Card from "../../components/CardCreateBreed/Card.jsx";
import { useHistory } from "react-router-dom";
import { validateForm } from "../../helpers/validationForm";

const CreateBreed = ({ getTemperaments, temperaments }) => {
  const history = useHistory();
  const [msgError, setMsgError] = useState("");
  const [invalid, setInvalid] = useState(true);
  const [input, setInput] = useState({
    name: "Nombre de la raza",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    image: "https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg",
    temperament: [],
  });

  useEffect(async function () {
    await getTemperaments();
  }, []);

  useEffect(() => {
    validateForm(setInput, input, setInvalid, setMsgError);
  }, [input]);

  const handleChange = (event) => {
    event.preventDefault();
    setInput({ ...input, [event.target.name]: event.target.value });
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
    const isValidate = validateForm(setInput, input, setInvalid, setMsgError);

    if (isValidate === "success") {
      const objBack = {
        name: input.name,
        weight: input.weightMin + " - " + input.weightMax,
        height: input.heightMin + " - " + input.heightMax,
        life_span: input.life_span,
        image: input.image,
        temperament: input.temperament,
      };
      const respuesta = await axios.post("http://localhost:3001/dogs", objBack);
      if (respuesta.status === 200) {
        alert("Tu raza se creó correctamente, presiona aceptar para volver al inicio.");
        history.push("/home");
      } else {
        alert("Hubo un problema al crear tu raza, intentalo de nuevo más tarde.");
      }
    }
  };

  return (
    <section className={styles.createBreed}>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <h2
            style={{
              color: "white",
              fontWeight: "500",
            }}
          >
            Crea tu propia raza
          </h2>
          <input
            name="name"
            id="inputName"
            onChange={handleChange}
            type="text"
            className={styles.formInput}
            placeholder="Nombre de la raza"
          />
          <div className={styles.formGroup}>
            <input
              name="weightMin"
              onChange={handleChange}
              type="number"
              className={styles.formInput}
              placeholder="Peso mínimo (kg)"
            />
            <input
              name="weightMax"
              onChange={handleChange}
              type="number"
              className={styles.formInput}
              placeholder="Peso máximo (kg)"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              name="heightMin"
              onChange={handleChange}
              type="number"
              className={styles.formInput}
              placeholder="Altura mínima (cm)"
            />
            <input
              name="heightMax"
              onChange={handleChange}
              type="number"
              className={styles.formInput}
              placeholder="Altura máxima (cm)"
            />
          </div>
          <input
            name="life_span"
            onChange={handleChange}
            type="number"
            className={styles.formInput}
            placeholder="Promedio de vida (años)"
          />
          <input
            name="image"
            onChange={handleChange}
            type="url"
            className={styles.formInput}
            placeholder="URL de la imagen: https://..."
          />

          <select className={styles.select} name="temperaments" onChange={(e) => addTemperament(e)}>
            <option value="">Temperamentos</option>
            {temperaments?.map((temperamento) => {
              return (
                <option key={temperamento.id} id={temperamento.id} value={temperamento.name}>
                  {temperamento.name}
                </option>
              );
            })}
          </select>
          {invalid ? (
            <input type="submit" className={styles.btn} value="Crear" disabled />
          ) : (
            <input type="submit" className={styles.btn} value="Crear" />
          )}

          {msgError ? <p className={styles.error}>{msgError}</p> : null}
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
