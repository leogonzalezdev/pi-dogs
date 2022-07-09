import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getDogDetails } from "../../redux/actions";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./DogDetails.module.css";

const DogDetails = ({ dogDetails, getDogDetails, id }) => {
  const [loading, setLoading] = useState(false);
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    setLoading(true);
    await getDogDetails(id);
    setLoading(false);
  }, []);
  
  const goHome = () => {
    cambiarEstadoModal1(!estadoModal1);
    history.push('/home')
  }

  const deleteBreed = async (e, id) => {
    // const respuesta = await deleteBreed(id);
    // console.log(respuesta.data);
    const respuesta = await axios.delete(`http://localhost:3001/dogs/${id}`);
    if (respuesta.status === 200) {
      cambiarEstadoModal1(!estadoModal1);
    }
  };

  return (
    <section>
      <Navbar />
      { 
      loading ? (
        <Spinner />
      ) : (
        <div className={styles.detailsContainer}>
          {dogDetails.image?.url ? (
            <img className={styles.backgroundImage} src={dogDetails.image.url} />
          ) : (
            <img
              className={styles.backgroundImage}
              src={`https://cdn2.thedogapi.com/images/${dogDetails?.reference_image_id}.jpg`}
            />
          )}
          <div className={styles.details}>
            {dogDetails.image?.url ? (
              <img className={styles.portadaImage} src={dogDetails.image.url} />
            ) : (
              <img
                className={styles.portadaImage}
                src={`https://cdn2.thedogapi.com/images/${dogDetails?.reference_image_id}.jpg`}
              />
            )}

            {typeof dogDetails.id !== "string" ? (
              console.log("Es de la api")
            ) : (
              <img
                key={dogDetails.id}
                id={dogDetails.id}
                onClick={(e) => deleteBreed(e, dogDetails.id)}
                className={styles.btnDelete}
                src="https://img.icons8.com/color/96/FFFFFF/delete-forever.png"
              />
            )}
            <div className={styles.description}>
              <h3>{dogDetails?.name}</h3>
              <p>{dogDetails?.temperament}.</p>
              <p>Altura: {dogDetails.height?.metric ? dogDetails.height.metric : dogDetails.height} cm</p>
              <p>Peso: {dogDetails.weight?.metric ? dogDetails.weight.metric : dogDetails.weight} Kg</p>
              <p>Años de vida: {dogDetails.life_span}</p>
            </div>
          </div>
        </div>
      )}

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
          <h1>Raza eliminada correctamente</h1>
          <p>Presiona aceptar para volver al Inicio.</p>
          <button onClick={() => goHome()}>Aceptar</button>
        </div>
      </Modal>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    dogDetails: state.dogDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDogDetails: (id) => dispatch(getDogDetails(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);
