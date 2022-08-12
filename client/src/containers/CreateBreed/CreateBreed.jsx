import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../components/CardCreateBreed/Card.jsx";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CreateBreed.module.css";
import axios from "axios";
import { getTemperaments } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { validateForm } from "../../helpers/validationForm";
import { BASE_URL } from "../../constantes";
import Modal from "../../components/Modal/Modal.jsx";

const CreateBreed = ({ getTemperaments, temperaments }) => {
  const history = useHistory();
  const [msgError, setMsgError] = useState("");
  const [invalid, setInvalid] = useState(true);
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [input, setInput] = useState({
    name: "Nombre de la raza",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    image: "",
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
      const respuesta = await axios.post(`${BASE_URL}/dogs`, objBack);
      if (respuesta.status === 200) {
        cambiarEstadoModal1(true);
      } else {
        alert("Hubo un problema al crear tu raza, intentalo de nuevo más tarde.");
      }
    }
  };

  const uploadImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    console.log(form);
    const settings = {
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };
    
    const respuesta = await axios("https://api.imgbb.com/1/upload?expiration=600&key=8b366ebc3982cb0ee92345b45df2d903", settings)

    setInput({
      ...input,
      image: respuesta.data.data.url,
    });

    console.log(respuesta.data.data.url);
  };

  const goHome = () => {
    cambiarEstadoModal1(!estadoModal1);
    history.push('/home');
  }

  return (
    <section className={styles.createBreed}>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formulario} encType='multipart/form-data'>
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
            onChange={uploadImage}
            className={styles.formInput}
            accept="image/*"
            type='file'
            
          />
          {/* <input
            name="image"
            onChange={handleChange}
            type="url"
            className={styles.formInput}
            placeholder="URL de la imagen: https://..."
          /> */}

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
      <Modal
        estado={estadoModal1}
        cambiarEstado={cambiarEstadoModal1}
        titulo="Cambio Exitoso!"
        mostrarHeader={true}
        mostrarOverlay={true}
        posicionModal={"center"}
        padding={"20px"}
      >
        <div>
          <h1>Raza creada correctamente</h1>
          <p>Presiona aceptar para volver al Inicio.</p>
          <button onClick={() => goHome()}>Aceptar</button>
        </div>
      </Modal>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, { getTemperaments })(CreateBreed);
